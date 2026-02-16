#!/usr/bin/env node

/**
 * LinkedIn Browser Agent
 * Publishes blog posts to LinkedIn using saved session cookies.
 * No API needed — automates the browser with Playwright.
 *
 * Required env vars:
 *   POST_SLUG         – Blog post slug (without .mdx)
 *
 * Auth (one of):
 *   LINKEDIN_COOKIES  – JSON string of saved session (from linkedin-save-session.js)
 *   LINKEDIN_SESSION_FILE – Path to session JSON file (for local testing)
 *
 * Optional:
 *   HEADLESS – "false" to see the browser (default: true)
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://dailymp.es';
const POST_SLUG = process.env.POST_SLUG;
const HEADLESS = process.env.HEADLESS !== 'false';

if (!POST_SLUG) {
  console.error('❌ Missing POST_SLUG env var');
  process.exit(1);
}

// ─── Helpers ───────────────────────────────────────────────

function getSessionState() {
  // From env var (GitHub Actions)
  if (process.env.LINKEDIN_COOKIES) {
    try {
      return JSON.parse(process.env.LINKEDIN_COOKIES);
    } catch {
      console.error('❌ LINKEDIN_COOKIES is not valid JSON');
      process.exit(1);
    }
  }

  // From file (local testing)
  const sessionFile = process.env.LINKEDIN_SESSION_FILE
    || path.join(process.cwd(), 'linkedin-session.json');

  if (fs.existsSync(sessionFile)) {
    return JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
  }

  console.error('❌ No session found. Run: node scripts/agents/linkedin-save-session.js');
  process.exit(1);
}

function getPostMetadata() {
  const postPath = path.join(process.cwd(), 'content/blog', `${POST_SLUG}.mdx`);
  if (!fs.existsSync(postPath)) throw new Error(`Post not found: ${postPath}`);

  const content = fs.readFileSync(postPath, 'utf8');
  const match = content.match(/^---\n([\s\S]+?)\n---/);
  if (!match) throw new Error('No frontmatter found');

  const fm = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      fm[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  return fm;
}

function buildPostText(metadata) {
  const postUrl = `${SITE_URL}/blog/${POST_SLUG}`;
  const hashtags = metadata.category
    ? `#${metadata.category.toLowerCase().replace(/\s+/g, '')} `
    : '';

  return `📝 ${metadata.title}

${metadata.description}

🔗 ${postUrl}

${hashtags}#frontend #webdev #javascript`;
}

// ─── Agent ─────────────────────────────────────────────────

async function run() {
  const metadata = getPostMetadata();
  const postText = buildPostText(metadata);
  const sessionState = getSessionState();

  console.log(`📝 Publishing: ${metadata.title}`);
  console.log(`🔗 URL: ${SITE_URL}/blog/${POST_SLUG}`);
  console.log(`📏 Text length: ${postText.length} chars`);
  console.log(`🖥️  Headless: ${HEADLESS}`);
  console.log('');

  const browser = await chromium.launch({
    headless: HEADLESS,
    slowMo: HEADLESS ? 0 : 100,
  });

  const context = await browser.newContext({
    storageState: sessionState,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 },
    locale: 'es-ES',
  });

  const page = await context.newPage();

  try {
    // ── Step 1: Verify session is still valid ──
    console.log('🔐 Step 1: Verifying session...');
    await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    if (currentUrl.includes('/login') || currentUrl.includes('/authwall')) {
      console.error('❌ Session expired. Re-run: node scripts/agents/linkedin-save-session.js');
      await page.screenshot({ path: 'linkedin-session-expired.png' });
      process.exit(1);
    }

    console.log('✅ Session valid — logged in');

    // ── Step 2: Open post creation modal ──
    console.log('📝 Step 2: Opening post creation...');

    // Wait for feed to fully load
    await page.waitForTimeout(2000);

    // Click "Start a post" button
    const startPostSelector = [
      'button.share-box-feed-entry__trigger',
      '[data-control-name="share.start"]',
      'button:has-text("Start a post")',
      'button:has-text("Comenzar una publicación")',
      'button:has-text("Crear una publicación")',
      '.share-box-feed-entry__trigger',
    ];

    let clicked = false;
    for (const selector of startPostSelector) {
      try {
        await page.click(selector, { timeout: 3000 });
        clicked = true;
        console.log(`   ✓ Clicked: ${selector}`);
        break;
      } catch {
        // try next selector
      }
    }

    if (!clicked) {
      // Fallback: navigate directly to post creation
      console.log('   ⚠️  Could not find "Start a post" button, trying direct navigation...');
      await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      
      // Try clicking again with broader selectors
      const broadSelectors = [
        '[class*="share-box"] button',
        '[class*="share-creation"] button',
        'div[role="button"][tabindex="0"]',
      ];
      
      for (const selector of broadSelectors) {
        try {
          const buttons = await page.$$(selector);
          for (const btn of buttons) {
            const text = await btn.textContent();
            if (text && (text.includes('post') || text.includes('publicación') || text.includes('Crear'))) {
              await btn.click();
              clicked = true;
              console.log(`   ✓ Found and clicked post button`);
              break;
            }
          }
          if (clicked) break;
        } catch {
          // try next
        }
      }
    }

    if (!clicked) {
      await page.screenshot({ path: 'linkedin-no-post-button.png' });
      throw new Error('Could not find "Start a post" button');
    }

    // ── Step 3: Write the post ──
    console.log('✏️  Step 3: Writing post content...');
    await page.waitForTimeout(2000);

    // Find the text editor in the modal
    const editorSelectors = [
      '[role="textbox"][contenteditable="true"]',
      '.ql-editor[contenteditable="true"]',
      '[data-placeholder]',
      '.editor-content [contenteditable="true"]',
      'div[contenteditable="true"]',
    ];

    let editor = null;
    for (const selector of editorSelectors) {
      try {
        editor = await page.waitForSelector(selector, { timeout: 5000 });
        if (editor) {
          console.log(`   ✓ Found editor: ${selector}`);
          break;
        }
      } catch {
        // try next
      }
    }

    if (!editor) {
      await page.screenshot({ path: 'linkedin-no-editor.png' });
      throw new Error('Could not find post editor');
    }

    // Click on editor and type the post
    await editor.click();
    await page.waitForTimeout(500);

    // Type line by line to handle newlines properly
    const lines = postText.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === '') {
        await page.keyboard.press('Enter');
      } else {
        await page.keyboard.type(lines[i], { delay: 10 });
      }
      if (i < lines.length - 1) {
        await page.keyboard.press('Enter');
      }
    }

    console.log('   ✓ Post text written');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'linkedin-step3-text-written.png' });
    console.log('   📸 Screenshot: linkedin-step3-text-written.png');

    // ── Step 4: Click Publish ──
    console.log('🚀 Step 4: Publishing...');

    const publishSelectors = [
      'button.share-actions__primary-action',
      'button:has-text("Post")',
      'button:has-text("Publicar")',
      '[data-control-name="share.post"]',
    ];

    let published = false;
    for (const selector of publishSelectors) {
      try {
        const btn = await page.$(selector);
        if (btn) {
          const isDisabled = await btn.getAttribute('disabled');
          if (isDisabled !== null) {
            console.log(`   ⚠️  Button "${selector}" found but disabled`);
            continue;
          }
          await btn.click();
          published = true;
          console.log(`   ✓ Clicked publish: ${selector}`);
          break;
        }
      } catch {
        // try next
      }
    }

    if (!published) {
      // Broader fallback
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = (await btn.textContent() || '').trim().toLowerCase();
        if (text === 'post' || text === 'publicar') {
          const isDisabled = await btn.getAttribute('disabled');
          if (isDisabled !== null) {
            console.log(`   ⚠️  Publish button found but disabled`);
            continue;
          }
          await btn.click();
          published = true;
          console.log('   ✓ Found publish button via text search');
          break;
        }
      }
    }

    if (!published) {
      await page.screenshot({ path: 'linkedin-no-publish-button.png' });
      throw new Error('Could not find Publish button');
    }

    // Wait and verify publication
    console.log('   ⏳ Waiting for confirmation...');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'linkedin-step4-after-publish.png' });
    console.log('   📸 Screenshot: linkedin-step4-after-publish.png');

    // Check for success toast
    const successToast = await page.$('.artdeco-toast-item--visible, [role="alert"]');
    if (successToast) {
      const toastText = await successToast.textContent();
      console.log(`   📢 Toast message: ${toastText.trim()}`);
    }

    // Check for error
    const errorModal = await page.$('.artdeco-toast-item--error');
    if (errorModal) {
      const errorText = await errorModal.textContent();
      throw new Error(`LinkedIn error: ${errorText}`);
    }

    // Navigate to profile to verify the post exists
    console.log('🔍 Step 5: Verifying post on profile...');
    await page.goto('https://www.linkedin.com/in/me/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'linkedin-step5-profile.png' });
    console.log('   📸 Screenshot: linkedin-step5-profile.png');

    console.log('');
    console.log('✅ Successfully published to LinkedIn!');
    console.log('');
    console.log('📸 Review screenshots:');
    console.log('   linkedin-step3-text-written.png  – Post text before publishing');
    console.log('   linkedin-step4-after-publish.png – Right after clicking publish');
    console.log('   linkedin-step5-profile.png       – Profile page to verify');

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    await page.screenshot({ path: 'linkedin-error.png' }).catch(() => {});
    console.error('   Screenshot saved to linkedin-error.png');
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// ─── Main ──────────────────────────────────────────────────

run().catch(err => {
  console.error('❌ Fatal:', err.message);
  process.exit(1);
});
