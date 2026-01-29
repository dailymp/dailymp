import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "AI Engineering Training | DailyMP",
  description: "Hands-on training programs in development focused on applied AI for frontend and digital products. Courses, workshops and mentorship for teams and professionals.",
  keywords: [
    "AI training",
    "AI engineering training",
    "frontend AI workshops",
    "AI mentorship",
    "AI education",
  ],
  openGraph: {
    title: "AI Engineering Training | DailyMP",
    description: "Hands-on training programs in development focused on applied AI for frontend and digital products.",
    url: `${siteConfig.url}/en/servicios/formacion-desarrollo-ia`,
    type: "article",
    images: [{
      url: siteConfig.seo.image,
      width: 1200,
      height: 630,
      alt: "AI Engineering Training",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineering Training",
    description: "Hands-on training programs in development focused on applied AI for frontend and digital products.",
    images: [siteConfig.seo.image],
  },
  alternates: {
    canonical: `${siteConfig.url}/en/servicios/formacion-desarrollo-ia`,
    languages: {
      "es": `${siteConfig.url}/servicios/formacion-desarrollo-ia`,
      "en": `${siteConfig.url}/en/servicios/formacion-desarrollo-ia`,
    },
  },
};

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Engineering Training",
    description: "Hands-on training programs in development focused on applied AI for frontend and digital products.",
    url: `${siteConfig.url}/en/servicios/formacion-desarrollo-ia`,
    serviceType: "Training / Education",
    provider: {
      "@type": "Person",
      name: "Ester Laura Muñoz",
      url: "https://www.linkedin.com/in/esterla/",
      sameAs: ["https://www.linkedin.com/in/esterla/"],
    },
    areaServed: "Worldwide",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/en/#services` },
      { "@type": "ListItem", position: 3, name: "AI Engineering Training", item: `${siteConfig.url}/en/servicios/formacion-desarrollo-ia` },
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
