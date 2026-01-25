import { siteConfig } from "@/config/site";

interface Post {
  title: string;
  description?: string;
  date: string;
  updated?: string;
  author: string;
  image?: string;
  category?: string;
}

export default function StructuredDataForPost({ post, slug }: { post: Post; slug: string }) {
  const canonical = `${siteConfig.url}/blog/${slug.replace(/\/$/, "")}/`;
  const image = post.image || siteConfig.seo.image;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description || siteConfig.seo.description,
    image: [image],
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: siteConfig.seo.image },
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog/` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
