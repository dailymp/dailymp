import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllBlogPosts();
  const baseUrl = siteConfig.url;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>es-ES</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteConfig.seo.image}</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${baseUrl}</link>
    </image>
${posts
  .map((post) => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const imageTag = post.image ? `<enclosure url="${escapeXml(baseUrl + post.image)}" type="image/jpeg"/>` : '';
    
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(post.author)}</author>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <category>${escapeXml(post.category)}</category>
      ${imageTag}
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
