# 🤖 Automatización de Publicaciones en Redes Sociales con GitHub Actions

Sistema completo de automatización para publicar tus posts del blog automáticamente en LinkedIn, Facebook y Telegram cuando haces commit de un nuevo artículo.

## ✨ Características

- ✅ **Totalmente automático**: Se dispara al hacer push de un nuevo `.mdx`
- ✅ **Cero dependencias externas**: Solo APIs nativas de Node.js
- ✅ **Control granular**: Habilita/deshabilita redes individualmente
- ✅ **Manual trigger**: Republica posts antiguos cuando quieras
- ✅ **Seguro**: Tokens en GitHub Secrets

## 🚀 Configuración Rápida

### 1. Configurar GitHub Secrets

Ve a tu repo → **Settings** → **Secrets and variables** → **Actions**

#### LinkedIn

1. **Obtener Access Token**:
   - Ve a [LinkedIn Developers](https://www.linkedin.com/developers/)
   - Crea una app en "My Apps"
   - En "Auth" → Redirect URLs: agrega `https://localhost`
   - Anota `Client ID` y `Client Secret`
   - Genera token con scope `w_member_social` usando OAuth 2.0
   - [Guía completa](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication)

2. **Agregar secret**:
   ```
   LINKEDIN_ACCESS_TOKEN=tu_token_aqui
   ```

#### Facebook

1. **Obtener Page Access Token**:
   - Ve a [Facebook Developers](https://developers.facebook.com/)
   - Crea una app (tipo "Business")
   - En herramientas → Graph API Explorer
   - Selecciona tu página
   - Genera token con permisos: `pages_manage_posts`, `pages_read_engagement`
   - [Convertir a token permanente](node scripts/get-facebook-token.js TU_APP_ID TU_APP_SECRET TOKEN_TEMPORAL)

2. **Obtener Page ID**:
   - Ve a tu página de Facebook
   - Settings → Page Info → Page ID

3. **Agregar secrets**:
   ```
   FACEBOOK_PAGE_ACCESS_TOKEN=tu_token_aqui
   FACEBOOK_PAGE_ID=tu_page_id
   ```

#### Telegram

1. **Crear Bot**:
   - Habla con [@BotFather](https://t.me/botfather) en Telegram
   - Envía `/newbot` y sigue las instrucciones
   - Guarda el token que te da: 


2. **Crear Canal**:
   - Crea un canal público en Telegram
   - Agrega el bot como administrador
   - El Channel ID es `@tu_canal` o obtén el ID numérico:  
     ```bash
     curl https://api.telegram.org/bot<TU_BOT_TOKEN>/getUpdates
     ```

3. **Agregar secrets**:
   ```
   TELEGRAM_BOT_TOKEN=
   TELEGRAM_CHANNEL_ID=
   ```

### 2. Configurar Variables (opcional)

En **Settings** → **Secrets and variables** → **Actions** → **Variables**:

```
ENABLE_LINKEDIN=true
ENABLE_FACEBOOK=true
ENABLE_TELEGRAM=true
```

Esto permite habilitar/deshabilitar redes sin tocar el código.

### 3. ¡Listo! 🎉

Ya está todo configurado. Ahora cada vez que hagas commit de un nuevo post:

```bash
git add content/blog/09-mi-nuevo-post.mdx
git commit -m "Nuevo post: Mi título"
git push
```

El workflow se ejecutará automáticamente y publicará en todas las redes configuradas.

## 📝 Uso

### Publicación Automática

1. Crea tu post en `content/blog/09-mi-nuevo-post.mdx`
2. Haz commit y push
3. El workflow detecta el nuevo archivo
4. Publica automáticamente en todas las redes habilitadas

### Publicación Manual

Si quieres republicar un post existente:

1. Ve a **Actions** en tu repo
2. Selecciona "Publish Blog Post to Social Media"
3. Click en "Run workflow"
4. Ingresa el slug del post (ej: `08-agentes-ia-desarrollo-frontend-en`)
5. Run!

## 🎨 Personalizar Mensajes

Edita los scripts en `scripts/` para cambiar el formato:

### LinkedIn ([publish-linkedin.js](scripts/publish-linkedin.js))
```javascript
const postText = `He publicado un nuevo artículo: ${metadata.title}

${metadata.description}

🔗 Lee el artículo completo: ${postUrl}

#frontend #webdev #javascript`;
```

### Facebook ([publish-facebook.js](scripts/publish-facebook.js))
```javascript
const message = `${metadata.title}

${metadata.description}

Lee el artículo completo: ${postUrl}`;
```

### Telegram ([publish-telegram.js](scripts/publish-telegram.js))
```javascript
const message = `🆕 <b>${metadata.title}</b>

${metadata.description}

<a href="${postUrl}">📖 Leer artículo completo</a>`;
```

## 🔧 Troubleshooting

### Ver logs de ejecución

1. Ve a **Actions** en tu repo
2. Click en el workflow que falló
3. Expande los pasos para ver el error

### Errores comunes

**LinkedIn: Token expired**
- Los tokens de LinkedIn expiran. Regenera uno nuevo siguiendo el paso 1 de configuración.

**Facebook: (#200) Permissions error**
- Verifica que el token tenga los permisos correctos
- Asegúrate de que sea un Page Access Token, no User Access Token

**Telegram: Chat not found**
- Verifica que el bot sea administrador del canal
- El Channel ID debe empezar con `@` o ser numérico (ej: `-1001234567890`)

### Probar scripts localmente

```bash
# LinkedIn
export LINKEDIN_ACCESS_TOKEN=tu_token
export POST_SLUG=08-agentes-ia-desarrollo-frontend-en
node scripts/publish-linkedin.js

# Facebook
export FACEBOOK_PAGE_ACCESS_TOKEN=tu_token
export FACEBOOK_PAGE_ID=tu_page_id
export POST_SLUG=08-agentes-ia-desarrollo-frontend-en
node scripts/publish-facebook.js

# Telegram
export TELEGRAM_BOT_TOKEN=tu_token
export TELEGRAM_CHANNEL_ID=@tu_canal
export POST_SLUG=08-agentes-ia-desarrollo-frontend-en
node scripts/publish-telegram.js
```

## 🔐 Seguridad

- ✅ Tokens almacenados en GitHub Secrets (encriptados)
- ✅ No se exponen en logs
- ✅ Scripts sin dependencias externas (menos superficie de ataque)
- ✅ Solo se ejecuta en push a main/master

## 🎯 Ventajas vs IFTTT/Zapier

| Característica | GitHub Actions | IFTTT/Zapier |
|----------------|----------------|--------------|
| **Costo** | Gratis (2000 min/mes) | Limitado en plan free |
| **Redes** | Ilimitadas | 2-5 en plan free |
| **Personalización** | Total | Limitada |
| **Control** | Código en tu repo | Plataforma externa |
| **Velocidad** | Inmediato al push | 15-60 min polling |
| **Formato** | Personalizable | Plantillas fijas |

## 📊 Monitoreo

Cada ejecución crea un resumen en GitHub Actions:

```
🎉 Blog Post Published

Post: 08-agentes-ia-desarrollo-frontend-en

Published to:
- ✅ LinkedIn
- ✅ Facebook
- ✅ Telegram
```

## 🚀 Próximos Pasos

### Instagram (avanzado)

Instagram no tiene API oficial para publicación automática. Alternativas:

1. **Meta Business Suite API** (requiere verificación)
2. **APIs no oficiales** (arriesgado, puede romper)
3. **Buffer/Later** para programación manual

### WhatsApp Business

Requiere WhatsApp Business API (solo para empresas verificadas):
- [Guía oficial](https://developers.facebook.com/docs/whatsapp)
- Alternativa: Usar Telegram como reemplazo

## 📖 Recursos

- [LinkedIn API Docs](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/share-api)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**¿Problemas?** Abre un issue en el repo o revisa los logs en Actions.
