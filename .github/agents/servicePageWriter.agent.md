---
description: 'Agente automatizado para crear páginas de servicio bilingües (ES/EN) con SEO completo para DailyMP. Genera estructura completa con layout, page, traducciones y datos estructurados.'
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
---

# Service Page Writer Agent - DailyMP

## Propósito
Este agente crea páginas de servicio bilingües (español e inglés) completamente optimizadas para SEO, siguiendo el diseño y estructura de las páginas existentes como `bug-shield` y `ai-driven-development`. Solo necesitas proporcionar información básica sobre el servicio y el experto que lo ofrece.

## Flujo de trabajo

Cuando el usuario proporcione información del servicio, el agente DEBE seguir estos pasos en orden:

### PASO 1: RECOPILAR INFORMACIÓN
Solicitar al usuario:
- **Nombre del servicio** (obligatorio)
- **Descripción breve del servicio** (obligatorio)
- **Nombre del experto/profesional** que ofrece el servicio (obligatorio)
- **LinkedIn del experto** (obligatorio)
- **GitHub del experto** (opcional)
- **Especialización/bio del experto** (obligatorio)
- **3 estadísticas destacadas** del servicio (ej: "100+ proyectos", "5 años experiencia")
- **3 características principales** del servicio
- **4 puntos técnicos/metodológicos** del servicio

Si el usuario ya proporcionó esta información, proceder al paso 2.

### PASO 2: GENERAR IDENTIFICADORES
- Crear `serviceSlug` en kebab-case (ej: "mi-nuevo-servicio")
- Crear `serviceKey` en camelCase para traducciones (ej: "miNuevoServicio")
- Generar iniciales del experto para el avatar (ej: "OD" para "Omar Díaz")

### PASO 3: INVESTIGAR ESTRUCTURA EXISTENTE
Leer archivos de referencia para mantener consistencia:
- `dailymp/app/servicios/bug-shield/page.tsx` - Estructura de página
- `dailymp/app/servicios/bug-shield/layout.tsx` - Metadata SEO
- `dailymp/config/translations.ts` - Sistema de traducciones
- `dailymp/config/site.ts` - Configuración del sitio

### PASO 4: AÑADIR TRADUCCIONES
Editar `dailymp/config/translations.ts` para añadir las claves de traducción.

**Claves requeridas (ES y EN):**

```typescript
// En el objeto 'es':
{serviceKey}Title: "Título del Servicio",
{serviceKey}Desc: "Descripción corta del servicio para hero.",
{serviceKey}Stat1Value: "100+",
{serviceKey}Stat1Label: "Etiqueta estadística 1",
{serviceKey}Stat2Value: "5+",
{serviceKey}Stat2Label: "Etiqueta estadística 2",
{serviceKey}Stat3Value: "24/7",
{serviceKey}Stat3Label: "Etiqueta estadística 3",
{serviceKey}WhatWeDoTitle: "Qué hacemos",
{serviceKey}WhatWeDoDesc: "Descripción de lo que ofrece el servicio.",
{serviceKey}Feature1Title: "Característica 1",
{serviceKey}Feature1Desc: "Descripción de característica 1.",
{serviceKey}Feature2Title: "Característica 2",
{serviceKey}Feature2Desc: "Descripción de característica 2.",
{serviceKey}Feature3Title: "Característica 3",
{serviceKey}Feature3Desc: "Descripción de característica 3.",
{serviceKey}MethodTitle: "Nuestra Metodología",
{serviceKey}MethodDesc: "Descripción de la metodología.",
{serviceKey}MethodPoint1: "Punto metodológico 1",
{serviceKey}MethodPoint2: "Punto metodológico 2",
{serviceKey}MethodPoint3: "Punto metodológico 3",
{serviceKey}MethodPoint4: "Punto metodológico 4",
{serviceKey}ExpertDesc: "Bio/descripción del experto.",
{serviceKey}ContactTitle: "¿Listo para empezar?",
{serviceKey}ContactDesc: "Descripción del CTA de contacto.",
{serviceKey}ContactCTA: "Solicitar Consultoría",

// En el objeto 'en': (traducciones al inglés)
```

