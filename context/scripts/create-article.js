#!/usr/bin/env node
// Simple scaffolding script to create bilingual MDX article files from JSON input.
// Usage: node create-article.js ./data/article.json

const fs = require('fs');
const path = require('path');

function slugify(s) {
  return s
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const input = process.argv[2];
if (!input) {
  console.error('Usage: node create-article.js ./data/article.json');
  process.exit(1);
}

const raw = fs.readFileSync(input, 'utf8');
const data = JSON.parse(raw);

const slugBase = data.slug || slugify(data.title_es || data.title_en);
const date = data.date || new Date().toISOString();

const esFront = `---\ntitle: "${data.title_es}"\ndate: "${date}"\ndescription: "${data.summary_es || ''}"\nauthor: "${data.author || 'Daily Miranda Pardo'}"\ncategory: "${data.category || 'General'}"\nimage: "${data.image || ''}"\nlang: "es"\nkeywords: [${(data.keywords||[]).map(k=>`"${k}"`).join(', ')}]\n---\n\n`;
const enFront = `---\ntitle: "${data.title_en || data.title_es}"\ndate: "${date}"\ndescription: "${data.summary_en || data.summary_es || ''}"\nauthor: "${data.author_en || data.author || 'Daily Miranda Pardo'}"\ncategory: "${data.category_en || data.category || 'General'}"\nimage: "${data.image_en || data.image || ''}"\nlang: "en"\nkeywords: [${(data.keywords_en||data.keywords||[]).map(k=>`"${k}"`).join(', ')}]\n---\n\n`;

const esBody = data.body_es || `# ${data.title_es}\n\n${data.summary_es || ''}\n\nContenido...`;
const enBody = data.body_en || `# ${data.title_en || data.title_es}\n\n${data.summary_en || data.summary_es || ''}\n\nContent...`;

const contentDir = path.join(process.cwd(), 'content', 'blog');
if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });

const esPath = path.join(contentDir, `${slugBase}.mdx`);
const enPath = path.join(contentDir, `${slugBase}-en.mdx`);

fs.writeFileSync(esPath, esFront + esBody, 'utf8');
fs.writeFileSync(enPath, enFront + enBody, 'utf8');

console.log('Created:', esPath);
console.log('Created:', enPath);
