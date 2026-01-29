"use client";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/app/context/LanguageContext";

export default function FormacionDesarrolloIaPageEn() {
  const { t, language } = useLanguage();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("formacionDesarrolloIaTitle"),
    description: t("formacionDesarrolloIaDesc"),
    provider: {
      "@type": "Person",
      name: "Ester Laura Muñoz",
      url: "https://www.linkedin.com/in/esterla/",
      sameAs: ["https://www.linkedin.com/in/esterla/"],
    },
    url: `${siteConfig.url}/en/servicios/formacion-desarrollo-ia`,
  };

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400">
        <a href="/en/" className="hover:text-purple-400 transition-colors">Home</a>
        <span>/</span>
        <a href="/en/#services" className="hover:text-purple-400 transition-colors">{t("services")}</a>
        <span>/</span>
        <span className="text-purple-400">{t("formacionDesarrolloIaTitle")}</span>
      </nav>

      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/6 via-purple-800/6 to-pink-900/6" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("formacionDesarrolloIaTitle")}</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto text-balance">{t("formacionDesarrolloIaDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/en/#services" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">{t("discoverMore")}</a>
            <a href="#contact" className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105">{t("formacionDesarrolloIaContactCTA")}</a>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 bg-gradient-to-r from-purple-800/10 via-pink-800/10 to-purple-800/10 p-1 rounded-2xl backdrop-blur-sm">
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">{t("formacionDesarrolloIaStat1Value")}</div>
              <div className="text-sm text-gray-300">{t("formacionDesarrolloIaStat1Label")}</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">{t("formacionDesarrolloIaStat2Value")}</div>
              <div className="text-sm text-gray-300">{t("formacionDesarrolloIaStat2Label")}</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">{t("formacionDesarrolloIaStat3Value")}</div>
              <div className="text-sm text-gray-300">{t("formacionDesarrolloIaStat3Label")}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t("formacionDesarrolloIaWhatWeDoTitle")}</h2>
          <p className="text-gray-400 mb-8">{t("formacionDesarrolloIaWhatWeDoDesc")}</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">{t("formacionDesarrolloIaFeature1Title")}</h3>
              <p className="text-gray-400">{t("formacionDesarrolloIaFeature1Desc")}</p>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">{t("formacionDesarrolloIaFeature2Title")}</h3>
              <p className="text-gray-400">{t("formacionDesarrolloIaFeature2Desc")}</p>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">{t("formacionDesarrolloIaFeature3Title")}</h3>
              <p className="text-gray-400">{t("formacionDesarrolloIaFeature3Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t("formacionDesarrolloIaMethodTitle")}</h2>
          <p className="text-gray-400 mb-6">{t("formacionDesarrolloIaMethodDesc")}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-purple-700/20 flex items-center justify-center text-purple-300">🤖</div>
                <div>
                  <div className="font-semibold">{t("formacionDesarrolloIaMethodPoint1")}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-pink-700/20 flex items-center justify-center text-pink-300">⚡</div>
                <div>
                  <div className="font-semibold">{t("formacionDesarrolloIaMethodPoint2")}</div>
                </div>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-cyan-700/20 flex items-center justify-center text-cyan-300">🔄</div>
                <div>
                  <div className="font-semibold">{t("formacionDesarrolloIaMethodPoint3")}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-green-700/20 flex items-center justify-center text-green-300">📊</div>
                <div>
                  <div className="font-semibold">{t("formacionDesarrolloIaMethodPoint4")}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{language === "en" ? "Meet Our Expert" : "Conoce al Experto"}</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card-bg p-8 rounded-xl border border-gray-800 mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white">EM</div>
              <h3 className="text-xl font-semibold mb-2">Ester Laura Muñoz</h3>
              <p className="text-gray-400 mb-4">{t("formacionDesarrolloIaExpertDesc")}</p>
              <div className="flex items-center justify-center gap-4">
                <a href="https://www.linkedin.com/in/esterla/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("formacionDesarrolloIaContactTitle")}</h2>
          <p className="text-xl text-gray-400 mb-12">{t("formacionDesarrolloIaContactDesc")}</p>
          <a href={`mailto:${siteConfig.email}?subject=AI%20Training%20Consultancy`} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">{t("formacionDesarrolloIaContactCTA")}</a>
        </div>
      </section>
    </main>
  );
}
