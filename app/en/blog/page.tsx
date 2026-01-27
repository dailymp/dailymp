import { BlogGrid } from "@/app/components/BlogGrid";
import { getBlogPostsByLanguage, getBlogCategoriesByLanguage } from "@/lib/blog";

export default function BlogPageEN() {
  const posts = getBlogPostsByLanguage("en");
  const categories = getBlogCategoriesByLanguage("en");

  return (
    <main className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="py-20 px-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Blog & Articles
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights on AI integration in frontend, development best practices and modern technology trends.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-6">
        <BlogGrid posts={posts} categories={categories} />
      </section>
    </main>
  );
}
