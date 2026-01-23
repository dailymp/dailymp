import { siteConfig } from "@/config/site";

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = siteConfig.url;
  
  // Use only valid canonical URLs (avoid fragments like #about in sitemaps)
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
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map((page) => {
         return `
       <url>
           <loc>${page.url}</loc>
           <lastmod>${page.lastModified.toISOString()}</lastmod>
           <changefreq>${page.changeFrequency}</changefreq>
           <priority>${page.priority}</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
