import { siteConfig } from "@/config/site";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.seo.author,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    description: siteConfig.seo.description,
    image: siteConfig.seo.image,
    jobTitle: "Consultora de Integración IA en Frontend",
    knowsAbout: [
      "Artificial Intelligence",
      "Frontend Development",
      "LLM Integration",
      "React",
      "TypeScript",
      "Next.js",
      "UI/UX Design",
      "AI Consulting",
      "MCPs",
      "RAG",
      "Streaming LLMs",
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

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Daily Miranda Pardo - Consultora Frontend & IA",
    description: siteConfig.seo.description,
    url: siteConfig.url,
    email: siteConfig.email,
    image: siteConfig.seo.image,
    priceRange: "€€",
    areaServed: {
      "@type": "Place",
      name: "Worldwide"
    },
    serviceType: [
      "AI Integration Consulting",
      "Frontend Development",
      "Technical Consulting",
      "UI/UX Design",
      "Design Systems",
      "AI Training & Workshops"
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.seo.author,
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
}
