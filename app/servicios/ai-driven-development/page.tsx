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
      sameAs: ["https://www.linkedin.com/in/oadiazp/", "https://github.com/oadiazp"],
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
            AI-Driven Development | <span className="gradient-text">Backend, CI/CD & Optimización</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto text-balance">
            Desarrollo backend impulsado por inteligencia artificial: sistemas que se construyen en semanas (no meses), pipelines que aprenden de tus deploys, y código que se optimiza continuamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">
              Inicio
            </a>
            <a href="/#services" className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105">
              Servicios
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 bg-gradient-to-r from-purple-800/10 via-pink-800/10 to-purple-800/10 p-1 rounded-2xl backdrop-blur-sm">
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">3-4x</div>
              <div className="text-sm text-gray-300">Más Rápido que Desarrollo Tradicional</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">219+</div>
              <div className="text-sm text-gray-300">Tests Automatizados por Proyecto</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">24/7</div>
              <div className="text-sm text-gray-300">Optimización Continua</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">El Problema con el Desarrollo Tradicional</h2>
          <p className="text-gray-400 mb-8">
            Un sistema backend complejo toma 6-9 meses con un equipo tradicional. Requisitos, desarrollo, testing, más desarrollo, más testing. Y cuando terminas, los requisitos ya cambiaron.
          </p>
          <p className="text-gray-400 mb-8">
            Nosotros lo hacemos diferente: <strong className="gradient-text">orquestamos agentes de IA especializados</strong> que trabajan en paralelo, escriben código production-ready, y generan tests mientras tú duermes.
          </p>
          <p className="text-gray-400 mb-8">No es magia. Es metodología.</p>

          <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">🚀 Smart Backend Services</h3>
              <p className="text-gray-400 mb-2">Backends completos en semanas, no meses. Construimos sobre stacks probados (Odoo, Django, FastAPI) y aprovechamos ecosistemas open-source maduros para no reinventar la rueda.</p>
              <div className="text-gray-400 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  <li>Arquitectura de dominio compleja (multi-moneda, impuestos locales, workflows)</li>
                  <li>Integración con módulos OCA y librerías battle-tested</li>
                  <li>Agentes AI configurados para tu stack específico</li>
                  <li>Documentación automática y código mantenible</li>
                </ul>
                <p className="mt-2"><strong className="gradient-text">Resultado real:</strong> Sistema de gestión vehicular con 11 modelos de negocio, facturación recurrente y compliance fiscal — de cero a producción en 8 semanas.</p>
              </div>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">⚡ Smart CI/CD</h3>
              <div className="text-gray-400 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  <li>Tests predictivos: priorizamos según el código que cambió</li>
                  <li>Build optimization: caché inteligente que reduce tiempos 40-60%</li>
                  <li>Auto-rollback con detección de anomalías</li>
                  <li>Reportes que te dicen <em>por qué</em> falló, no solo <em>qué</em> falló</li>
                </ul>
                <p className="mt-2"><strong className="gradient-text">Resultado real:</strong> "El 80% de tus fallos en CI vienen de 3 patrones. Los detectamos antes de que lleguen a producción."</p>
              </div>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">🔄 AI-Assisted Optimization</h3>
              <div className="text-gray-400 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  <li>Refactoring asistido con contexto de proyecto</li>
                  <li>Detección temprana de technical debt</li>
                  <li>Performance profiling + sugerencias accionables</li>
                  <li>Code review automatizado que mejora con cada iteración</li>
                </ul>
                <p className="mt-2"><strong className="gradient-text">Resultado real:</strong> Identificamos cuellos de botella antes de que tus usuarios los sufran. Sugerimos mejoras con PRs listos para mergear.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Nuestro Proceso</h2>
          <p className="text-gray-400 mb-6">1️⃣ <strong>Discovery & Stack</strong> — Analizamos tu dominio, elegimos el stack óptimo, configuramos agentes AI especializados en tu arquitectura.</p>
          <p className="text-gray-400 mb-6">2️⃣ <strong>Desarrollo Paralelo</strong> — Mientras revisas un módulo, el siguiente ya está en desarrollo. Los agentes trabajan 24/7, tú diriges.</p>
          <p className="text-gray-400 mb-6">3️⃣ <strong>Testing Continuo</strong> — Cada feature nace con tests. No es opcional: es cómo validamos que el código AI es production-ready.</p>
          <p className="text-gray-400 mb-6">4️⃣ <strong>Optimización & Handoff</strong> — Entregamos código documentado, pipelines configurados, y un equipo que sabe mantenerlo.</p>
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
          <h2 className="text-3xl font-bold mb-4">El Experto</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card-bg p-8 rounded-xl border border-gray-800 mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white">
                OD
              </div>
              <h3 className="text-xl font-semibold mb-2">Omar Antonio Díaz Peña</h3>
              <div className="text-lg font-semibold gradient-text mb-2">Especialista en Desarrollo AI & Backend</div>
              <p className="text-gray-400 mb-4">
                +10 años en desarrollo de software empresarial. Experto en Odoo (v15-v19), arquitectura cloud, y orquestación de agentes AI para desarrollo. Ha llevado proyectos de 6-9 meses a 8 semanas usando Claude Code, Gemini CLI y metodologías de desarrollo asistido.
              </p>
              <div className="flex items-center justify-center gap-4">
                <a href="https://www.linkedin.com/in/oadiazp/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">LinkedIn</a>
                <a href="https://github.com/oadiazp" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Desarrollar Diferente?</h2>
          <p className="text-gray-400 mb-8">El timeline que te han cotizado probablemente está desactualizado. Hablemos de lo que es posible hoy.</p>
          <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold">Agenda una Consultoría</a>
        </div>
      </section>
    </main>
  );
}