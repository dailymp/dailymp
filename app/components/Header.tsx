"use client";


import { useLanguage } from "@/app/context/LanguageContext";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  const prefix = language === "en" ? "/en" : "";

  const switchLanguage = (target: "es" | "en") => {
    let targetPath = pathname;
    const blogPostMatch = pathname.match(/^\/(?:en\/)?blog\/([^/]+)(.*)$/);
    if (blogPostMatch) {
      const slug = blogPostMatch[1] || "";
      const rest = blogPostMatch[2] || "";
      if (target === "en") {
        targetPath = `/blog/${slug.endsWith("-en") ? slug : `${slug}-en`}${rest || ""}`;
      } else {
        const base = slug.endsWith("-en") ? slug.replace(/-en$/, "") : slug;
        targetPath = `/blog/${base}${rest || ""}`;
      }
    } else {
      if (target === "en") {
        if (!pathname.startsWith("/en")) {
          targetPath = pathname === "/" ? "/en" : `/en${pathname}`;
        }
      } else {
        if (pathname === "/en") {
          targetPath = "/";
        } else if (pathname.startsWith("/en/")) {
          targetPath = pathname.replace(/^\/en/, "");
        }
      }
    }
    setLanguage(target);
    try {
      router.replace(targetPath);
    } catch (e) {
      console.warn("Router replace failed", e);
    }
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[1000] backdrop-blur-md bg-black/50 border-b border-gray-800">
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

        {/* Burger menu for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`block w-6 h-0.5 ${menuOpen ? "bg-white" : "bg-gray-300"} transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`block w-6 h-0.5 ${menuOpen ? "bg-white" : "bg-gray-300"} transition-all duration-300 my-1 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 ${menuOpen ? "bg-white" : "bg-gray-300"} transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>

        {/* Navigation Links Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href={`${prefix}/#about`}
            className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
          >
            {t("about")}
          </a>
          <a
            href={`${prefix}/#services`}
            className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
          >
            {t("services")}
          </a>
          <a
            href={`${prefix}/blog`}
            className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
          >
            {language === "en" ? "Blog & Articles" : "Blog & Artículos"}
          </a>
          <a
            href={`${prefix}/#contact`}
            className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
          >
            {t("contact")}
          </a>
        </div>

        {/* Language Switcher Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => switchLanguage("es")}
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
            onClick={() => switchLanguage("en")}
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

        {/* Mobile menu overlay */}
        <div className={`fixed inset-0 z-[1500] h-screen bg-black/90 flex justify-center items-center transition-all duration-400 ${menuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-5'}`} onClick={() => setMenuOpen(false)}>
          <ul className="text-center">
            <li style={{transitionDelay: '0.1s'}} className={`mb-5 transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <a
                href={`${prefix}/#about`}
                className="text-gray-300 hover:text-purple-400 transition-colors text-xl font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {t("about")}
              </a>
            </li>
            <li style={{transitionDelay: '0.2s'}} className={`mb-5 transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <a
                href={`${prefix}/#services`}
                className="text-gray-300 hover:text-purple-400 transition-colors text-xl font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {t("services")}
              </a>
            </li>
            <li style={{transitionDelay: '0.3s'}} className={`mb-5 transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <a
                href={`${prefix}/blog`}
                className="text-gray-300 hover:text-purple-400 transition-colors text-xl font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {language === "en" ? "Blog & Articles" : "Blog & Artículos"}
              </a>
            </li>
            <li style={{transitionDelay: '0.4s'}} className={`mb-5 transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <a
                href={`${prefix}/#contact`}
                className="text-gray-300 hover:text-purple-400 transition-colors text-xl font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {t("contact")}
              </a>
            </li>
            <li style={{transitionDelay: '0.5s'}} className={`mt-10 transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => switchLanguage("es")}
                  className={`px-4 py-2 rounded-lg text-xl transition-all ${
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
                  onClick={() => switchLanguage("en")}
                  className={`px-4 py-2 rounded-lg text-xl transition-all ${
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
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
