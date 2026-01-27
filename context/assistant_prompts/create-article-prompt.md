Plantilla de prompt: Generar artículo bilingüe (ES / EN) con SEO completo

Instrucciones de uso:
- Sustituir los campos entre `{{ }}`.
- Solicitar siempre salida en 1) archivos MDX completos (ES y EN) con frontmatter,
  y 2) bloques separados para Metadata (Next.js), JSON-LD y checklist SEO.
- Pedir también la ruta/slug sugerida y un título alternativo para OG.

--- PROMPT ---
SYSTEM: Eres un asistente experto en redacción técnica, SEO y localización ES/EN.

USER: Crea un artículo completo siguiendo estas especificaciones:

- Título (ES): {{title_es}}
- Título (EN): {{title_en}} (si no existe, traduce y localiza)
- Fecha: {{date}} (ISO, p. ej. 2026-01-27)
- Slug base (sin idioma ni `/blog/`): {{slug_base}}
- Resumen (ES): {{summary_es}} (máx 160 chars)
- Público objetivo: {{audience}}
- Palabras clave/keywords: {{keywords_comma_separated}}
- Call to Action: {{cta}}
- Longitud objetivo: {{length}} (p. ej. 800-1200 palabras)
- Tonalidad: {{tone}} (p. ej. profesional, conversacional)
- Imágenes sugeridas (lista de urls o descriptores): {{images}}

Requisitos de entrega (obligatorios):
1) Archivo MDX (ES) completo listo para `content/blog/{{slug_base}}.mdx` con
   frontmatter que incluya: `title`, `description`, `date`, `author`, `category`, `image` (opcional), `keywords` (array), `lang: "es"`.
2) Archivo MDX (EN) completo listo para `content/blog/{{slug_base}}-en.mdx` con
   frontmatter análogo y `lang: "en"`.
3) Sugerencia de `Metadata` compatible con Next.js Metadata API (title, description, openGraph, twitter).
4) JSON-LD `Article` y `BreadcrumbList` listos para inyectar en `head`.
5) `canonical` y `hreflang` tags para ambas variantes.
6) Lista corta de 5 posibles `internal links` (URLs internas relevantes).
7) Checklist SEO (meta description length, headings, images alt, structured data present, canonical correct, og tags present).

Formato de respuesta requerido:
- Devuélvelo en bloques claramente etiquetados (MDX-ES, MDX-EN, METADATA, JSON-LD, HREFLANGS, INTERNAL_LINKS, SEO_CHECKLIST).
- No incluyas explicaciones largas; solo los elementos solicitados.

PLAN MODE (recomendado):
Pide al asistente que siga este plan antes de generar archivos:
1. Validar inputs y proponer mejoras de `slug` y `keywords` si es necesario.
2. Generar frontmatter ES y EN.
3. Generar contenido ES (secciones con H2/H3, listas, código o ejemplos si aplica).
4. Generar contenido EN (traducción y adaptación cultural).
5. Generar Metadata, JSON-LD, hreflang, canonical, y checklist.
6. Salida final con rutas de archivo y contenido completo.

--- FIN PROMPT ---

Ejemplo rápido de petición al asistente: "Modo PLAN: genera paso 1, luego dime si confirmo; si confirmo, ejecuta pasos 2–6".
