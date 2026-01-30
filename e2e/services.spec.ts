import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

const SERVICES_DIR = path.join(process.cwd(), 'app', 'servicios');
const SERVICES_EN_DIR = path.join(process.cwd(), 'app', 'en', 'servicios');

function dirSlugs(dir: string) {
  try {
    return fs.readdirSync(dir).filter((f) => {
      const full = path.join(dir, f);
      return fs.statSync(full).isDirectory() || f.endsWith('.tsx') || f.endsWith('.jsx') || f.endsWith('.mdx');
    }).map((f) => f.replace(/\.tsx$|\.jsx$|\.mdx$/, ''));
  } catch (e) {
    return [];
  }
}

test.describe('Service pages', () => {
  test('service routes render and are reachable', async ({ request, baseURL }) => {
    if (!baseURL) test.skip(true, 'baseURL not defined');
    const base = baseURL!.replace(/\/$/, '');

    const esSlugs = dirSlugs(SERVICES_DIR);
    const enSlugs = dirSlugs(SERVICES_EN_DIR);

    const routes = new Set<string>();

    // build es routes
    for (const s of esSlugs) {
      // if file is 'integracion-ia' or directory
      const route = `${base}/servicios/${s}`;
      routes.add(route);
    }

    // build en routes
    for (const s of enSlugs) {
      const route = `${base}/en/servicios/${s}`;
      routes.add(route);
    }

    // Also try mapping ES <-> EN for same slug (if EN folder missing)
    for (const s of esSlugs) {
      const enRoute = `${base}/en/servicios/${s}`;
      routes.add(enRoute);
    }

    if (routes.size === 0) test.skip(true, 'No servicios pages found in repo');

    for (const r of Array.from(routes)) {
      const res = await request.get(r);
      expect(res.status(), `Expected 200 for ${r}`).toBe(200);
      const body = await res.text();
      expect(/<h1>|<title>/i.test(body)).toBeTruthy();
    }
  });
});
