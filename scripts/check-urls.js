const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const cheerio = require('cheerio');

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const SITEMAP_URL = `${BASE.replace(/\/$/, '')}/sitemap.xml`;
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

async function fetchText(url) {
  const resp = await fetch(url);
  const text = await resp.text();
  return { ok: resp.ok, status: resp.status, text };
}

async function main() {
  console.log(`Base URL: ${BASE}`);
  console.log(`Fetching sitemap: ${SITEMAP_URL}`);

  let sitemapText;
  try {
    const r = await fetchText(SITEMAP_URL);
    if (!r.ok) {
      console.error(`Failed to fetch sitemap (${r.status}). Aborting.`);
      process.exit(2);
    }
    sitemapText = r.text;
  } catch (e) {
    console.error('Error fetching sitemap:', e.message);
    process.exit(2);
  }

  const parser = new XMLParser({ ignoreAttributes: false });
  let sitemap;
  try {
    sitemap = parser.parse(sitemapText);
  } catch (e) {
    console.error('Failed to parse sitemap.xml:', e.message);
    process.exit(2);
  }

  const urls = [];
  const urlset = sitemap.urlset;
  if (!urlset) {
    console.error('sitemap.xml does not contain <urlset>');
    process.exit(2);
  }

  if (Array.isArray(urlset.url)) {
    for (const u of urlset.url) urls.push(u.loc);
  } else if (urlset.url && urlset.url.loc) {
    urls.push(urlset.url.loc);
  }

  const sitemapSet = new Set(urls.map((u) => u.replace(/\/$/, '')));

  // Read local blog slugs
  let files = [];
  try {
    files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  } catch (e) {
    console.warn('Could not read content/blog directory:', e.message);
  }

  const localSlugs = files.map((f) => f.replace(/\.mdx$/, ''));
  const expectedBlogUrls = localSlugs.map((s) => `${BASE.replace(/\/$/, '')}/blog/${s}`);
  const expectedSet = new Set(expectedBlogUrls.map((u) => u.replace(/\/$/, '')));

  // Compare local blog files vs sitemap
  const missingInSitemap = expectedBlogUrls.filter((u) => !sitemapSet.has(u.replace(/\/$/, '')));
  const extraInSitemap = urls.filter((u) => u.includes('/blog/') && !expectedSet.has(u.replace(/\/$/, '')));

  if (missingInSitemap.length) {
    console.warn('Local blog files missing from sitemap:');
    missingInSitemap.forEach((u) => console.warn('  -', u));
  } else {
    console.log('All local blog files are present in sitemap.');
  }

  if (extraInSitemap.length) {
    console.warn('Sitemap contains blog URLs that do not exist locally:');
    extraInSitemap.forEach((u) => console.warn('  -', u));
  }

  // Now verify each sitemap URL responds 200 and contains basic HTML structure
  console.log('\nChecking sitemap URLs (this may take a few seconds)...');

  const results = [];
  for (const u of urls) {
    try {
      const r = await fetchText(u);
      if (!r.ok) {
        results.push({ url: u, ok: false, status: r.status, reason: 'Non-200 response' });
        console.error(`✖ ${u} -> HTTP ${r.status}`);
        continue;
      }

      // basic HTML checks: has <title> or <h1>
      const $ = cheerio.load(r.text);
      const title = $('title').first().text().trim();
      const h1 = $('h1').first().text().trim();

      results.push({ url: u, ok: true, status: r.status, title: title || h1 || '(no title)' });
      console.log(`✔ ${u} -> 200 (${title || h1 || 'no title'})`);
    } catch (e) {
      results.push({ url: u, ok: false, status: null, reason: e.message });
      console.error(`✖ ${u} -> error: ${e.message}`);
    }
  }

  // Summary
  const failed = results.filter((r) => !r.ok);
  console.log('\nSummary:');
  console.log(`  Sitemap URLs checked: ${results.length}`);
  console.log(`  Failed requests: ${failed.length}`);
  if (failed.length) failed.forEach((f) => console.log(`    - ${f.url} (${f.reason || f.status})`));

  const problems = missingInSitemap.length + extraInSitemap.length + failed.length;
  if (problems > 0) {
    console.error(`\nCompleted with ${problems} problem(s).`);
    process.exit(3);
  }

  console.log('\nAll checks passed.');
  process.exit(0);
}

main();
