import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Integración IA en Frontend | Consultora Daily MP",
  description: "Especialista en integración IA. Chat inteligente, RAG, LLM streaming. De formularios estáticos a experiencias conversacionales con IA nativa.",
  keywords: [
    "integración IA frontend",
    "consultoría IA",
    "LLM React",
    "Next.js inteligencia artificial",
    "RAG aplicaciones web",
    "streaming LLM frontend",
    "UX inteligente",
    "chat IA React",
    "generative UI",
  ],
  openGraph: {
    title: "Integración IA en Frontend | Daily Miranda Pardo",
    description: "Transforma tu app web en una experiencia inteligente con IA. Servicios de consultoría e implementación de LLMs, RAG y más.",
    url: `${siteConfig.url}/servicios/integracion-ia`,
    type: "article",
    images: [{
      url: siteConfig.seo.image,
      width: 1200,
      height: 630,
      alt: "Integración IA en Frontend",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integración IA en Frontend",
    description: "Consultoría especializada en integrar inteligencia artificial en aplicaciones React/Next.js",
    images: [siteConfig.seo.image],
  },
  alternates: {
    canonical: `${siteConfig.url}/servicios/integracion-ia`,
    languages: {
      "es": `${siteConfig.url}/servicios/integracion-ia`,
      "en": `${siteConfig.url}/en/servicios/integracion-ia`,
    },
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
