"use client";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/app/context/LanguageContext";

export default function AiDrivenDevelopmentPage() {
  const { t, language } = useLanguage();

  const aiDrivenSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Driven Development: Backend & CI/CD",
    description: "AI-powered backend development: systems built in weeks (not months), pipelines that learn from your deploys, and code that optimizes continuously.",
    provider: {
      "@type": "Person",
      name: "Omar Antonio Díaz Peña",
      url: "https://www.linkedin.com/in/oadiazp/",
      sameAs: ["https://www.linkedin.com/in/oadiazp/", "https://github.com/oadiazp"],
    },
    url: `${siteConfig.url}/en/servicios/ai-driven-development`,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiDrivenSchema) }}
      />

      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400">
        <a href="/en" className="hover:text-purple-400 transition-colors">Home</a>
        <span>/</span>
        <a href="/en/#services" className="hover:text-purple-400 transition-colors">Services</a>
        <span>/</span>
        <span className="text-purple-400">AI Driven Development</span>
      </nav>

      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/6 via-purple-800/6 to-pink-900/6" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            AI-Driven Development | <span className="gradient-text">Backend, CI/CD & Optimization</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto text-balance">AI-powered backend development: systems built in weeks (not months), pipelines that learn from your deploys, and code that optimizes continuously.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/en/#services" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all hover:scale-105">
              View Services
            </a>
            <a href="/en/#contact" className="px-8 py-4 border border-gray-700 hover:border-purple-500 text-white rounded-lg font-semibold transition-all hover:scale-105">
              Get In Touch
            </a>
          </div>
        </div>

        {/* Visual stats strip */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 bg-gradient-to-r from-purple-800/10 via-pink-800/10 to-purple-800/10 p-1 rounded-2xl backdrop-blur-sm">
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">3-4x</div>
              <div className="text-sm text-gray-300">More Rapid Than Traditional Development</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">219+</div>
              <div className="text-sm text-gray-300">Automated Tests per Project</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl text-center border border-gray-800 shadow-sm">
              <div className="text-3xl font-bold text-white gradient-text mb-2">24/7</div>
              <div className="text-sm text-gray-300">Continuous Optimization</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">The Problem With Traditional Development</h2>
          <p className="text-gray-400 mb-8">A complex backend system takes 6–9 months with a traditional team. Requirements, development, testing, more development, more testing. By the time you finish, requirements have changed.</p>
          <p className="text-gray-400 mb-8">We do it differently: <strong>we orchestrate specialized AI agents</strong> that work in parallel, produce production-ready code, and generate tests while you sleep. It’s not magic — it’s methodology.</p>
  <p className="text-gray-400 mb-8">We do it differently: <strong className="gradient-text">we orchestrate specialized AI agents</strong> that work in parallel, produce production-ready code, and generate tests while you sleep. It’s not magic — it’s methodology.</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">Intelligent Backend</h3>
              <p className="text-gray-400">
                AI-powered backend services that learn from usage patterns and automatically scale resources.
              </p>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">Smart CI/CD</h3>
              <p className="text-gray-400">
                Continuous integration and deployment pipelines enhanced with AI for predictive testing and automated optimization.
              </p>
            </div>
            <div className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="font-semibold mb-2">Code Optimization</h3>
              <p className="text-gray-400">
                Automatic code analysis and refactoring using AI to improve performance, security, and maintainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Our Process</h2>
          <p className="text-gray-400 mb-6">1️⃣ <strong>Discovery & Stack</strong> — We analyze your domain, choose the optimal stack, and configure AI agents specialized for your architecture.</p>
          <p className="text-gray-400 mb-6">2️⃣ <strong>Parallel Development</strong> — While you review one module, the next is already in development. Agents work 24/7, you steer.</p>
          <p className="text-gray-400 mb-6">3️⃣ <strong>Continuous Testing</strong> — Every feature is born with tests. It’s how we validate AI-generated code as production-ready.</p>
          <p className="text-gray-400 mb-6">4️⃣ <strong>Optimization & Handoff</strong> — We deliver documented code, configured pipelines, and a team ready to maintain it.</p>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Meet Our AI Development Expert</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card-bg p-8 rounded-xl border border-gray-800 mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white">
                OD
              </div>
              <h3 className="text-xl font-semibold mb-2">Omar Antonio Díaz Peña</h3>
              <div className="text-lg font-semibold gradient-text mb-2">AI & Backend Specialist</div>
              <p className="text-gray-400 mb-4">10+ years in enterprise software. Expert in Odoo (v15-v19), cloud architecture, and orchestrating AI agents for development. Has taken 6–9 month projects down to 8 weeks using Claude Code, Gemini CLI and assisted methodologies.</p>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Build Differently?</h2>
          <p className="text-gray-400 mb-8">The timeline you were quoted is probably out of date. Let's talk about what's possible today.</p>
          <a href="/en/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold">Schedule a Consultation</a>
        </div>
      </section>
    </main>
  );
}