import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/blog";

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = siteConfig.url;

  // Static pages
  const pages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios/integracion-ia`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/servicios/integracion-ia`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios/bug-shield`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/servicios/bug-shield`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/ai-driven-development`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/servicios/ai-driven-development`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Blog posts (includes language variants like '-en')
  const posts = getAllBlogPosts().map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const allPages = [...pages, ...posts];

  // Build a map of available language variants for posts
  const slugs = getAllBlogPosts().map((p) => p.slug);

  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // helper to build hreflang links for a base slug
  const buildHreflangLinks = (baseSlug: string) => {
    const esUrl = `${baseUrl}/blog/${baseSlug}`;
    const enUrl = `${baseUrl}/blog/${baseSlug}-en`;
    const hasEn = slugs.includes(`${baseSlug}-en`);

    const links = [] as string[];
    links.push(`<xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />`);
    if (hasEn) {
      links.push(`<xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />`);
      links.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}" />`);
    }
    return links.join("\n    ");
  };

  const sitemapBody = allPages
    .map((page) => {
      // If this page is a blog post, try to render hreflang links
      if (page.url.includes(`${baseUrl}/blog/`)) {
        const slug = page.url.replace(`${baseUrl}/blog/`, "").replace(/\/$/, "");
        const baseSlug = slug.replace(/-en$/, "");
        const hreflangLinks = buildHreflangLinks(baseSlug);

        return `  <url>\n    <loc>${page.url}</loc>\n    ${hreflangLinks}\n    <lastmod>${page.lastModified.toISOString()}</lastmod>\n    <changefreq>${page.changeFrequency}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`;
      }

      // If this page is a service page, add hreflang alternates for ES/EN
      if (page.url.includes(`${baseUrl}/servicios/`) || page.url.includes(`${baseUrl}/en/servicios/`)) {
        const isEn = page.url.includes(`${baseUrl}/en/servicios/`);
        const esUrl = isEn ? page.url.replace(`${baseUrl}/en`, baseUrl) : page.url;
        const enUrl = isEn ? page.url : page.url.replace(`${baseUrl}`, `${baseUrl}/en`);

        const hreflang = `    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />\n` +
          `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />\n` +
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}" />`;

        return `  <url>\n    <loc>${page.url}</loc>\n    ${hreflang}\n    <lastmod>${page.lastModified.toISOString()}</lastmod>\n    <changefreq>${page.changeFrequency}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`;
      }

      return `  <url>\n    <loc>${page.url}</loc>\n    <lastmod>${page.lastModified.toISOString()}</lastmod>\n    <changefreq>${page.changeFrequency}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`;
    })
    .join("\n");

  // Add /en/ homepage entry with alternates
  const homeEs = baseUrl;
  const homeEn = `${baseUrl}/en/`;
  const homeEntry = `  <url>\n    <loc>${homeEs}</loc>\n    <xhtml:link rel="alternate" hreflang="es" href="${homeEs}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${homeEn}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${homeEs}" />\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1</priority>\n  </url>\n` +
    `  <url>\n    <loc>${homeEn}</loc>\n    <xhtml:link rel="alternate" hreflang="es" href="${homeEs}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${homeEn}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${homeEs}" />\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1</priority>\n  </url>\n`;

  const sitemap = sitemapHeader + homeEntry + sitemapBody + `\n</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
