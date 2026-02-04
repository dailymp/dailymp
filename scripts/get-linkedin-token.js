#!/usr/bin/env node

/**
 * LinkedIn OAuth Token Generator
 * Generates an access token for LinkedIn API
 */

const https = require('https');
const { spawn } = require('child_process');

console.log('🔐 LinkedIn OAuth Token Generator\n');

const CLIENT_ID = process.argv[2];
const CLIENT_SECRET = process.argv[3];
const REDIRECT_URI = 'https://localhost';
const STATE = Math.random().toString(36).substring(7);

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Usage: node scripts/get-linkedin-token.js CLIENT_ID CLIENT_SECRET\n');
  process.exit(1);
}

// Step 1: Generate authorization URL
const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${STATE}&scope=r_profile_basicinfo%20w_member_social`;

console.log('📋 PASO 1: Autoriza la aplicación');
console.log('───────────────────────────────────');
console.log('Abre esta URL en tu navegador:\n');
console.log(authUrl);
console.log('\n');

// Try to open in browser automatically
try {
  const platform = process.platform;
  if (platform === 'darwin') {
    spawn('open', [authUrl]);
  } else if (platform === 'win32') {
    spawn('cmd', ['/c', 'start', authUrl]);
  } else if (platform === 'linux') {
    spawn('xdg-open', [authUrl]);
  }
  console.log('✓ Abriendo navegador...\n');
} catch (e) {
  // Silent fail
}

console.log('📋 PASO 2: Copia el código de autorización');
console.log('───────────────────────────────────────────');
console.log('Después de autorizar, serás redirigido a:');
console.log('https://localhost/?code=CODIGO_AQUI&state=...\n');
console.log('IMPORTANTE: Ignora el error de "sitio no encontrado"');
console.log('Solo copia el valor de "code" de la URL\n');

// Read authorization code from stdin
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Pega el código aquí: ', (code) => {
  readline.close();
  
  if (!code || code.trim() === '') {
    console.error('❌ Código vacío');
    process.exit(1);
  }

  console.log('\n🔄 Intercambiando código por access token...\n');

  // Step 2: Exchange code for access token
  const postData = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code.trim(),
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI
  }).toString();

  const options = {
    hostname: 'www.linkedin.com',
    path: '/oauth/v2/accessToken',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        const response = JSON.parse(data);
        console.log('✅ ¡Token generado exitosamente!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Access Token:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(response.access_token);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log(`Expira en: ${response.expires_in} segundos (${Math.round(response.expires_in / 86400)} días)\n`);
        console.log('📝 Próximos pasos:');
        console.log('1. Ve a tu repo en GitHub → Settings → Secrets → Actions');
        console.log('2. Crea un nuevo secret llamado: LINKEDIN_ACCESS_TOKEN');
        console.log('3. Pega el token de arriba como valor');
        console.log('4. Crea una variable llamada: ENABLE_LINKEDIN con valor "true"\n');
      } else {
        console.error('❌ Error al obtener token:', res.statusCode);
        console.error(data);
        process.exit(1);
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Error:', e.message);
    process.exit(1);
  });

  req.write(postData);
  req.end();
});
