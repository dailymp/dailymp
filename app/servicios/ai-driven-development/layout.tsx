import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "AI Driven Development | Backend & CI/CD Solutions",
  description: "Desarrollo backend impulsado por IA para backend robusto, servicios escalables y pipelines de CI/CD eficientes. Optimización automática de código y despliegues inteligentes.",
  description: "Desarrollo backend impulsado por inteligencia artificial: sistemas que se construyen en semanas, pipelines que aprenden de tus deploys, tests predictivos y optimización continua.",
  keywords: [
    "desarrollo impulsado por IA",
    "backend",
    "CI/CD",
    "tests automatizados",
    "optimización de código",
    "Odoo",
    "DevOps automation",
    "integración IA",
  ],
  openGraph: {
    title: "AI Driven Development | Backend & CI/CD Solutions",
    description: "Transforma tu desarrollo backend con IA: entrega más rápida, tests predictivos y pipelines adaptativos.",
    url: `${siteConfig.url}/servicios/ai-driven-development`,
    type: "article",
    images: [{
      url: `${siteConfig.url}/og-image-ai-driven.jpg`,
      width: 1200,
      height: 630,
      alt: "AI Driven Development - Backend & CI/CD",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Driven Development | Backend & CI/CD Solutions",
    description: "Desarrollo backend impulsado por IA con CI/CD inteligente.",
    images: [`${siteConfig.url}/og-image-ai-driven.jpg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/servicios/ai-driven-development`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}