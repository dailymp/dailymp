"use client";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/app/context/LanguageContext";

export default function BugShieldPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">

      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400">
        <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
        <span>/</span>
        <a href="/#services" className="hover:text-purple-400 transition-colors">{t("services")}</a>
        <span>/</span>
        <span className="text-purple-400">{t("bugShieldTitle")}</span>
      </nav>

      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/6 via-purple-800/6 to-pink-900/6" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("bugShieldTitle")}</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto text-balance">{t("bugShieldDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#services" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">{t("viewServices")}</a>
            <a href="#contact" className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105">{t("getInTouch")}</a>
          </div>
        </div>

        {/* Visual stats strip */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 bg-gradient-to-r from-purple-800/10 via-pink-800/10 to-purple-800/10 p-1 rounded-2xl backdrop-blur-sm">
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">{t("bugShieldStat1Value")}</div>
              <div className="text-sm text-gray-300">{t("bugShieldStat1Label")}</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">{t("bugShieldStat2Value")}</div>
              <div className="text-sm text-gray-300">{t("bugShieldStat2Label")}</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">{t("bugShieldStat3Value")}</div>
              <div className="text-sm text-gray-300">{t("bugShieldStat3Label")}</div>
            </div>
          </div>
        </div>
      </section>

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

      {/* AI in SQA Section */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t("bugShieldAiTitle")}</h2>
          <p className="text-gray-400 mb-6">{t("bugShieldAiDesc")}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-purple-700/20 flex items-center justify-center text-purple-300">AI</div>
                <div>
                  <div className="font-semibold">{t("bugShieldAiPoint1")}</div>
                  <div className="text-gray-400 text-sm">{t("bugShieldAiPoint1")}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-pink-700/20 flex items-center justify-center text-pink-300">PR</div>
                <div>
                  <div className="font-semibold">{t("bugShieldAiPoint2")}</div>
                  <div className="text-gray-400 text-sm">{t("bugShieldAiPoint2")}</div>
                </div>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-cyan-700/20 flex items-center justify-center text-cyan-300">FL</div>
                <div>
                  <div className="font-semibold">{t("bugShieldAiPoint3")}</div>
                  <div className="text-gray-400 text-sm">{t("bugShieldAiPoint3")}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-emerald-700/20 flex items-center justify-center text-emerald-300">VR</div>
                <div>
                  <div className="font-semibold">{t("bugShieldAiPoint4")}</div>
                  <div className="text-gray-400 text-sm">{t("bugShieldAiPoint4")}</div>
                </div>
              </li>
            </ul>
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