### PASO 5: CREAR LAYOUT ESPAÑOL
Crear archivo `dailymp/app/servicios/{serviceSlug}/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "{Título del Servicio} | DailyMP",
  description: "{Meta description 120-160 chars con keyword principal}",
  keywords: [
    "keyword1",
    "keyword2",
    "keyword3",
    // 5-10 keywords relevantes
  ],
  openGraph: {
    title: "{Título del Servicio} | DailyMP",
    description: "{Descripción para compartir en redes}",
    url: `${siteConfig.url}/servicios/{serviceSlug}`,
    type: "article",
    images: [{
      url: siteConfig.seo.image,
      width: 1200,
      height: 630,
      alt: "{Título del Servicio}",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "{Título del Servicio}",
    description: "{Descripción corta para Twitter}",
    images: [siteConfig.seo.image],
  },
  alternates: {
    canonical: `${siteConfig.url}/servicios/{serviceSlug}`,
    languages: {
      "es": `${siteConfig.url}/servicios/{serviceSlug}`,
      "en": `${siteConfig.url}/en/servicios/{serviceSlug}`,
    },
  },
};

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "{Nombre del Servicio}",
    description: "{Descripción del servicio}",
    url: `${siteConfig.url}/servicios/{serviceSlug}`,
    serviceType: "{Tipo de servicio}",
    provider: {
      "@type": "Person",
      name: "{Nombre del Experto}",
      url: "{LinkedIn del experto}",
      sameAs: ["{LinkedIn}", "{GitHub si aplica}"],
    },
    areaServed: "Worldwide",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/#services` },
      { "@type": "ListItem", position: 3, name: "{Nombre Servicio}", item: `${siteConfig.url}/servicios/{serviceSlug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  );
}
```

### PASO 6: CREAR PÁGINA ESPAÑOL
Crear archivo `dailymp/app/servicios/{serviceSlug}/page.tsx`:

```tsx
"use client";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/app/context/LanguageContext";

export default function {ServiceName}Page() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400">
        <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
        <span>/</span>
        <a href="/#services" className="hover:text-purple-400 transition-colors">{t("services")}</a>
        <span>/</span>
        <span className="text-purple-400">{t("{serviceKey}Title")}</span>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/6 via-purple-800/6 to-pink-900/6" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("{serviceKey}Title")}</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto text-balance">{t("{serviceKey}Desc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#services" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">{t("viewServices")}</a>
            <a href="#contact" className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105">{t("getInTouch")}</a>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 bg-gradient-to-r from-purple-800/10 via-pink-800/10 to-purple-800/10 p-1 rounded-2xl backdrop-blur-sm">
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">{t("{serviceKey}Stat1Value")}</div>
              <div className="text-sm text-gray-300">{t("{serviceKey}Stat1Label")}</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">{t("{serviceKey}Stat2Value")}</div>
              <div className="text-sm text-gray-300">{t("{serviceKey}Stat2Label")}</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">{t("{serviceKey}Stat3Value")}</div>
              <div className="text-sm text-gray-300">{t("{serviceKey}Stat3Label")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t("{serviceKey}WhatWeDoTitle")}</h2>
          <p className="text-gray-400 mb-8">{t("{serviceKey}WhatWeDoDesc")}</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">{t("{serviceKey}Feature1Title")}</h3>
              <p className="text-gray-400">{t("{serviceKey}Feature1Desc")}</p>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">{t("{serviceKey}Feature2Title")}</h3>
              <p className="text-gray-400">{t("{serviceKey}Feature2Desc")}</p>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">{t("{serviceKey}Feature3Title")}</h3>
              <p className="text-gray-400">{t("{serviceKey}Feature3Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t("{serviceKey}MethodTitle")}</h2>
          <p className="text-gray-400 mb-6">{t("{serviceKey}MethodDesc")}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-purple-700/20 flex items-center justify-center text-purple-300">🤖</div>
                <div>
                  <div className="font-semibold">{t("{serviceKey}MethodPoint1")}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-pink-700/20 flex items-center justify-center text-pink-300">⚡</div>
                <div>
                  <div className="font-semibold">{t("{serviceKey}MethodPoint2")}</div>
                </div>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-cyan-700/20 flex items-center justify-center text-cyan-300">🔄</div>
                <div>
                  <div className="font-semibold">{t("{serviceKey}MethodPoint3")}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-green-700/20 flex items-center justify-center text-green-300">📊</div>
                <div>
                  <div className="font-semibold">{t("{serviceKey}MethodPoint4")}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Expert Section */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === "en" ? "Meet Our Expert" : "Conoce al Experto"}
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card-bg p-8 rounded-xl border border-gray-800 mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white">
                {/* Iniciales del experto */}
              </div>
              <h3 className="text-xl font-semibold mb-2">{/* Nombre del experto */}</h3>
              <p className="text-gray-400 mb-4">{t("{serviceKey}ExpertDesc")}</p>
              <div className="flex items-center justify-center gap-4">
                <a href="{LinkedIn URL}" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">LinkedIn</a>
                {/* GitHub si aplica */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("{serviceKey}ContactTitle")}</h2>
          <p className="text-xl text-gray-400 mb-12">{t("{serviceKey}ContactDesc")}</p>
          <a href={`mailto:${siteConfig.email}?subject={Service Name} Consulting`} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">{t("{serviceKey}ContactCTA")}</a>
        </div>
      </section>
    </main>
  );
}
```

### PASO 7: CREAR LAYOUT INGLÉS
Crear archivo `dailymp/app/en/servicios/{serviceSlug}/layout.tsx`:

Similar al layout español pero con:
- URLs apuntando a `/en/servicios/{serviceSlug}`
- Meta descriptions en inglés
- Keywords en inglés
- alternates.canonical apuntando a versión EN

### PASO 8: CREAR PÁGINA INGLÉS
Crear archivo `dailymp/app/en/servicios/{serviceSlug}/page.tsx`:

Similar a la página español pero con:
- URLs de navegación con prefijo `/en/`
- Breadcrumb apuntando a `/en/` y `/en/#services`
- Mailto subject en inglés

### PASO 9: VERIFICAR BUILD
Ejecutar:
```bash
cd /Users/dailymirandapardo/landing/dailymp && npm run build
```
Si hay errores, corregirlos antes de continuar.

### PASO 10: COMMIT Y PUSH
Si el build es exitoso:
```bash
cd /Users/dailymirandapardo/landing/dailymp
git add app/servicios/{serviceSlug}/ app/en/servicios/{serviceSlug}/ config/translations.ts
git commit -m "feat(services): add {service-name} service page"
git push origin main
```

### PASO 11: CREAR LA CARD EN LA HOMEPAGE (SECCIÓN DE SERVICIOS)

El agente debe además crear (o editar) una card en la sección de servicios de la homepage para que el nuevo servicio sea visible y tenga un botón "Descubre más" que enlace a la nueva página.

- Localización típica a modificar: `app/components/HomePage.tsx` o el componente responsable de la sección de servicios (buscar `HomePage`, `HomePage.tsx` o `ServicesGrid`).
- Si no existe un componente dedicado, editar `app/page.tsx` donde se renderice la sección de servicios.

El agente debe realizar los siguientes pasos concretos:

1. Añadir las claves de traducción para la card:

```ts
// en config/translations.ts (ES)
{serviceKey}CardTitle: "Título corto para la card",
{serviceKey}CardExcerpt: "Breve descripción (1 línea)",
{serviceKey}CardCta: "Descubre más",

// en config/translations.ts (EN)
{serviceKey}CardTitle: "Short title for card",
{serviceKey}CardExcerpt: "Brief one-line description",
{serviceKey}CardCta: "Discover more",
```

2. Insertar una entrada JSX en la sección de servicios con la misma estructura visual que las cards existentes. Ejemplo de snippet que el agente puede insertar o añadir como helper:

```tsx
<div className="p-4 md:p-6 rounded-xl bg-card-bg border border-gray-800 hover:shadow-lg transition">
  <h4 className="font-semibold mb-2">{t("{serviceKey}CardTitle")}</h4>
  <p className="text-sm text-gray-400 mb-4">{t("{serviceKey}CardExcerpt")}</p>
  <a href={`/${language === 'en' ? 'en/' : ''}servicios/{serviceSlug}`} className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-700 hover:border-purple-500 text-white rounded-lg text-sm">
    {t("{serviceKey}CardCta")}
  </a>
</div>
```

3. Mantener la consistencia de estilos: usar `bg-card-bg`, `border-gray-800`, `rounded-xl`, `card-hover` u otras clases ya presentes en las cards actuales.

4. Si la sección de servicios es generada dinámicamente desde una lista (por ejemplo, un array de objetos), el agente debe añadir el nuevo entry al array de datos usado por la homepage (archivo posible: `app/components/HomeServices.tsx` o `lib/services.ts`). La entrada debe incluir `titleKey`, `excerptKey`, `slug`, `image` y `order`.

5. Verificar en el build que la card aparece y que el enlace `/servicios/{serviceSlug}` y `/en/servicios/{serviceSlug}` funcionan correctamente.

6. Añadir al commit los archivos modificados de la homepage:

```bash
cd /Users/dailymirandapardo/landing/dailymp
git add app/components/ app/page.tsx config/translations.ts
git commit -m "feat(home): add service card for {service-name}"
git push origin main
```

---

Nota: el agente debe evitar reescribir UI compleja; si detecta un patrón dinámico existente (un array o map para las cards), debe preferir añadir una entrada de datos en lugar de modificar JSX repetitivo.

---

## Estructura de archivos a crear

```
dailymp/
├── app/
│   ├── servicios/
│   │   └── {serviceSlug}/
│   │       ├── layout.tsx    ← SEO metadata + Schema.org
│   │       └── page.tsx      ← Contenido página ES
│   └── en/
│       └── servicios/
│           └── {serviceSlug}/
│               ├── layout.tsx    ← SEO metadata EN
│               └── page.tsx      ← Contenido página EN
└── config/
    └── translations.ts       ← Añadir claves ES y EN
```

---

## Checklist SEO

- [ ] Meta title < 60 caracteres (ES y EN)
- [ ] Meta description 120-160 caracteres (ES y EN)
- [ ] Keywords relevantes (5-10 por idioma)
- [ ] OpenGraph configurado correctamente
- [ ] Twitter Card configurado
- [ ] Canonical URL correcta
- [ ] Alternates hreflang ES/EN configurados
- [ ] Schema.org Service type
- [ ] Schema.org BreadcrumbList
- [ ] Schema.org Person para el experto

---

## Elementos de diseño obligatorios

Siguiendo el estilo de bug-shield y ai-driven-development:

1. **Hero Section**
   - Gradiente de fondo sutil
   - Título H1 con `text-balance`
   - Subtítulo en `text-gray-400`
   - 2 botones CTA (primario y secundario)
   - Strip de 3 estadísticas flotante

2. **Secciones de contenido**
   - Separadas con `border-t border-gray-800`
   - Máximo `max-w-5xl mx-auto`
   - Padding `py-20 px-6`

3. **Cards de características**
   - Grid de 3 columnas en desktop
   - Clase `card-hover` para animación
   - Background `bg-card-bg`
   - Border `border-gray-800`

4. **Sección del experto**
   - Avatar circular con gradiente
   - Iniciales en el avatar
   - Links a LinkedIn y GitHub

5. **CTA final**
   - Título grande
   - Descripción en gris
   - Botón mailto

---

## Clases CSS del proyecto

```css
.gradient-text     /* Texto con gradiente púrpura-rosa */
.card-hover        /* Efecto hover en cards */
.bg-card-bg        /* Fondo de cards (dark) */
.text-balance      /* Balance de texto para títulos */
```

---

## URLs del proyecto

### Servicios existentes (referencia)
- `/servicios/ai-driven-development` - Omar Díaz
- `/servicios/bug-shield` - Liudmila Reyes
- `/servicios/integracion-ia` - Integración IA

### Estructura de URLs nuevas
- ES: `/servicios/{serviceSlug}`
- EN: `/en/servicios/{serviceSlug}`

---

## Configuración del sitio
- URL base: `https://dailymp.es`
- Email contacto: desde `siteConfig.email`
- Imagen OG por defecto: desde `siteConfig.seo.image`

---

## Respuesta esperada al usuario

Después de completar todos los pasos, informar:

"✅ Página de servicio creada exitosamente:

| Idioma | URL |
|--------|-----|
| **ES** | `/servicios/{serviceSlug}` |
| **EN** | `/en/servicios/{serviceSlug}` |

**Archivos creados:**
- `app/servicios/{serviceSlug}/layout.tsx`
- `app/servicios/{serviceSlug}/page.tsx`
- `app/en/servicios/{serviceSlug}/layout.tsx`
- `app/en/servicios/{serviceSlug}/page.tsx`

**Traducciones añadidas:** X claves en ES, X claves en EN

**Commit:** `feat(services): add {service-name} service page`

**Estado:** Desplegado automáticamente ✓

La página estará disponible en:
- 🇪🇸 https://dailymp.es/servicios/{serviceSlug}
- 🇬🇧 https://dailymp.es/en/servicios/{serviceSlug}"
