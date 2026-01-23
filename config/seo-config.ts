import { siteConfig } from "@/config/site";

/**
 * SEO Configuration Summary
 * 
 * Este archivo documenta toda la configuración SEO actual del sitio
 */

export const seoConfig = {
  // ✅ Metadata
  metadata: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    keywords: siteConfig.seo.keywords,
    author: siteConfig.seo.author,
    canonicalUrl: siteConfig.url,
  },

  // ✅ Open Graph
  openGraph: {
    enabled: true,
    image: siteConfig.seo.image,
    imageWidth: 1200,
    imageHeight: 630,
    siteName: siteConfig.name,
  },

  // ✅ Twitter Card
  twitter: {
    enabled: true,
    card: "summary_large_image",
  },

  // ✅ Robots & Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // ✅ Sitemap
  sitemap: {
    enabled: true,
    url: `${siteConfig.url}/sitemap.xml`,
  },

  // ✅ Robots.txt
  robotsTxt: {
    enabled: true,
    url: `${siteConfig.url}/robots.txt`,
  },

  // ✅ Structured Data
  structuredData: {
    enabled: true,
    type: "Person",
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.seo.author,
      url: siteConfig.url,
      sameAs: [
        siteConfig.social.linkedin,
        siteConfig.social.github,
      ],
    },
  },

  // ✅ Performance
  performance: {
    compression: true,
    minification: true,
    imageOptimization: true,
  },

  // TODO: Google Analytics
  analytics: {
    enabled: false,
    gaId: "G-XXXXXXXXXX", // Replace with your GA ID
    note: "Agregado en layout.tsx después de obtener tu GA ID",
  },

  // TODO: Google Search Console
  googleSearchConsole: {
    enabled: false,
    verificationCode: "", // Replace with your verification code
    note: "Agrégalo en layout.tsx metadata.verification.google",
  },

  // ✅ Mobile & Accessibility
  mobile: {
    viewportConfigured: true,
    responsive: true,
    touchFriendly: true,
  },

  // ✅ Core Web Vitals
  coreWebVitals: {
    lcp: "< 2.5s", // Largest Contentful Paint
    fid: "< 100ms", // First Input Delay
    cls: "< 0.1", // Cumulative Layout Shift
    note: "Monitorea en: https://pagespeed.web.dev/",
  },
};

export const seoChecklist = {
  completed: [
    "✅ Meta tags (title, description, keywords)",
    "✅ Open Graph tags",
    "✅ Twitter Card tags",
    "✅ Canonical URLs",
    "✅ Robots.txt",
    "✅ Sitemap XML",
    "✅ Schema.org JSON-LD (Person)",
    "✅ Mobile responsive design",
    "✅ Heading hierarchy (H1, H2, H3)",
    "✅ Alt attributes en SVGs",
    "✅ Internal linking",
    "✅ Site speed optimization",
    "✅ Semantic HTML",
  ],
  pending: [
    "⏳ Actualizar site.ts con tu dominio",
    "⏳ Crear og-image.jpg (1200x630px)",
    "⏳ Google Search Console verification",
    "⏳ Google Analytics integration",
    "⏳ Link building strategy",
    "⏳ Content marketing (blog optional)",
  ],
  future: [
    "🚀 Hreflang tags (para multilenguaje SEO)",
    "🚀 Breadcrumb schema",
    "🚀 FAQPage schema",
    "🚀 Service schema per service",
    "🚀 Local Business schema (si aplica)",
  ],
};
