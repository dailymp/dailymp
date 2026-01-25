
import { BlogGrid } from "@/app/components/BlogGrid";
import { getAllBlogPosts, getBlogCategories } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getBlogCategories();

  return (
    <main className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="py-20 px-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Blog & Artículos
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights sobre integración de IA en frontend, mejores prácticas de desarrollo y tendencias tecnológicas modernas.
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
