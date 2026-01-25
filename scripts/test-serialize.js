const fs = require('fs');
const path = require('path');
const serialize = require('next-mdx-remote/serialize').serialize;
const remarkGfm = require('remark-gfm');
(async () => {
  try {
    const fullPath = path.join(process.cwd(), 'content/blog/01-ai-integration-best-practices-en.mdx');
    const content = fs.readFileSync(fullPath, 'utf8');
    // Try dynamic import of remark-gfm like in the page
    const mod = await import('remark-gfm');
    const rg = mod && (mod.default || mod);
    const mdx = await serialize(content, { mdxOptions: { remarkPlugins: rg ? [rg] : [] } });
    console.log('Serialized ok', typeof mdx);
  } catch (e) {
    console.error('Error serializing:', e);
  }
})();
