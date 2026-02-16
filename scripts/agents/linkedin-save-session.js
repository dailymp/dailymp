#!/usr/bin/env node

/**
 * LinkedIn Session Saver
 * Opens a browser so you can log in manually (with 2FA),
 * then saves the session cookies to a JSON file.
 *
 * Run once locally:
 *   node scripts/agents/linkedin-save-session.js
 *
 * After saving, add the cookies as a GitHub secret:
 *   LINKEDIN_COOKIES  (paste the contents of linkedin-session.json)
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SESSION_FILE = path.join(process.cwd(), 'linkedin-session.json');

async function run() {
  console.log('🔐 LinkedIn Session Saver');
  console.log('════════════════════════════════════════');
  console.log('');
  console.log('Se abrirá un navegador. Haz lo siguiente:');
  console.log('  1. Inicia sesión en LinkedIn (con 2FA si lo tienes)');
  console.log('  2. Espera a que cargue el feed');
  console.log('  3. Vuelve aquí y presiona ENTER');
  console.log('');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 },
    locale: 'es-ES',
  });

  const page = await context.newPage();
  await page.goto('https://www.linkedin.com/login', { waitUntil: 'domcontentloaded' });

  // Wait for user to log in manually
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  await new Promise((resolve) => {
    readline.question('✅ Cuando hayas iniciado sesión y veas el feed, presiona ENTER... ', () => {
      readline.close();
      resolve();
    });
  });

  // Verify we're logged in
  const currentUrl = page.url();
  if (!currentUrl.includes('linkedin.com')) {
    console.error('❌ No parece que estés en LinkedIn');
    await browser.close();
    process.exit(1);
  }

  // Save cookies
  const cookies = await context.cookies();
  const storageState = await context.storageState();

  // Save full storage state (cookies + localStorage)
  fs.writeFileSync(SESSION_FILE, JSON.stringify(storageState, null, 2));

  console.log('');
  console.log('════════════════════════════════════════');
  console.log(`✅ Sesión guardada en: ${SESSION_FILE}`);
  console.log(`   ${cookies.length} cookies guardadas`);
  console.log('');
  console.log('📝 Próximos pasos:');
  console.log('  1. Copia el contenido del archivo:');
  console.log(`     cat ${SESSION_FILE} | pbcopy`);
  console.log('  2. Ve a GitHub → Settings → Secrets → Actions');
  console.log('  3. Crea un secret: LINKEDIN_COOKIES');
  console.log('  4. Pega el contenido como valor');
  console.log('');
  console.log('⚠️  NO subas linkedin-session.json al repo.');
  console.log('   Ya está en .gitignore.');
  console.log('');

  await browser.close();
}

run().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
