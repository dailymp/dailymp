"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { BlogPostMetadata } from "@/lib/blog";

interface BlogGridProps {
  posts: BlogPostMetadata[];
  categories: string[];
}

export function BlogGrid({ posts, categories }: BlogGridProps) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Initialize selected category from URL param `?category=...`
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) setSelectedCategory(decodeURIComponent(cat));
    } catch (e) {
      // ignore server-side or unavailable window
    }
  }, []);

  // Filter posts by language
  const languagePosts = posts.filter((post) => {
    const postLang = post.lang || "es";
    return postLang === language;
  });

  const filteredPosts = selectedCategory
    ? languagePosts.filter((post) => post.category === selectedCategory)
    : languagePosts;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Categories Filter */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setSelectedCategory(null);
              try {
                const url = new URL(window.location.href);
                url.searchParams.delete("category");
                window.history.replaceState({}, "", url.toString());
              } catch (e) {}
            }}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === null
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All Articles
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                try {
                  const url = new URL(window.location.href);
                  url.searchParams.set("category", encodeURIComponent(category));
                  window.history.replaceState({}, "", url.toString());
                } catch (e) {}
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="card-hover h-full p-6 rounded-xl bg-card-bg border border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group">
                  {post.image && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-purple-400">
                      {post.category}
                    </span>
                    <span className="text-gray-600">•</span>
                    <time className="text-sm text-gray-500">{formattedDate}</time>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 mb-4 line-clamp-2">{post.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <span className="text-sm text-gray-500">{post.readingTime}</span>
                    <span className="text-purple-400 group-hover:translate-x-1 transition-transform">
                      Read More →
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No articles found in this category.</p>
        </div>
      )}
    </div>
  );
}
