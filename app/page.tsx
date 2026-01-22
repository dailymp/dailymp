export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold">
              MP
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Frontend Design &<br />
            <span className="gradient-text">Development Consultant</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto text-balance">
            Computer Science Engineer with dual Master's degrees in Frontend Design.
            Transforming ideas into elegant, scalable digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all hover:scale-105"
            >
              View Services
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-gray-700 hover:border-indigo-500 text-white rounded-lg font-semibold transition-all hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* About/Expertise Section */}
      <section id="about" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Expertise & <span className="gradient-text">Qualifications</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Combining technical excellence with design mastery to deliver exceptional results
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-indigo-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Computer Science</h3>
              <p className="text-gray-400">
                Engineering degree with strong foundation in algorithms, systems architecture, and software development
              </p>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Frontend Design</h3>
              <p className="text-gray-400">
                Dual Master's degrees specializing in modern UI/UX design principles and user-centered development
              </p>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-pink-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Modern Stack</h3>
              <p className="text-gray-400">
                Expert in React, TypeScript, Next.js, and modern frontend technologies for scalable applications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Consulting <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Professional consulting services to elevate your digital presence
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Technical Consulting</h3>
              <p className="text-gray-400 mb-6">
                Strategic guidance on architecture, technology stack selection, and best practices for scalable frontend applications.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Architecture Review
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Performance Optimization
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Code Quality Audits
                </li>
              </ul>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Design Systems</h3>
              <p className="text-gray-400 mb-6">
                Create cohesive, scalable design systems that ensure consistency across your entire digital ecosystem.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Component Libraries
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Style Guidelines
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Documentation
                </li>
              </ul>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">UI/UX Design</h3>
              <p className="text-gray-400 mb-6">
                User-centered design solutions that combine aesthetics with functionality to create exceptional experiences.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  User Research
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Wireframing & Prototyping
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Usability Testing
                </li>
              </ul>
            </div>
            <div className="card-hover p-8 rounded-xl bg-card-bg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Development Services</h3>
              <p className="text-gray-400 mb-6">
                Full-stack frontend development with modern frameworks and tools for high-performance applications.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  React & Next.js Apps
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  TypeScript Development
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Responsive Design
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Ready to elevate your digital presence? Let's discuss how I can help bring your vision to life.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a
              href="mailto:contact@example.com"
              className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800 hover:border-indigo-500"
            >
              <svg className="w-8 h-8 text-indigo-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-gray-400">contact@example.com</p>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800 hover:border-indigo-500"
            >
              <svg className="w-8 h-8 text-indigo-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <h3 className="font-semibold mb-2">LinkedIn</h3>
              <p className="text-sm text-gray-400">Connect with me</p>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover p-6 rounded-xl bg-card-bg border border-gray-800 hover:border-indigo-500"
            >
              <svg className="w-8 h-8 text-indigo-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-sm text-gray-400">View my work</p>
            </a>
          </div>
          <div className="p-8 rounded-xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-800/50">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-gray-300 mb-6">
              Whether you need a technical audit, design consultation, or full development services, I'm here to help.
            </p>
            <a
              href="mailto:contact@example.com"
              className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all hover:scale-105"
            >
              Send a Message
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Frontend Consultant. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}
