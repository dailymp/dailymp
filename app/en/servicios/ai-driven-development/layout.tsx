import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "AI Driven Development | Backend & CI/CD Solutions",
  description: "AI-powered backend development with intelligent CI/CD pipelines for automated code optimization and scalable services. Transform your development workflow with machine learning.",
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
    description: "Transform your backend development with AI-powered solutions and intelligent CI/CD pipelines.",
    url: `${siteConfig.url}/en/servicios/ai-driven-development`,
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
    description: "AI-powered backend development with intelligent CI/CD.",
    images: [`${siteConfig.url}/og-image-ai-driven.jpg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/en/servicios/ai-driven-development`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}