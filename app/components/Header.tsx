"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname() || "/";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const prefix = language === "en" ? "/en" : "";

  const switchLanguage = (target: "es" | "en") => {
    // compute target path preserving the current route; handle blog posts specially
    let targetPath = pathname;

    // Blog post pages: map slug <-> slug-en without using /en prefix
    const blogPostMatch = pathname.match(/^\/(?:en\/)?blog\/(?<slug>[^/]+)(?<rest>.*)$/);
    if (blogPostMatch && blogPostMatch.groups) {
      const { slug, rest } = blogPostMatch.groups as { slug: string; rest: string };
      if (target === "en") {
        targetPath = `/blog/${slug.endsWith("-en") ? slug : `${slug}-en`}${rest || ""}`;
      } else {
        // target === 'es'
        const base = slug.endsWith("-en") ? slug.replace(/-en$/, "") : slug;
        targetPath = `/blog/${base}${rest || ""}`;
      }
    } else {
      // Non-post pages: preserve prefixing scheme (/en/... for English pages)
      if (target === "en") {
        if (!pathname.startsWith("/en")) {
          targetPath = pathname === "/" ? "/en" : `/en${pathname}`;
        }
      } else {
        // switch to Spanish: remove leading /en
        if (pathname === "/en") {
          targetPath = "/";
        } else if (pathname.startsWith("/en/")) {
          targetPath = pathname.replace(/^\/en/, "");
        }
      }
    }

    setLanguage(target);
    // navigate to the computed path without adding history entry
    try {
      router.replace(targetPath);
    } catch (e) {
      console.warn("Router replace failed", e);
    }
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
          {/* Quick filter removed per request */}
          <a
            href={`${prefix}/#contact`}
            className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
          >
            {t("contact")}
          </a>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
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
      </nav>
    </header>
  );
}
