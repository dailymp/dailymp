import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

test.describe('Blog pages', () => {
  test('local blog slugs serve HTML pages', async ({ request, baseURL }) => {
    if (!baseURL) test.skip(true, 'baseURL not defined');
    let files: string[] = [];
    try {
      files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
    } catch (e) {
      test.skip(true, 'No local blog directory available');
    }

    const slugs = files.map((f) => f.replace(/\.mdx$/, ''));
    for (const slug of slugs) {
      const url = `${baseURL!.replace(/\/$/, '')}/blog/${slug}`;
      const res = await request.get(url);
      expect(res.status(), `Expected 200 for ${url}`).toBe(200);
      const body = await res.text();
      expect(/<h1>|<title>/i.test(body)).toBeTruthy();
    }
  });
});
