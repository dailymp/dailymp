#!/usr/bin/env node

/**
 * Facebook Page Access Token Generator
 * Converts short-lived token to long-lived (never expires) Page Access Token
 */

const https = require('https');

console.log('🔐 Facebook Page Access Token Generator\n');

const APP_ID = process.argv[2];
const APP_SECRET = process.argv[3];
const SHORT_LIVED_TOKEN = process.argv[4];

if (!APP_ID || !APP_SECRET || !SHORT_LIVED_TOKEN) {
  console.error('❌ Usage: node scripts/get-facebook-token.js APP_ID APP_SECRET SHORT_LIVED_USER_TOKEN\n');
  console.error('Para obtener el SHORT_LIVED_USER_TOKEN:');
  console.error('1. Ve a https://developers.facebook.com/tools/explorer/');
  console.error('2. Selecciona tu app');
  console.error('3. Genera token con permisos: pages_manage_posts, pages_read_engagement');
  console.error('4. Copia el token generado\n');
  process.exit(1);
}

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    https.get(`https://graph.facebook.com/v18.0${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

(async () => {
  try {
    console.log('📋 PASO 1: Convirtiendo a Long-Lived User Token...');
    
    // Step 1: Exchange short-lived token for long-lived user token
    const llUserToken = await makeRequest(
      `/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${SHORT_LIVED_TOKEN}`
    );
    
    console.log('✓ Long-Lived User Token obtenido\n');

    console.log('📋 PASO 2: Obteniendo lista de páginas...');
    
    // Step 2: Get user's pages
    const pages = await makeRequest(
      `/me/accounts?access_token=${llUserToken.access_token}`
    );

    if (!pages.data || pages.data.length === 0) {
      console.error('❌ No se encontraron páginas asociadas a esta cuenta');
      process.exit(1);
    }

    console.log(`✓ Encontradas ${pages.data.length} página(s)\n`);

    // Display pages
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Tus Páginas de Facebook:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    pages.data.forEach((page, index) => {
      console.log(`${index + 1}. ${page.name}`);
      console.log(`   Page ID: ${page.id}`);
      console.log(`   Category: ${page.category || 'N/A'}`);
      console.log('');
    });

    // If only one page, use it automatically
    let selectedPage;
    if (pages.data.length === 1) {
      selectedPage = pages.data[0];
      console.log(`✓ Seleccionada automáticamente: ${selectedPage.name}\n`);
    } else {
      // Ask user to select
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      await new Promise((resolve) => {
        readline.question('Selecciona el número de página: ', (answer) => {
          readline.close();
          const index = parseInt(answer) - 1;
          if (index >= 0 && index < pages.data.length) {
            selectedPage = pages.data[index];
            console.log(`\n✓ Seleccionada: ${selectedPage.name}\n`);
            resolve();
          } else {
            console.error('❌ Selección inválida');
            process.exit(1);
          }
        });
      });
    }

    console.log('📋 PASO 3: Generando Page Access Token permanente...\n');

    // The page access token from /me/accounts is already long-lived
    const pageAccessToken = selectedPage.access_token;

    console.log('✅ ¡Tokens generados exitosamente!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Page Access Token (permanente):');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(pageAccessToken);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Page ID:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(selectedPage.id);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('ℹ️  Este token NO expira mientras:');
    console.log('   • La app permanezca activa');
    console.log('   • No cambies la contraseña de Facebook');
    console.log('   • No revoques permisos manualmente\n');

    console.log('📝 Próximos pasos:');
    console.log('1. Ve a tu repo en GitHub → Settings → Secrets → Actions');
    console.log('2. Crea un secret: FACEBOOK_PAGE_ACCESS_TOKEN con el token de arriba');
    console.log('3. Crea un secret: FACEBOOK_PAGE_ID con el Page ID de arriba');
    console.log('4. Crea una variable: ENABLE_FACEBOOK con valor "true"\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
