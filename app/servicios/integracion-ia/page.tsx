"use client";

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/app/context/LanguageContext";

// Note: Server-side metadata export would go in a separate layout.ts
// For now, we'll add metadata via head component if needed

function StructuredDataIntegracionIA() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Integration in Frontend",
    description: "Specialist in integrating artificial intelligence in modern web applications. Includes LLM streaming, RAG, Function Calling, Generative UI and latency optimization.",
    url: `${siteConfig.url}/servicios/integracion-ia`,
    serviceType: "AI Integration Consulting",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.seo.author,
      url: siteConfig.url,
      email: siteConfig.email,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    priceRange: "€€",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteConfig.url}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "AI Integration",
        item: `${siteConfig.url}/servicios/integracion-ia`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default function IntegracionIAPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <StructuredDataIntegracionIA />

      {/* Breadcrumb */}
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400">
        <a href="/" className="hover:text-purple-400 transition-colors">
          {t("aiIntegrationReady") === "Ready to" ? "Home" : "Inicio"}
        </a>
        <span>/</span>
        <a href="/#services" className="hover:text-purple-400 transition-colors">
          {t("services")}
        </a>
        <span>/</span>
        <span className="text-purple-400">
          {t("aiIntegrationTitle")} {t("aiIntegrationTitleHighlight")}
        </span>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-purple-800/10 to-pink-900/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            {t("aiIntegrationTitle")}{" "}
            <span className="gradient-text">{t("aiIntegrationTitleHighlight")}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto text-balance">
            {t("aiIntegrationSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#services"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105"
            >
              {t("viewServices")}
            </a>
            <a
              href="#contacto"
              className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105"
            >
              {t("getInTouch")}
            </a>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            {t("aiIntegrationWhyTitle")}{" "}
            <span className="gradient-text">{t("aiIntegrationWhyTitleHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            {t("aiIntegrationWhySubtitle")}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{t("aiIntegrationBetterUX")}</h3>
              <p className="text-gray-400">
                {t("aiIntegrationBetterUXDesc")}
              </p>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-pink-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{t("aiIntegrationDifferentiation")}</h3>
              <p className="text-gray-400">
                {t("aiIntegrationDifferentiationDesc")}
              </p>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-violet-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{t("aiIntegrationPerformance")}</h3>
              <p className="text-gray-400">
                {t("aiIntegrationPerformanceDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            {t("aiIntegrationProcess")} <span className="gradient-text">{t("aiIntegrationProcessHighlight")}</span>
          </h2>
          <div className="space-y-6">
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-purple-400">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{t("aiIntegrationDiscovery")}</h3>
                  <p className="text-gray-400">
                    {t("aiIntegrationDiscoveryDesc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-pink-400">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{t("aiIntegrationPrototype")}</h3>
                  <p className="text-gray-400">
                    {t("aiIntegrationPrototypeDesc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-violet-400">3</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{t("aiIntegrationScaling")}</h3>
                  <p className="text-gray-400">
                    {t("aiIntegrationScalingDesc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-cyan-400">4</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{t("aiIntegrationTraining")}</h3>
                  <p className="text-gray-400">
                    {t("aiIntegrationTrainingDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contacto" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("aiIntegrationReady")} <span className="gradient-text">{t("aiIntegrationReadyHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            {t("aiIntegrationReadyDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${siteConfig.email}?subject=AI Integration Consultancy`}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105"
            >
              {t("aiIntegrationRequestConsultancy")}
            </a>
            <a
              href="/#services"
              className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105"
            >
              {t("aiIntegrationViewOtherServices")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
