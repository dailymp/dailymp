import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LanguageProvider } from "@/app/context/LanguageContext";

export const metadata: Metadata = {
  title: `${siteConfig.seo.title} — English`,
  description: siteConfig.seo.description,
  alternates: {
    canonical: `${siteConfig.url}/en/`,
    languages: {
      en: `${siteConfig.url}/en/`,
      es: `${siteConfig.url}/`,
    },
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider initial="en">{children}</LanguageProvider>;
}
