import Link from "next/link";
import { getAllArticles } from "@/lib/content";
// 1. Import the new Card component
import { ArticleCard } from "./components/ArticleCard"; 

export default function Home() {
  const articles = getAllArticles();
  // Show only the 5 most recent posts
  const recentArticles = articles.slice(0, 5);

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Intro Section - PRESERVED */}
      <section className="mb-16">
        {/* Added 'font-serif' to match the new theme, otherwise text is same */}
        <h1 className="text-4xl font-bold font-serif tracking-tight mb-6">
          The Quest
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-600 leading-relaxed">
          A space for writing, reflection, and long-form thought. 
        </p>
      </section>

      {/* Recent Writing Feed */}
      <section>
        <h2 className="text-2xl font-bold font-serif mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
          Recent Writing
        </h2>

        {/* 2. Changed spacing to separate cards properly */}
        <div className="space-y-6"> 
          {recentArticles.map((article) => (
            /* 3. Replaced manual div structure with ArticleCard */
            <ArticleCard key={article.slug} article={article} />
          ))}

          {recentArticles.length === 0 && (
            <p className="text-gray-500 italic">No articles found. Time to write!</p>
          )}
        </div>
      </section>
    </main>
  );
}