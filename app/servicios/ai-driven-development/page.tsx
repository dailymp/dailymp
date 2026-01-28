"use client";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/app/context/LanguageContext";

export default function AiDrivenDevelopmentPage() {
  const { t, language } = useLanguage();

  const aiDrivenSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Driven Development: Backend & CI/CD",
    description: "Desarrollo backend impulsado por IA con pipelines CI/CD inteligentes para optimización automática de código y despliegues eficientes.",
    provider: {
      "@type": "Person",
      name: "Omar Antonio Díaz Peña",
      url: "https://www.linkedin.com/in/oadiazp/",
      sameAs: ["https://www.linkedin.com/in/oadiazp/"],
    },
    url: `${siteConfig.url}/servicios/ai-driven-development`,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiDrivenSchema) }}
      />

      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400">
        <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
        <span>/</span>
        <a href="/#services" className="hover:text-purple-400 transition-colors">{t("services")}</a>
        <span>/</span>
        <span className="text-purple-400">AI Driven Development</span>
      </nav>

      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/6 via-purple-800/6 to-pink-900/6" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            AI Driven Development: <span className="gradient-text">Backend & CI/CD</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto text-balance">
            Desarrollo backend impulsado por inteligencia artificial para crear servicios escalables, optimizar código automáticamente y desplegar con pipelines CI/CD inteligentes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#services" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">
              {language === "en" ? "View Services" : "Ver Servicios"}
            </a>
            <a href="/#contact" className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105">
              {language === "en" ? "Get In Touch" : "Contactar"}
            </a>
          </div>
        </div>

        {/* Visual stats strip */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 bg-gradient-to-r from-purple-800/10 via-pink-800/10 to-purple-800/10 p-1 rounded-2xl backdrop-blur-sm">
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">95%</div>
              <div className="text-sm text-gray-300">{language === "en" ? "Code Efficiency" : "Eficiencia de Código"}</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">50%</div>
              <div className="text-sm text-gray-300">{language === "en" ? "Faster Deployments" : "Despliegues Más Rápidos"}</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">24/7</div>
              <div className="text-sm text-gray-300">{language === "en" ? "Automated Monitoring" : "Monitoreo Automatizado"}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            {language === "en" ? "What is AI Driven Development?" : "¿Qué es el Desarrollo Backend Impulsado por IA?"}
          </h2>
          <p className="text-gray-400 mb-8">
            {language === "en"
              ? "AI Driven Development combines artificial intelligence with modern backend development practices to create self-optimizing systems. Our approach uses machine learning algorithms to analyze code patterns, predict potential issues, and automatically optimize performance while maintaining CI/CD pipelines that adapt to your project's needs."
              : "El Desarrollo Backend Impulsado por IA combina inteligencia artificial con prácticas modernas de desarrollo backend para crear sistemas auto-optimizantes. Nuestro enfoque utiliza algoritmos de aprendizaje automático para analizar patrones de código, predecir problemas potenciales y optimizar automáticamente el rendimiento mientras mantiene pipelines CI/CD que se adaptan a las necesidades de tu proyecto."
            }
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">
                {language === "en" ? "Intelligent Backend" : "Backend Inteligente"}
              </h3>
              <p className="text-gray-400">
                {language === "en"
                  ? "AI-powered backend services that learn from usage patterns and automatically scale resources."
                  : "Servicios backend impulsados por IA que aprenden de patrones de uso y escalan recursos automáticamente."
                }
              </p>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">
                {language === "en" ? "Smart CI/CD" : "CI/CD Inteligente"}
              </h3>
              <p className="text-gray-400">
                {language === "en"
                  ? "Continuous integration and deployment pipelines enhanced with AI for predictive testing and automated optimization."
                  : "Pipelines de integración y despliegue continuo mejorados con IA para pruebas predictivas y optimización automatizada."
                }
              </p>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">
                {language === "en" ? "Code Optimization" : "Optimización de Código"}
              </h3>
              <p className="text-gray-400">
                {language === "en"
                  ? "Automatic code analysis and refactoring using AI to improve performance, security, and maintainability."
                  : "Análisis y refactorización automática de código usando IA para mejorar rendimiento, seguridad y mantenibilidad."
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            {language === "en" ? "AI-Powered Development Process" : "Proceso de Desarrollo Backend Impulsado por IA"}
          </h2>
          <p className="text-gray-400 mb-6">
            {language === "en"
              ? "Our AI-driven approach transforms traditional development workflows into intelligent, adaptive processes."
              : "Nuestro enfoque impulsado por IA transforma los flujos de trabajo tradicionales de desarrollo en procesos inteligentes y adaptativos."
            }
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-purple-700/20 flex items-center justify-center text-purple-300">🤖</div>
                <div>
                  <div className="font-semibold">
                    {language === "en" ? "Predictive Analysis" : "Análisis Predictivo"}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {language === "en"
                      ? "AI analyzes code patterns to predict bugs and performance issues before they occur."
                      : "La IA analiza patrones de código para predecir errores y problemas de rendimiento antes de que ocurran."
                    }
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-pink-700/20 flex items-center justify-center text-pink-300">⚡</div>
                <div>
                  <div className="font-semibold">
                    {language === "en" ? "Automated Optimization" : "Optimización Automatizada"}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {language === "en"
                      ? "Continuous code optimization and refactoring based on AI recommendations."
                      : "Optimización y refactorización continua de código basada en recomendaciones de IA."
                    }
                  </div>
                </div>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-cyan-700/20 flex items-center justify-center text-cyan-300">🔄</div>
                <div>
                  <div className="font-semibold">
                    {language === "en" ? "Adaptive CI/CD" : "CI/CD Adaptativo"}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {language === "en"
                      ? "CI/CD pipelines that learn from deployment history and optimize automatically."
                      : "Pipelines CI/CD que aprenden del historial de despliegues y se optimizan automáticamente."
                    }
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-green-700/20 flex items-center justify-center text-green-300">📊</div>
                <div>
                  <div className="font-semibold">
                    {language === "en" ? "Intelligent Monitoring" : "Monitoreo Inteligente"}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {language === "en"
                      ? "Real-time monitoring with AI-driven insights and automated issue resolution."
                      : "Monitoreo en tiempo real con insights impulsados por IA y resolución automática de problemas."
                    }
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === "en" ? "Meet Our AI Development Expert" : "Conoce a Nuestro Experto en Desarrollo IA"}
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card-bg p-8 rounded-xl border border-gray-800 mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white">
                OD
              </div>
              <h3 className="text-xl font-semibold mb-2">Omar Antonio Díaz Peña</h3>
              <p className="text-gray-400 mb-4">
                {language === "en"
                  ? "AI Development Specialist with extensive experience in backend systems, CI/CD automation, and machine learning integration."
                  : "Especialista en Desarrollo IA con amplia experiencia en sistemas backend, automatización CI/CD e integración de machine learning."
                }
              </p>
              <a
                href="https://www.linkedin.com/in/oadiazp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === "en" ? "Ready to Transform Your Backend Development?" : "¿Listo para Transformar tu Desarrollo Backend?"}
          </h2>
          <p className="text-gray-400 mb-8">
            {language === "en"
              ? "Let's discuss how AI-driven development can revolutionize your backend systems and CI/CD processes."
              : "Hablemos de cómo el desarrollo backend impulsado por IA puede revolucionar tus sistemas backend y procesos CI/CD."
            }
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-600/50"
          >
            {language === "en" ? "Start Your AI Journey" : "Inicia tu Viaje IA"}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}