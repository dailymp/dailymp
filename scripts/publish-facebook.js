#!/usr/bin/env node

/**
 * Facebook Page Post Publisher
 * Publishes blog post to Facebook Page using the Graph API
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_URL = 'https://dailymp.es';
const POST_SLUG = process.env.POST_SLUG;
const ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
const PAGE_ID = process.env.FACEBOOK_PAGE_ID;

if (!POST_SLUG || !ACCESS_TOKEN || !PAGE_ID) {
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

// Publish to Facebook
function publishToFacebook(metadata) {
  return new Promise((resolve, reject) => {
    const postUrl = `${SITE_URL}/blog/${POST_SLUG}`;
    
    const message = `${metadata.title}

${metadata.description}

Lee el artículo completo: ${postUrl}`;

    const endpoint = metadata.image ? `/v18.0/${PAGE_ID}/photos` : `/v18.0/${PAGE_ID}/feed`;
    const params = new URLSearchParams({
      message: message,
      access_token: ACCESS_TOKEN
    });

    if (metadata.image) {
      params.set('url', metadata.image);
    } else {
      params.set('link', postUrl);
    }

    const options = {
      hostname: 'graph.facebook.com',
      path: endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': params.toString().length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          console.log('✅ Successfully published to Facebook');
          console.log(`   Post ID: ${response.id}`);
          resolve(response);
        } else {
          reject(new Error(`Failed to publish: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(params.toString());
    req.end();
  });
}

// Main execution
(async () => {
  try {
    console.log(`📝 Publishing post: ${POST_SLUG}`);
    
    const metadata = getPostMetadata();
    console.log(`✓ Title: ${metadata.title}`);
    
    await publishToFacebook(metadata);
    
    console.log('🎉 Done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
