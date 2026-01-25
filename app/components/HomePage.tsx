"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { siteConfig } from "@/config/site";
import { Testimonials } from "./Testimonials";

export function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-purple-800/10 to-pink-900/10" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 relative group cursor-pointer">
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes pulse-grow {
                  0%, 100% { transform: scale(1); opacity: 0.8; }
                  50% { transform: scale(1.15); opacity: 1; }
                }
                .icon-container:hover .pulse-circle {
                  animation: pulse-grow 1s ease-in-out infinite;
                }
                @keyframes rotate-slow {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                .icon-container:hover .rotating-ring {
                  animation: rotate-slow 8s linear infinite;
                }
                @keyframes glow-pulse {
                  0%, 100% { opacity: 0.6; }
                  50% { opacity: 1; }
                }
                .icon-container:hover .glow-dot {
                  animation: glow-pulse 1.5s ease-in-out infinite;
                }
              `}} />
              <svg viewBox="0 0 200 200" className="w-full h-full icon-container">
                <defs>
                  <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Outer rotating ring with code symbols */}
                <g className="rotating-ring" style={{transformOrigin: '100px 100px'}}>
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="100" 
                    fill="none" 
                    stroke="url(#iconGradient)" 
                    strokeWidth="2.5" 
                    strokeDasharray="20 12"
                    opacity="0.5"
                  />
                  {/* Code symbols around the ring */}
                  <text x="100" y="10" fontSize="16" fill="#a855f7" opacity="0.7" textAnchor="middle" fontFamily="monospace" fontWeight="600">{`{}`}</text>
                  <text x="175" y="38" fontSize="16" fill="#ec4899" opacity="0.7" textAnchor="middle" fontFamily="monospace" fontWeight="600">[ ]</text>
                  <text x="193" y="105" fontSize="16" fill="#8b5cf6" opacity="0.7" textAnchor="middle" fontFamily="monospace" fontWeight="600">=&gt;</text>
                  <text x="175" y="176" fontSize="16" fill="#a855f7" opacity="0.7" textAnchor="middle" fontFamily="monospace" fontWeight="600">fn</text>
                  <text x="100" y="203" fontSize="16" fill="#ec4899" opacity="0.7" textAnchor="middle" fontFamily="monospace" fontWeight="600">&lt;/&gt;</text>
                  <text x="25" y="176" fontSize="16" fill="#8b5cf6" opacity="0.7" textAnchor="middle" fontFamily="monospace" fontWeight="600">( )</text>
                  <text x="7" y="105" fontSize="16" fill="#a855f7" opacity="0.7" textAnchor="middle" fontFamily="monospace" fontWeight="600">AI</text>
                  <text x="25" y="38" fontSize="16" fill="#ec4899" opacity="0.7" textAnchor="middle" fontFamily="monospace" fontWeight="600">TS</text>
                </g>
                
                {/* Central neural network */}
                <g className="pulse-circle" style={{transformOrigin: '100px 100px'}} filter="url(#softGlow)">
                  {/* Core nodes */}
                  <circle className="glow-dot" cx="100" cy="65" r="6" fill="#ec4899" />
                  <circle className="glow-dot" cx="75" cy="85" r="5" fill="#a855f7" style={{animationDelay: '0.2s'}} />
                  <circle className="glow-dot" cx="125" cy="85" r="5" fill="#a855f7" style={{animationDelay: '0.3s'}} />
                  <circle className="glow-dot" cx="100" cy="100" r="8" fill="#fdf2f8" style={{animationDelay: '0.1s'}} />
                  <circle className="glow-dot" cx="75" cy="115" r="5" fill="#8b5cf6" style={{animationDelay: '0.4s'}} />
                  <circle className="glow-dot" cx="125" cy="115" r="5" fill="#8b5cf6" style={{animationDelay: '0.5s'}} />
                  <circle className="glow-dot" cx="100" cy="135" r="6" fill="#ec4899" style={{animationDelay: '0.3s'}} />
                  
                  {/* Connection lines */}
                  <line x1="100" y1="65" x2="75" y2="85" stroke="#a855f7" strokeWidth="2" opacity="0.6" />
                  <line x1="100" y1="65" x2="125" y2="85" stroke="#a855f7" strokeWidth="2" opacity="0.6" />
                  <line x1="75" y1="85" x2="100" y2="100" stroke="#ec4899" strokeWidth="2.5" opacity="0.7" />
                  <line x1="125" y1="85" x2="100" y2="100" stroke="#ec4899" strokeWidth="2.5" opacity="0.7" />
                  <line x1="100" y1="100" x2="75" y2="115" stroke="#8b5cf6" strokeWidth="2.5" opacity="0.7" />
                  <line x1="100" y1="100" x2="125" y2="115" stroke="#8b5cf6" strokeWidth="2.5" opacity="0.7" />
                  <line x1="75" y1="115" x2="100" y2="135" stroke="#a855f7" strokeWidth="2" opacity="0.6" />
                  <line x1="125" y1="115" x2="100" y2="135" stroke="#a855f7" strokeWidth="2" opacity="0.6" />
                  <line x1="75" y1="85" x2="75" y2="115" stroke="#ec4899" strokeWidth="1.5" opacity="0.4" />
                  <line x1="125" y1="85" x2="125" y2="115" stroke="#ec4899" strokeWidth="1.5" opacity="0.4" />
                </g>
                
                {/* Code brackets */}
                <text x="48" y="107" fontSize="38" fontWeight="bold" fontFamily="monospace" fill="#a855f7" opacity="0.4">&lt;</text>
                <text x="146" y="107" fontSize="38" fontWeight="bold" fontFamily="monospace" fill="#ec4899" opacity="0.4">/&gt;</text>
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            {t("title")}<br />
            <span className="gradient-text">{t("titleHighlight")}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto text-balance">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105"
            >
              {t("viewServices")}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105"
            >
              {t("getInTouch")}
            </a>
          </div>
        </div>
      </section>

      {/* About/Expertise Section */}
      <section id="about" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            {t("aboutTitle")} <span className="gradient-text">{t("aboutTitleHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            {t("aboutDescription")}
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{t("computerScience")}</h3>
              <p className="text-gray-400">
                {t("computerScienceDesc")}
              </p>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-pink-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{t("frontendDesign")}</h3>
              <p className="text-gray-400">
                {t("frontendDesignDesc")}
              </p>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-violet-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{t("modernStack")}</h3>
              <p className="text-gray-400">
                {t("modernStackDesc")}
              </p>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800 ai-card-special">
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes glow-pulse-special {
                  0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(236, 72, 153, 0.2); }
                  50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(236, 72, 153, 0.4), 0 0 80px rgba(139, 92, 246, 0.3); }
                }
                .ai-card-special:hover {
                  transform: translateY(-8px) scale(1.02);
                  border-color: rgba(168, 85, 247, 0.8);
                  animation: glow-pulse-special 2s ease-in-out infinite;
                }
              `}} />
              <div className="w-12 h-12 rounded-lg bg-violet-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{t("aiInnovation")}</h3>
              <p className="text-gray-400 mb-3">
                {t("aiInnovationDesc")}
              </p>
              <a href="/servicios/integracion-ia" className="text-purple-400 hover:text-pink-400 transition-colors underline text-sm font-semibold">
                → {t("discoverMore")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            {t("servicesTitle")} <span className="gradient-text">{t("servicesTitleHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            {t("servicesDescription")}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">{t("aiConsulting2026")}</h3>
              <p className="text-gray-400 mb-6">
                {t("aiConsulting2026Desc")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("aiConsultingConversational")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("aiConsultingStreaming")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("aiConsultingPerformance")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("aiConsultingGenerative")}
                </li>
              </ul>
              <a
                href="/servicios/integracion-ia"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-600/50"
              >
                <span>{t("discoverMore")}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">{t("technicalConsulting")}</h3>
              <p className="text-gray-400 mb-6">
                {t("technicalConsultingDesc")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("architectureReview")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("performanceOptimization")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("codeQualityAudits")}
                </li>
              </ul>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">{t("designSystems")}</h3>
              <p className="text-gray-400 mb-6">
                {t("designSystemsDesc")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("componentLibraries")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("styleGuidelines")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("documentation")}
                </li>
              </ul>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">{t("aiTraining")}</h3>
              <p className="text-gray-400 mb-6">
                {t("aiTrainingDesc")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-violet-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("aiTrainingCurriculum")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-violet-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("aiTrainingWorkshops")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-violet-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("aiTrainingMentorship")}
                </li>
              </ul>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">{t("uiuxDesign")}</h3>
              <p className="text-gray-400 mb-6">
                {t("uiuxDesignDesc")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-violet-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("userResearch")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-violet-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("wireframingPrototyping")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-violet-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("usabilityTesting")}
                </li>
              </ul>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">{t("developmentServices")}</h3>
              <p className="text-gray-400 mb-6">
                {t("developmentServicesDesc")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("reactNextjsApps")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("typescriptDevelopment")}
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("responsiveDesign")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("letWork")} <span className="gradient-text">{t("letWorkHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            {t("letWorkDesc")}
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a
              href={`mailto:${siteConfig.email}`}
              className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800 hover:border-purple-500"
            >
              <svg className="w-8 h-8 text-purple-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="font-semibold mb-2">{t("email")}</h3>
              <p className="text-sm text-gray-400">{siteConfig.email}</p>
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800 hover:border-purple-500"
            >
              <svg className="w-8 h-8 text-purple-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <h3 className="font-semibold mb-2">{t("linkedin")}</h3>
              <p className="text-sm text-gray-400">{t("connectWithMe")}</p>
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800 hover:border-purple-500"
            >
              <svg className="w-8 h-8 text-purple-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <h3 className="font-semibold mb-2">{t("github")}</h3>
              <p className="text-sm text-gray-400">{t("viewMyWork")}</p>
            </a>
          </div>
          <div className="p-8 rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-800/50">
            <h3 className="text-2xl font-bold mb-4">{t("readyGetStarted")}</h3>
            <p className="text-gray-300 mb-6">
              {t("readyGetStartedDesc")}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105"
            >
              {t("sendMessage")}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {siteConfig.name}. {t("allRightsReserved")}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {t("builtWith")}
          </p>
        </div>
      </footer>
    </main>
  );
}
