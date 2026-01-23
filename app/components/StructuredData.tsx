"use client";

import { siteConfig } from "@/config/site";

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.seo.author,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.seo.description,
    image: siteConfig.seo.image,
    jobTitle: "Frontend Design & Development Consultant",
    knowsAbout: [
      "Frontend Development",
      "React",
      "TypeScript",
      "Next.js",
      "UI/UX Design",
      "Web Design",
      "Technical Consulting",
      "Design Systems"
    ],
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
