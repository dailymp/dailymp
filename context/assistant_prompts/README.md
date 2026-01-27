Plantillas de prompts para generar contenido SEO + bilingüe

Carpeta destinada a contener prompts y recursos que el asistente usará para
crear artículos/páginas/servicios listos para producción.

Contenido:
- `create-article-prompt.md`: plantilla de prompt para generar un artículo
  en ES/EN con frontmatter, metadata, JSON-LD y checklist SEO.
- `frontmatter-template.md`: ejemplos de frontmatter MDX (ES/EN).
- `jsonld-templates.md`: snippets JSON-LD reutilizables (Article, BreadcrumbList, Service).

Cómo usar:
1. Copia el contenido de `create-article-prompt.md` en tu interacción con el
   asistente cuando quieras crear un nuevo artículo.
2. Rellena los campos entre `{{ }}` (título, fecha, keywords, audiencia, CTA, etc.).
3. Pide explícitamente "devuélveme los archivos MDX y los JSON necesarios".

Recomendación: usar el "PLAN mode" (ver `create-article-prompt.md`) para
que el asistente genere paso a paso: frontmatter → ES MDX → EN MDX → metadata → JSON-LD → archivos.
