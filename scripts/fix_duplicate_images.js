#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'content', 'blog');

// Replacement images to choose from when duplicates are found.
const replacements = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1526378721066-1a0c6f3b6d06?w=1200&h=600&fit=crop'
];

const fmRegex = /^---\s*\n([\s\S]*?)\n---/;

function readBlogFiles() {
  if (!fs.existsSync(blogDir)) {
    console.error('Blog directory not found:', blogDir);
    process.exit(1);
  }
  return fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
}

function extractImage(frontmatter) {
  const m = frontmatter.match(/(^|\n)image:\s*["'](.+?)["']/m);
  return m ? m[2] : null;
}

function replaceImageInFrontmatter(frontmatter, newUrl) {
  if (/\nimage:\s*["'](.+?)["']/.test(frontmatter)) {
    return frontmatter.replace(/(\nimage:\s*)["'](.+?)["']/, `$1"${newUrl}"`);
  }
  // fallback: append image field
  return frontmatter + `\nimage: "${newUrl}"`;
}

function main() {
  const files = readBlogFiles();
  const imageMap = new Map();
  const fileContents = {};

  for (const file of files) {
    const full = path.join(blogDir, file);
    const content = fs.readFileSync(full, 'utf8');
    fileContents[file] = content;
    const fmMatch = content.match(fmRegex);
    if (!fmMatch) continue;
    const fm = fmMatch[1];
    const image = extractImage(fm);
    if (!image) continue;
    if (!imageMap.has(image)) imageMap.set(image, []);
    imageMap.get(image).push(file);
  }

  const duplicates = Array.from(imageMap.entries()).filter(([, arr]) => arr.length > 1);
  if (duplicates.length === 0) {
    console.log('No duplicate images found in frontmatter.');
    return;
  }

  console.log('Found duplicated images:');
  duplicates.forEach(([img, arr]) => {
    console.log(`- ${img} used in ${arr.length} files`);
    arr.forEach(f => console.log(`   • ${f}`));
  });

  const apply = process.argv.includes('--apply');
  if (!apply) {
    console.log('\nRun with --apply to replace duplicates with fresh images from the replacement pool.');
  }

  let repIndex = 0;
  const usedReplacements = new Set();

  for (const [img, arr] of duplicates) {
    // Keep the first file as-is, replace subsequent ones
    for (let i = 1; i < arr.length; i++) {
      const file = arr[i];
      // pick next replacement not equal to any existing image or used replacement
      let candidate = null;
      for (let tries = 0; tries < replacements.length; tries++) {
        const c = replacements[repIndex % replacements.length];
        repIndex++;
        if (c === img) continue;
        if (usedReplacements.has(c)) continue;
        candidate = c; break;
      }
      if (!candidate) {
        // fallback: pick replacement even if reused
        candidate = replacements[repIndex % replacements.length];
        repIndex++;
      }
      usedReplacements.add(candidate);

      const full = path.join(blogDir, file);
      let content = fileContents[file];
      const fmMatch = content.match(fmRegex);
      if (!fmMatch) continue;
      const fm = fmMatch[1];
      const newFm = replaceImageInFrontmatter(fm, candidate);
      const newContent = content.replace(fmRegex, `---\n${newFm}\n---`);
      console.log(`${apply ? 'Replacing' : 'Would replace'} image in ${file} -> ${candidate}`);
      if (apply) {
        fs.writeFileSync(full, newContent, 'utf8');
      }
    }
  }

  console.log('\nDone.');
}

main();
