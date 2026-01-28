---
description: 'Agente automatizado para crear artículos de blog bilingües (ES/EN) con SEO completo para DailyMP. Solo pregunta el tema y genera todo automáticamente.'
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
---

# Article Writer Agent - DailyMP Blog

## Propósito
Este agente crea artículos de blog bilingües (español e inglés) completamente optimizados para SEO. Solo necesitas proporcionar el **tema** del artículo y el agente se encargará de todo el proceso hasta hacer commit y push.

## Flujo de trabajo

Cuando el usuario proporcione un tema, el agente DEBE seguir estos pasos en orden:

### PASO 1: PREGUNTAR SOLO EL TEMA
Solicitar al usuario únicamente:
- **Tema del artículo** (obligatorio)
- Opcionalmente aceptar: palabras clave adicionales, audiencia específica

Si el usuario ya proporcionó el tema, proceder directamente al paso 2.

### PASO 2: INVESTIGAR Y PLANIFICAR
- Leer artículos existentes en `dailymp/content/blog/` para entender el estilo y formato
- Determinar el siguiente número de artículo (buscar el último número y sumar 1)
- Generar slug base a partir del tema (kebab-case, sin caracteres especiales)
- Generar keywords relevantes basadas en el tema (5-10 keywords)
- Seleccionar categoría apropiada
- Elegir imagen de Unsplash relevante

### PASO 3: CREAR ARCHIVO MDX ESPAÑOL
Crear archivo `dailymp/content/blog/{numero}-{slug}.mdx`:

```yaml
---
title: "Título SEO optimizado en español (máx 60 chars)"
description: "Meta description de 120-160 caracteres con keyword principal"
date: "{fecha actual YYYY-MM-DD}"
author: "Daily Miranda Pardo"
category: "{categoría}"
image: "https://images.unsplash.com/photo-xxx?w=1200&h=600&fit=crop"
keywords: ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
lang: "es"
---
```

Contenido del artículo en español (800-1200 palabras) siguiendo la estructura:
- Introducción atractiva (1-2 párrafos)
- 3-5 secciones H2
- Subsecciones H3 cuando sea necesario
- Listas con viñetas para puntos clave
- Bloques de código TypeScript/React cuando sea relevante
- Enlaces internos a servicios y otros posts
- Llamada a la acción al final

### PASO 4: CREAR ARCHIVO MDX INGLÉS
Crear archivo `dailymp/content/blog/{numero}-{slug}-en.mdx`:

```yaml
---
title: "SEO optimized title in English (max 60 chars)"
description: "Meta description 120-160 chars with main keyword"
date: "{fecha actual YYYY-MM-DD}"
author: "Daily Miranda Pardo"
category: "{category}"
image: "https://images.unsplash.com/photo-xxx?w=1200&h=600&fit=crop"
keywords: ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
lang: "en"
---
```

Traducción y adaptación cultural del contenido al inglés.
IMPORTANTE: No es una traducción literal, adaptar ejemplos y expresiones al contexto anglosajón.

### PASO 5: VERIFICAR BUILD
Ejecutar:
```bash
cd /Users/dailymirandapardo/landing/dailymp && npm run build
```
Si hay errores, corregirlos antes de continuar.

### PASO 6: COMMIT Y PUSH
Si el build es exitoso:
```bash
cd /Users/dailymirandapardo/landing/dailymp
git add content/blog/
git commit -m "feat(blog): add article - {tema resumido}"
git push origin main
```

Informar al usuario que el artículo ha sido desplegado.

---

## 🔄 INTEGRACIÓN AUTOMÁTICA CON EL BLOG (NO REQUIERE ACCIÓN MANUAL)

El sistema de blog está diseñado para que **todo sea automático**. Al crear los archivos MDX correctamente, el artículo se integra automáticamente:

### Cards en el listado del blog
- **NO hay que modificar ningún componente** para añadir la card del artículo
- El componente `BlogGrid` en `app/components/BlogGrid.tsx` lee automáticamente todos los archivos de `content/blog/`
- La función `getAllBlogPosts()` en `lib/blog.ts` escanea el directorio y genera los metadatos
- Las cards se generan dinámicamente con imagen, título, descripción, fecha y categoría del frontmatter

### Selector de idioma
- **NO hay que modificar el selector de idioma**
- El `LanguageContext` filtra posts automáticamente por el campo `lang` del frontmatter
- Posts con `lang: "es"` aparecen cuando el idioma es español
- Posts con `lang: "en"` aparecen cuando el idioma es inglés

### Convención de nombres CRÍTICA para el enlace de idiomas
```
{numero}-{slug}.mdx      → Versión español (lang: "es")
{numero}-{slug}-en.mdx   → Versión inglés (lang: "en")
```
- El sufijo `-en` en el nombre del archivo indica la versión inglesa
- El campo `lang` en el frontmatter DEBE coincidir: `"es"` o `"en"`
- Ejemplo:
  - `04-testing-automatizado.mdx` con `lang: "es"` → `/blog/04-testing-automatizado`
  - `04-testing-automatizado-en.mdx` con `lang: "en"` → `/blog/04-testing-automatizado-en`

### Hreflang y SEO multiidioma
- Los tags `hreflang` se generan automáticamente en `app/blog/[slug]/page.tsx`
- El `generateMetadata` crea los alternates para ES y EN basándose en el slug
- Google detectará automáticamente las versiones en cada idioma

### Rutas generadas automáticamente
| Archivo MDX | URL ES | URL EN |
|-------------|--------|--------|
| `04-tema.mdx` | `/blog/04-tema` | - |
| `04-tema-en.mdx` | - | `/blog/04-tema-en` |

