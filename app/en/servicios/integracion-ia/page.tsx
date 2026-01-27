import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `AI Integration — ${siteConfig.seo.title}`,
  description: "AI integration for frontend apps: LLM streaming, RAG, function calling, generative UI and latency optimization.",
  alternates: {
    canonical: `${siteConfig.url}/en/servicios/integracion-ia`,
    languages: {
      en: `${siteConfig.url}/en/servicios/integracion-ia`,
      es: `${siteConfig.url}/servicios/integracion-ia`,
    },
  },
  openGraph: {
    title: `AI Integration — ${siteConfig.seo.title}`,
    description: "AI integration for frontend apps: LLM streaming, RAG, function calling and latency optimization.",
    url: `${siteConfig.url}/en/servicios/integracion-ia`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.seo.image, width: 1200, height: 630, alt: siteConfig.seo.title }],
    type: "article",
  },
  keywords: ["AI integration","LLM","RAG","frontend AI","function-calling","generative UI","latency optimization"],
};

function StructuredData() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Integration for Frontend",
    description: "Specialist in integrating AI into frontend applications: LLM streaming, Retrieval-Augmented Generation, Function Calling and visual/latency optimizations.",
    url: `${siteConfig.url}/en/servicios/integracion-ia`,
    serviceType: "AI Integration Consulting",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.seo.author,
      url: siteConfig.url,
      email: siteConfig.email,
    },
    areaServed: { "@type": "Place", name: "Worldwide" },
    priceRange: "€€",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/#services` },
      { "@type": "ListItem", position: 3, name: "AI Integration", item: `${siteConfig.url}/en/servicios/integracion-ia` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}

export default function IntegracionIaEnPage() {
  return (
    <main className="min-h-screen">
      <StructuredData />

      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400">
        <a href="/en/" className="hover:text-purple-400 transition-colors">Home</a>
        <span>/</span>
        <a href="/en/#services" className="hover:text-purple-400 transition-colors">Services</a>
        <span>/</span>
        <span className="text-purple-400">AI Integration</span>
      </nav>

      <section className="relative min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-purple-800/10 to-pink-900/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">AI Integration <span className="gradient-text">for Frontend</span></h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto text-balance">
            We integrate AI into modern web applications: streaming LLMs, RAG, function calling, generative UI and latency-aware design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/en/#services" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">View Services</a>
            <a href="#contact" className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105">Get In Touch</a>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Why integrate AI? <span className="gradient-text">Benefits</span></h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">Deliver differentiated UX, reduce manual work, and unlock personalization at scale while controlling latency and costs.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-3">Better UX</h3>
              <p className="text-gray-400">Integrate conversational interfaces, contextual suggestions and multimodal experiences that improve engagement.</p>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-3">Competitive Differentiation</h3>
              <p className="text-gray-400">Use generative features and smart automation to stand out and increase retention.</p>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-3">Performance & Reliability</h3>
              <p className="text-gray-400">Design for latency, cost and graceful degradation to ensure reliable user experiences.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Process <span className="gradient-text">(How we work)</span></h2>
          <div className="space-y-6">
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-2">1 — Discovery</h3>
              <p className="text-gray-400">We map your product, data sources and key user journeys to identify high-impact AI opportunities.</p>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-2">2 — Prototype</h3>
              <p className="text-gray-400">Rapid prototypes validate UX and performance trade-offs with real data and small-scale models.</p>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-2">3 — Scale</h3>
              <p className="text-gray-400">We harden pipelines, integrate in CI/CD and monitor costs and latency in production.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to integrate AI? <span className="gradient-text">Let's talk</span></h2>
          <p className="text-xl text-gray-400 mb-12">Book a discovery call or send a short brief and we'll propose a lightweight pilot to demonstrate value.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`mailto:${siteConfig.email}?subject=AI+Integration+Consultancy`} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">Request Consultancy</a>
            <a href="/en/#services" className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105">View other services</a>
          </div>
        </div>
      </section>
    </main>
  );
}

