import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Formación en Desarrollo IA | DailyMP",
  description: "Programas prácticos de formación en desarrollo con foco en IA aplicada al frontend. Cursos, workshops y mentoría para equipos y profesionales.",
  keywords: [
    "formación IA",
    "formación desarrollo IA",
    "workshops IA frontend",
    "mentoría IA",
    "capacitación IA",
  ],
  openGraph: {
    title: "Formación en Desarrollo IA | DailyMP",
    description: "Programas prácticos de formación en desarrollo con foco en IA aplicada al frontend.",
    url: `${siteConfig.url}/servicios/formacion-desarrollo-ia`,
    type: "article",
    images: [{
      url: siteConfig.seo.image,
      width: 1200,
      height: 630,
      alt: "Formación en Desarrollo IA",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formación en Desarrollo IA",
    description: "Programas prácticos de formación en desarrollo con foco en IA aplicada al frontend.",
    images: [siteConfig.seo.image],
  },
  alternates: {
    canonical: `${siteConfig.url}/servicios/formacion-desarrollo-ia`,
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
    name: "Formación en Desarrollo IA",
    description: "Programas prácticos de formación en desarrollo con foco en IA aplicada al frontend.",
    url: `${siteConfig.url}/servicios/formacion-desarrollo-ia`,
    serviceType: "Formación / Training",
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
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/#services` },
      { "@type": "ListItem", position: 3, name: "Formación en Desarrollo IA", item: `${siteConfig.url}/servicios/formacion-desarrollo-ia` },
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