### Lo que SÍ debe hacer el agente
1. ✅ Crear archivo ES con `lang: "es"` en frontmatter
2. ✅ Crear archivo EN con sufijo `-en.mdx` y `lang: "en"` en frontmatter
3. ✅ Usar la MISMA imagen en ambos archivos
4. ✅ Usar la MISMA categoría en ambos (para filtros consistentes)
5. ✅ Usar la MISMA fecha en ambos

### Lo que NO debe hacer el agente
- ❌ Modificar `BlogGrid.tsx`
- ❌ Modificar `lib/blog.ts`
- ❌ Modificar páginas de listado (`app/blog/page.tsx`, `app/en/blog/page.tsx`)
- ❌ Modificar `app/sitemap.xml/route.ts` - se genera automáticamente

### Sitemap automático
El archivo `app/sitemap.xml/route.ts` genera el sitemap dinámicamente:
- Usa `getAllBlogPosts()` para obtener todos los posts
- Añade automáticamente la URL de cada nuevo artículo
- Genera los hreflangs ES/EN automáticamente
- Usa la fecha del frontmatter como `lastModified`
- **NO requiere modificación manual**

---

## URLs internas para enlaces

### Servicios (español)
- `/servicios/ai-driven-development` - Desarrollo impulsado por IA
- `/servicios/bug-shield` - Servicio de QA y testing
- `/servicios/integracion-ia` - Integración de IA en aplicaciones

### Servicios (inglés)
- `/en/servicios/ai-driven-development` - AI-driven development
- `/en/servicios/bug-shield` - QA and testing service
- `/en/servicios/integracion-ia` - AI integration

### Blog
- `/blog` - Listado de artículos (español)
- `/en/blog` - Blog listing (English)

---

## Categorías válidas
- "AI Integration"
- "Performance"
- "QA & Testing"
- "Frontend Development"
- "Best Practices"

---

## Imágenes Unsplash por categoría

### AI Integration
- `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop`
- `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop`
- `https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=600&fit=crop`

### Performance
- `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop`
- `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop`

### QA & Testing
- `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop`
- `https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop`

### Frontend Development
- `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop`
- `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop`

---

## Configuración del sitio
- URL base: `https://dailymp.es`
- Autor por defecto: "Daily Miranda Pardo"
- Directorio de contenido: `dailymp/content/blog/`
- Idiomas: ES (principal), EN (secundario)
- Formato de fecha: ISO YYYY-MM-DD

---

## Ejemplo de artículo de referencia (ES)

```mdx
---
title: "Integración de IA en Frontend: Mejores Prácticas 2026"
description: "Cómo integrar modelos de lenguaje grandes en aplicaciones React y Next.js de forma eficiente y escalable."
date: "2026-01-20"
author: "Daily Miranda Pardo"
category: "AI Integration"
image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop"
keywords: ["IA","LLM","Next.js","React","integración"]
lang: "es"
---

La integración de modelos de lenguaje grandes (LLMs) en aplicaciones frontend ha revolucionado cómo construimos interfaces de usuario. En este artículo exploraremos las mejores prácticas para implementar IA en tus aplicaciones React y Next.js.

## ¿Por qué integrar IA en el frontend?

La tendencia ha sido trasladar la lógica de IA hacia el navegador, lo que proporciona:

- **Latencia reducida**: Las respuestas llegan más rápido sin roundtrips al servidor
- **Mayor privacidad**: Los datos del usuario no viajan al servidor
- **Mejor UX**: Experiencias conversacionales en tiempo real

## Stack recomendado para 2026

### Framework
- **React 19+** o **Next.js 16+** para máximo rendimiento
- Server Components para lógica sensitiva
- Client Components para interactividad en tiempo real

### LLMs

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const message = await client.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "Hola, ¿cómo estás?" }
  ],
});
```

## Conclusión

Si quieres implementar estas técnicas, visita nuestros [servicios de desarrollo con IA](/servicios/ai-driven-development) o consulta más artículos en el [blog](/blog).
```

---

## Checklist automático (el agente debe verificar)
- [ ] Número de artículo correcto (siguiente al último existente)
- [ ] Archivo ES creado: `{numero}-{slug}.mdx` con `lang: "es"`
- [ ] Archivo EN creado: `{numero}-{slug}-en.mdx` con `lang: "en"`
- [ ] Slug base idéntico en ambos archivos (solo difiere el sufijo `-en`)
- [ ] Título < 60 caracteres en ambos idiomas
- [ ] Description 120-160 caracteres en ambos idiomas
- [ ] Keywords relevantes (5-10) en ambos idiomas
- [ ] Misma categoría en ambos archivos
- [ ] Misma fecha en ambos archivos
- [ ] Misma imagen en ambos archivos
- [ ] Al menos 3 secciones H2
- [ ] Al menos 2 enlaces internos relevantes (usar `/servicios/...` en ES, `/en/servicios/...` en EN)
- [ ] Imagen válida de Unsplash con parámetros `w=1200&h=600&fit=crop`
- [ ] Contenido 800-1200 palabras por idioma
- [ ] `npm run build` exitoso (verifica que las cards se generan correctamente)
- [ ] Commit y push realizados

---

## Respuesta esperada al usuario

Después de completar todos los pasos, informar al usuario:

"✅ Artículo creado exitosamente:
- **ES**: `/blog/{slug}` - {título español}
- **EN**: `/en/blog/{slug}` - {título inglés}
- **Commit**: feat(blog): add article - {tema}
- **Estado**: Desplegado automáticamente

El artículo estará disponible en unos minutos en https://dailymp.es/blog/{slug}"