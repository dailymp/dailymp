import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import { XMLParser } from 'fast-xml-parser';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

test.describe('Sitemap and URL checks', () => {
  test('sitemap contains valid URLs and pages respond 200', async ({ request, baseURL }) => {
    const sitemapUrl = `${baseURL.replace(/\/$/, '')}/sitemap.xml`;
    const res = await request.get(sitemapUrl);
    expect(res.status()).toBe(200);
    const text = await res.text();

    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed = parser.parse(text);
    expect(parsed.urlset).toBeTruthy();

    const urls = Array.isArray(parsed.urlset.url)
      ? parsed.urlset.url.map((u: any) => u.loc)
      : [parsed.urlset.url.loc];

    // Basic page checks: reachable + contains <title> or <h1>
    for (const u of urls) {
      const pageRes = await request.get(u);
      expect(pageRes.status(), `Expected 200 for ${u}`).toBe(200);
      const body = await pageRes.text();
      expect(/<title>|<h1>/i.test(body)).toBeTruthy();
    }

    // Ensure local blog files appear in sitemap
    let files: string[] = [];
    try {
      files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
    } catch (e) {
      // ignore if not available in CI
    }

    const localSlugs = files.map((f) => f.replace(/\.mdx$/, ''));
    for (const slug of localSlugs) {
      const expected = `${baseURL.replace(/\/$/, '')}/blog/${slug}`;
      expect(urls.includes(expected)).toBeTruthy();
    }
  });
});
