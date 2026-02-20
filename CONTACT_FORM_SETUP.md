# Configuración del Formulario de Contacto con Supabase

## ✅ Archivos creados

- `supabase/migrations/001_contact_messages.sql` - Migración de base de datos
- `lib/supabase.ts` - Cliente de Supabase
- `app/components/ContactForm.tsx` - Componente del formulario
- `app/api/contact/route.ts` - API route para manejar envíos
- `app/components/HomePage.tsx` - Actualizado con el formulario

## 📋 Pasos para configurar

### 1. Instalar dependencia de Supabase

```bash
cd /Users/day/projects/dailymp
npm install @supabase/supabase-js
```

### 2. Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Click en "New project"
3. Elige un nombre para tu proyecto (ej: `dailymp-blog`)
4. Elige una región cercana (ej: `West Europe` si estás en España)
5. Crea una contraseña segura para la base de datos
6. Click en "Create new project" (tarda ~2 minutos)

### 3. Obtener las credenciales

Una vez creado el proyecto:

1. Ve a **Settings** (icono de engranaje en el sidebar)
2. Click en **API** en el menú lateral
3. Copia estas dos credenciales:
   - `Project URL` (algo como `https://xxxxx.supabase.co`)
   - `anon public` key (bajo "Project API keys")

### 4. Configurar variables de entorno

Crea o edita el archivo `.env.local` en la raíz del proyecto:

```bash
# En /Users/day/projects/dailymp/.env.local
NEXT_PUBLIC_SUPABASE_URL=tu-project-url-aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

⚠️ **IMPORTANTE**: No compartas estas keys públicamente ni las subas a Git.

### 5. Crear la tabla en Supabase

Opción A - **SQL Editor** (recomendado):

1. Ve a **SQL Editor** en el sidebar de Supabase
2. Click en "New query"
3. Copia y pega todo el contenido de `supabase/migrations/001_contact_messages.sql`
4. Click en "Run" o presiona `Ctrl/Cmd + Enter`
5. Deberías ver "Success. No rows returned"

Opción B - **Table Editor** (manual):

1. Ve a **Table Editor** en Supabase
2. Click en "Create a new table"
3. Nombra la tabla: `contact_messages`
4. Agrega las columnas:
   - `id`: int8, primary key, auto-increment
   - `name`: text, not null
   - `email`: text, not null
   - `message`: text, not null
   - `created_at`: timestamptz, default now()
   - `read`: bool, default false
   - `metadata`: jsonb, default '{}'

### 6. Configurar Row Level Security (RLS) - Opcional pero recomendado

En el SQL Editor de Supabase, ejecuta:

```sql
-- Habilitar RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Política: permitir insertar a cualquiera (para el formulario)
CREATE POLICY "Permitir insertar mensajes" ON contact_messages
  FOR INSERT TO anon
  WITH CHECK (true);

-- Política: solo tú puedes leer los mensajes (necesitarás autenticarte)
CREATE POLICY "Solo owner puede leer" ON contact_messages
  FOR SELECT TO authenticated
  USING (true);
```

### 7. Probar localmente

```bash
npm run dev
```

Ve a `http://localhost:3000/#contact` y prueba enviar un mensaje.

### 8. Verificar en Supabase

1. Ve a **Table Editor** en Supabase
2. Selecciona la tabla `contact_messages`
3. Deberías ver tu mensaje de prueba

### 9. Configurar en Hostinger

Cuando despliegues a producción:

1. En el panel de Hostinger, ve a la configuración de tu aplicación
2. Busca "Environment Variables" o "Variables de entorno"
3. Agrega las mismas variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy o reinicia la aplicación

### 10. Recibir notificaciones por email (Opcional)

Para recibir un email cada vez que alguien te escriba, necesitas integrar un servicio de email. Las mejores opciones:

#### Opción A: Resend (recomendado)

```bash
npm install resend
```

1. Crea cuenta en [https://resend.com](https://resend.com) (100 emails/día gratis)
2. Obtén tu API key
3. Agrega a `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxx
   ```

4. Actualiza `app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Después de insertar en Supabase:
await resend.emails.send({
  from: 'contacto@tudominio.com',
  to: 'tu@email.com',
  subject: `Nuevo mensaje de ${name}`,
  html: `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${message}</p>
  `
});
```

#### Opción B: Edge Function en Supabase

Puedes crear un trigger en Supabase que envíe un email automáticamente cuando se inserte un nuevo mensaje. Esto requiere configurar Supabase Email o usar webhooks.

## 🎨 Personalización

### Cambiar estilos del formulario

Edita `app/components/ContactForm.tsx` y modifica las clases de Tailwind.

### Agregar más campos

1. Actualiza el SQL para agregar la columna:
```sql
ALTER TABLE contact_messages ADD COLUMN phone TEXT;
```

2. Actualiza el componente ContactForm con el nuevo campo
3. Actualiza el API route para guardar el nuevo campo

### Ver mensajes en un dashboard

Puedes crear una página admin en Next.js:

```typescript
// app/admin/messages/page.tsx
import { supabase } from '@/lib/supabase';

export default async function MessagesPage() {
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1>Mensajes de contacto</h1>
      {messages?.map(msg => (
        <div key={msg.id}>
          <h3>{msg.name} - {msg.email}</h3>
          <p>{msg.message}</p>
          <small>{new Date(msg.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
```

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"

- Verifica que `.env.local` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo (`npm run dev`)

### Error: "relation contact_messages does not exist"

- Asegúrate de haber ejecutado el SQL en Supabase
- Verifica que estás conectado al proyecto correcto

### El formulario no envía / Error 500

- Abre la consola del navegador (F12)
- Revisa Network tab para ver el error exacto
- Verifica que las credenciales de Supabase sean correctas

### No recibo emails

- Implementa Resend o similar (ver paso 10)
- O revisa directamente en Supabase Table Editor

## 📊 Monitoreo

Puedes ver todos los mensajes directamente en Supabase:
1. Table Editor → `contact_messages`
2. O crear queries personalizadas en SQL Editor

## 🔐 Seguridad

- Las keys `NEXT_PUBLIC_*` son seguras para el frontend
- RLS protege que solo inserten, no lean datos
- Considera agregar rate limiting con Upstash or similar
- Agrega CAPTCHA (hCaptcha/reCAPTCHA) si recibes spam

## ✅ Checklist final

- [ ] `npm install @supabase/supabase-js` ejecutado
- [ ] Proyecto creado en Supabase
- [ ] Variables de entorno configuradas en `.env.local`
- [ ] Tabla `contact_messages` creada
- [ ] Formulario probado localmente
- [ ] Variables configuradas en Hostinger (producción)
- [ ] (Opcional) Resend configurado para notificaciones

¡Listo! Tu formulario de contacto ya está integrado con Supabase.
