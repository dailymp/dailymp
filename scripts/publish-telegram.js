#!/usr/bin/env node

/**
 * Telegram Channel Publisher
 * Publishes blog post to Telegram Channel using Bot API
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_URL = 'https://dailymp.es';
const POST_SLUG = process.env.POST_SLUG;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

if (!POST_SLUG || !BOT_TOKEN || !CHANNEL_ID) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

// Read post frontmatter
function getPostMetadata() {
  const postPath = path.join(process.cwd(), 'content/blog', `${POST_SLUG}.mdx`);
  
  if (!fs.existsSync(postPath)) {
    throw new Error(`Post not found: ${postPath}`);
  }

  const content = fs.readFileSync(postPath, 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
  
  if (!frontmatterMatch) {
    throw new Error('No frontmatter found');
  }

  const frontmatter = {};
  frontmatterMatch[1].split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });

  return frontmatter;
}

// Publish to Telegram
function publishToTelegram(metadata) {
  return new Promise((resolve, reject) => {
    const postUrl = `${SITE_URL}/blog/${POST_SLUG}`;
    
    // Telegram supports Markdown or HTML
    const message = `🆕 <b>${metadata.title}</b>

${metadata.description}

<a href="${postUrl}">📖 Leer artículo completo</a>

${metadata.category ? `#${metadata.category.toLowerCase().replace(/\s+/g, '_')}` : ''} #blog #frontend`;

    const payload = metadata.image
      ? {
          chat_id: CHANNEL_ID,
          photo: metadata.image,
          caption: message,
          parse_mode: 'HTML'
        }
      : {
          chat_id: CHANNEL_ID,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: false
        };

    const data = JSON.stringify(payload);
    
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${BOT_TOKEN}/${metadata.image ? 'sendPhoto' : 'sendMessage'}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        const response = JSON.parse(responseData);
        
        if (response.ok) {
          console.log('✅ Successfully published to Telegram');
          console.log(`   Message ID: ${response.result.message_id}`);
          resolve(response);
        } else {
          reject(new Error(`Failed to publish: ${response.description}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Main execution
(async () => {
  try {
    console.log(`📝 Publishing post: ${POST_SLUG}`);
    
    const metadata = getPostMetadata();
    console.log(`✓ Title: ${metadata.title}`);
    
    await publishToTelegram(metadata);
    
    console.log('🎉 Done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
