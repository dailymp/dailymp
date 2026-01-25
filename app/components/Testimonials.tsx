"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { testimonials } from "@/config/testimonials";
import { useRef, useState, useEffect } from "react";

export function Testimonials() {
  const { t, language } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450; // ~2 cards width
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      // Check after animation
      setTimeout(checkScroll, 600);
    }
  };

  return (
    <section id="testimonials" className="py-20 px-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          {t("testimonialsTitle") || "What They Say"}{" "}
          <span className="gradient-text">{t("testimonialsTitleHighlight") || "About Me"}</span>
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          {t("testimonialsDescription") || "Recommendations from colleagues, clients, and mentors across my career."}
        </p>

        {/* Scroll Container */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className={`absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all ${
              canScrollLeft
                ? "bg-purple-600/80 hover:bg-purple-700 text-white cursor-pointer"
                : "bg-gray-700/50 text-gray-500 cursor-not-allowed opacity-50"
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className={`absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all ${
              canScrollRight
                ? "bg-purple-600/80 hover:bg-purple-700 text-white cursor-pointer"
                : "bg-gray-700/50 text-gray-500 cursor-not-allowed opacity-50"
            }`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] snap-center"
              >
                <div className="h-full p-8 rounded-xl bg-card-bg border border-gray-800 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-600/20 flex flex-col">
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 mb-6 flex-grow text-base leading-relaxed">
                    "{language === "es" ? testimonial.text.es : testimonial.text.en}"
                  </p>

                  {/* Author Info */}
                  <div className="border-t border-gray-700 pt-4 mt-auto">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-purple-400">{testimonial.title}</p>
                    {testimonial.company && (
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    )}
                    <p className="text-xs text-gray-600 mt-2">
                      {language === "es" ? testimonial.relationship.es : testimonial.relationship.en}
                    </p>
                    <p className="text-xs text-gray-600">{testimonial.date}</p>
                    {testimonial.linkedinUrl && (
                      <a
                        href={testimonial.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-xs text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.436-.103.249-.129.597-.129.946v5.423h-3.554s.044-8.789 0-9.701h3.554v1.373c.43-.664 1.195-1.61 2.905-1.61 2.12 0 3.714 1.388 3.714 4.374v5.564zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.706 0-.955.768-1.703 1.96-1.703 1.187 0 1.912.749 1.937 1.703 0 .948-.75 1.706-1.982 1.706zm1.581 11.597H3.714V9.751h3.204v10.701zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                        </svg>
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            {t("scrollForMore") || "Scroll to see more recommendations"}
          </p>
        </div>
      </div>
    </section>
  );
}
