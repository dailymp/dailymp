"use client";

import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useLanguage } from "@/app/context/LanguageContext";

interface BlogPostContentProps {
  source: MDXRemoteSerializeResult;
  title: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  image?: string;
  validSlugs?: string[];
}

// Custom MDX components for styling
const mdxComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold mb-6 mt-8 text-white">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-bold mb-4 mt-6 text-white">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-2xl font-bold mb-3 mt-5 text-white">{children}</h3>
  ),
  p: ({ children }: any) => (
    <p className="text-gray-300 mb-4 leading-relaxed text-lg">{children}</p>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-2">{children}</ol>
  ),
  li: ({ children }: any) => (
    <li className="text-gray-300 mb-2">{children}</li>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 italic text-gray-400 bg-gray-800/50 rounded">
      {children}
    </blockquote>
  ),
  code: ({ children }: any) => (
    <code className="bg-gray-800 text-pink-400 px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: any) => (
    <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-700">
      {children}
    </pre>
  ),
  a: ({ href, children }: any) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-purple-400 hover:text-pink-400 underline transition-colors"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }: any) => (
    <img
      src={src}
      alt={alt}
      className="rounded-lg max-w-full h-auto my-6 border border-gray-700"
    />
  ),
};

export function BlogPostContent({
  source,
  title,
  date,
  author,
  category,
  readingTime,
  image,
  validSlugs,
}: BlogPostContentProps) {
  const { language, t } = useLanguage();
  const [imageError, setImageError] = React.useState(false);
  // No automatic redirect; site will serve Spanish-only slugs to avoid prerender issues

  // Format date
  const formattedDate = new Date(date).toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="px-6 py-1 flex items-center gap-2 text-sm text-gray-400">
        <a href="/" className="hover:text-purple-400 transition-colors">
          Inicio
        </a>
        <span>/</span>
        <a href="/blog" className="hover:text-purple-400 transition-colors">
          Blog
        </a>
        <span>/</span>
        <span className="text-purple-400">{category}</span>
      </nav>

      {/* Header */}
      <header className="mb-6 md:mb-8 px-6 pt-1">
        {image && !imageError && (
          <img
            src={image}
            alt={title}
            className="w-full h-96 object-cover rounded-xl mb-8"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        {imageError && (
          <div className="w-full h-96 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl mb-8 flex items-center justify-center border border-purple-800/50">
            <span className="text-gray-500">{title}</span>
          </div>
        )}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">{title}</h1>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 items-center text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-purple-400">{category}</span>
          </div>
          <span className="text-sm">•</span>
          <time dateTime={date} className="text-sm">
            {formattedDate}
          </time>
          <span className="text-sm">•</span>
          <span className="text-sm">{readingTime}</span>
          <span className="text-sm">•</span>
          <span className="text-sm">{t("by")} {author}</span>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none px-6">
        <MDXRemote {...source} components={mdxComponents} />
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-800 px-6 pb-6">
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-6 border border-purple-800/50">
          <p className="text-gray-300 mb-4">
            {t("writtenBy")} <span className="font-semibold text-white">{author}</span>
          </p>
          <p className="text-gray-400 text-sm">
            {t("footerAuthorDesc")}
          </p>
        </div>
      </footer>
    </article>
  );
}
