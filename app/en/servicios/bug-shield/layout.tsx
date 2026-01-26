import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Bug Shield Consulting | E2E Coverage",
  description: "Design and implementation of e2e coverage with Cypress and Playwright. CI/CD integration and test suite maintenance.",
  keywords: [
    "cypress",
    "playwright",
    "e2e testing",
    "test automation",
    "ci/cd testing",
    "test maintenance",
  ],
  openGraph: {
    title: "Bug Shield Consulting | E2E Coverage",
    description: "E2E coverage design with Cypress and Playwright. CI/CD integration and stable test suites.",
    url: `${siteConfig.url}/en/servicios/bug-shield`,
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
    description: "E2E coverage with Cypress and Playwright",
    images: [siteConfig.seo.image],
  },
  alternates: {
    canonical: `${siteConfig.url}/en/servicios/bug-shield`,
    languages: {
      "en": `${siteConfig.url}/en/servicios/bug-shield`,
      "es": `${siteConfig.url}/servicios/bug-shield`,
    },
  },
};

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
