import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "AI Driven Development | Backend & CI/CD Solutions",
  description: "Desarrollo backend impulsado por IA para backend robusto, servicios escalables y pipelines de CI/CD eficientes. Optimización automática de código y despliegues inteligentes.",
  keywords: [
    "AI driven development",
    "backend development",
    "CI/CD pipelines",
    "intelligent deployments",
    "code optimization",
    "scalable services",
    "DevOps automation",
    "machine learning development",
  ],
  openGraph: {
    title: "AI Driven Development | Backend & CI/CD Solutions",
    description: "Transforma tu desarrollo backend con IA. Servicios escalables, CI/CD inteligentes y optimización automática de código.",
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