"use client";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/app/context/LanguageContext";

function StructuredDataBugShieldEn() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bug Shield Consulting",
    description: "Design of e2e coverage using Cypress and Playwright. CI/CD integration and maintenance of test suites.",
    url: `${siteConfig.url}/en/servicios/bug-shield`,
    serviceType: "E2E Test Coverage & Automation",
    provider: {
      "@type": "Person",
      name: siteConfig.seo.author,
      url: siteConfig.url,
      email: siteConfig.email,
    },
    areaServed: "Worldwide",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/#services` },
      { "@type": "ListItem", position: 3, name: "Bug Shield Consulting", item: `${siteConfig.url}/en/servicios/bug-shield` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}

export default function BugShieldPageEn() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <StructuredDataBugShieldEn />

      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400">
        <a href="/en/" className="hover:text-purple-400 transition-colors">Home</a>
        <span>/</span>
        <a href="/en/#services" className="hover:text-purple-400 transition-colors">{t("services")}</a>
        <span>/</span>
        <span className="text-purple-400">{t("bugShieldTitle")}</span>
      </nav>

      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/6 via-purple-800/6 to-pink-900/6" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("bugShieldTitle")}</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto text-balance">{t("bugShieldDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/en/#services" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">{t("viewServices")}</a>
            <a href="#contact" className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105">{t("getInTouch")}</a>
          </div>
        </div>
      </section>

      {/* Reuse content text keys (they will render in English via translations.ts) */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t("bugShieldWhatWeDoTitle")}</h2>
          <p className="text-gray-400 mb-8">{t("bugShieldWhatWeDoDesc")}</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">{t("bugShieldDesignTitle")}</h3>
              <p className="text-gray-400">{t("bugShieldDesignDesc")}</p>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">{t("bugShieldCiCdTitle")}</h3>
              <p className="text-gray-400">{t("bugShieldCiCdDesc")}</p>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">{t("bugShieldMaintenanceTitle")}</h3>
              <p className="text-gray-400">{t("bugShieldMaintenanceDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">{t("bugShieldExpertTitle")}</h2>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-card-bg border border-gray-800 flex items-center justify-center text-2xl text-purple-400">LR</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Liudmila Reyes Álvarez</h3>
              <p className="text-gray-400 mb-3">{t("bugShieldExpertDesc")}</p>
              <a href="https://www.linkedin.com/in/liudmila-reyes-alvarez-b802449a/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-pink-400 underline">{t("bugShieldLinkedInText")}</a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("bugShieldContactTitle")}</h2>
          <p className="text-xl text-gray-400 mb-12">{t("bugShieldContactDesc")}</p>
          <a href={`mailto:${siteConfig.email}?subject=Bug%20Shield%20Consulting`} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">{t("bugShieldContactCTA")}</a>
        </div>
      </section>
    </main>
  );
}
