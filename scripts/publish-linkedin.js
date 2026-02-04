#!/usr/bin/env node

/**
 * LinkedIn Post Publisher
 * Publishes blog post to LinkedIn using the LinkedIn API
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_URL = 'https://dailymp.es';
const POST_SLUG = process.env.POST_SLUG;
const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;

if (!POST_SLUG || !ACCESS_TOKEN) {
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

// Get LinkedIn User ID (Person URN)
function getLinkedInUserId() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.linkedin.com',
      path: '/v2/userinfo',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const user = JSON.parse(data);
          resolve(user.sub);
        } else {
          reject(new Error(`Failed to get user ID: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Download image from URL
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${res.statusCode}`));
        return;
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

// Register image upload and return asset + upload URL
async function registerImageUpload(ownerUrn) {
  const payload = {
    registerUploadRequest: {
      owner: ownerUrn,
      recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
      serviceRelationships: [
        {
          relationshipType: 'OWNER',
          identifier: 'urn:li:userGeneratedContent'
        }
      ]
    }
  };

  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: 'api.linkedin.com',
      path: '/v2/assets?action=registerUpload',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          const response = JSON.parse(responseData);
          const uploadUrl = response.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
          const asset = response.value.asset;
          resolve({ uploadUrl, asset });
        } else {
          reject(new Error(`Failed to register upload: ${res.statusCode} - ${responseData}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Upload image to LinkedIn
function uploadImageToLinkedIn(uploadUrl, imageBuffer, contentType = 'image/jpeg') {
  return new Promise((resolve, reject) => {
    const url = new URL(uploadUrl);
    const options = {
      hostname: url.hostname,
      path: `${url.pathname}${url.search}`,
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
        'Content-Length': imageBuffer.length
      }
    };

    const req = https.request(options, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        if (res.statusCode === 201 || res.statusCode === 200) {
          resolve();
        } else {
          reject(new Error(`Failed to upload image: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(imageBuffer);
    req.end();
  });
}

// Publish to LinkedIn
async function publishToLinkedIn(metadata) {
  const postUrl = `${SITE_URL}/blog/${POST_SLUG}`;
  
  // Get user ID first
  const userId = await getLinkedInUserId();
  console.log(`✓ LinkedIn User ID: ${userId}`);

  const postText = `He publicado un nuevo artículo: ${metadata.title}

${metadata.description}

🔗 Lee el artículo completo: ${postUrl}

#frontend #webdev #javascript #typescript ${metadata.category ? `#${metadata.category.toLowerCase().replace(/\s+/g, '')}` : ''}`;

  let mediaCategory = 'ARTICLE';
  let media = [
    {
      status: 'READY',
      originalUrl: postUrl,
      title: {
        text: metadata.title
      },
      description: {
        text: metadata.description
      }
    }
  ];

  if (metadata.image) {
    const ownerUrn = `urn:li:person:${userId}`;
    const { uploadUrl, asset } = await registerImageUpload(ownerUrn);
    const imageBuffer = await downloadImage(metadata.image);
    await uploadImageToLinkedIn(uploadUrl, imageBuffer);

    mediaCategory = 'IMAGE';
    media = [
      {
        status: 'READY',
        media: asset,
        title: {
          text: metadata.title
        }
      }
    ];
  }

  const payload = {
    author: `urn:li:person:${userId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: postText
        },
        shareMediaCategory: mediaCategory,
        media
      }
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
    }
  };

  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    
    const options = {
      hostname: 'api.linkedin.com',
      path: '/v2/ugcPosts',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          console.log('✅ Successfully published to LinkedIn');
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Failed to publish: ${res.statusCode} - ${responseData}`));
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
    
    await publishToLinkedIn(metadata);
    
    console.log('🎉 Done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
