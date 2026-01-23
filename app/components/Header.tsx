"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-gray-800">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with Development Icon */}
        <button
          onClick={scrollToTop}
          className="text-xl md:text-2xl font-bold group cursor-pointer hover:scale-105 transition-transform"
          title="Back to top"
        >
          <span className="text-gray-400 group-hover:text-purple-400 transition-colors">&lt;</span>
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            DMP
          </span>
          <span className="text-gray-400 group-hover:text-purple-400 transition-colors">/&gt;</span>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
          >
            {t("about")}
          </a>
          <a
            href="#services"
            className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
          >
            {t("services")}
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
          >
            {t("contact")}
          </a>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage("es")}
            className={`px-3 py-2 rounded-lg text-lg transition-all ${
              language === "es"
                ? "bg-purple-600/20 text-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            title="Español"
            aria-label="Español"
          >
            🇪🇸
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-2 rounded-lg text-lg transition-all ${
              language === "en"
                ? "bg-purple-600/20 text-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            title="English"
            aria-label="English"
          >
            🇬🇧
          </button>
        </div>
      </nav>
    </header>
  );
}
