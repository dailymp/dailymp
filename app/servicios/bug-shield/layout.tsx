import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Bug Shield Consulting | Coberturas e2e",
  description: "Diseño e implementación de coberturas e2e con Cypress y Playwright. Integración CI/CD y mantenimiento para pruebas confiables.",
  keywords: [
    "cypress",
    "playwright",
    "e2e testing",
    "test automation",
    "ci/cd testing",
    "test maintenance",
  ],
  openGraph: {
    title: "Bug Shield Consulting | Coberturas e2e",
    description: "Diseño de coberturas e2e con Cypress y Playwright. Integración con CI/CD y mantenimiento de suites de prueba.",
    url: `${siteConfig.url}/servicios/bug-shield`,
    type: "article",
    images: [{
      url: siteConfig.seo.image,
      width: 1200,
      height: 630,
      alt: "Bug Shield Consulting - e2e testing",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bug Shield Consulting",
    description: "Coberturas e2e confiables con Cypress y Playwright",
    images: [siteConfig.seo.image],
  },
  alternates: {
    canonical: `${siteConfig.url}/servicios/bug-shield`,
    languages: {
      "es": `${siteConfig.url}/servicios/bug-shield`,
      "en": `${siteConfig.url}/en/servicios/bug-shield`,
    },
  },
};

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bug Shield Consulting",
    description: "Diseño de coberturas e2e con Cypress y Playwright. Integración con CI/CD y mantenimiento de suites de prueba.",
    url: `${siteConfig.url}/servicios/bug-shield`,
    serviceType: "E2E Test Coverage & Automation",
    provider: {
      "@type": "Person",
      name: siteConfig.seo.author,
      url: siteConfig.url,
      email: siteConfig.email,
    },
    areaServed: "Worldwide",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/#services` },
      { "@type": "ListItem", position: 3, name: "Bug Shield Consulting", item: `${siteConfig.url}/servicios/bug-shield` },
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
