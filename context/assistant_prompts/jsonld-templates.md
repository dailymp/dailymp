Snippets JSON-LD reutilizables

Article (adaptar `headline`, `datePublished`, `author`, `image`, `description`, `url`):

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{url}}"
  },
  "headline": "{{headline}}",
  "description": "{{description}}",
  "image": ["{{image}}"],
  "author": [{ "@type": "Person", "name": "DailyMP" }],
  "publisher": { "@type": "Organization", "name": "DailyMP", "logo": { "@type": "ImageObject", "url": "{{logo}}" } },
  "datePublished": "{{datePublished}}",
  "dateModified": "{{dateModified}}"
}
```

BreadcrumbList:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailymp.es/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://dailymp.es/blog/" },
    { "@type": "ListItem", "position": 3, "name": "{{title}}", "item": "{{url}}" }
  ]
}
```

Service (ejemplo para páginas de servicios):

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "{{serviceType}}",
  "provider": { "@type": "Organization", "name": "DailyMP", "url": "https://dailymp.es" },
  "description": "{{description}}",
  "areaServed": "ES",
  "url": "{{url}}"
}
```
