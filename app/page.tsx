import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import { format } from "date-fns";

export default function Home() {
  const articles = getAllArticles();
  // Show only the 5 most recent posts
  const recentArticles = articles.slice(0, 5);

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Intro Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Personal Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-600 leading-relaxed">
          A personal space for writing, reflection, and long-form thought. 
          Here I explore philosophy, spirituality, and the ideas that resonate.
        </p>
      </section>

      {/* Recent Writing Feed */}
      <section>
        <h2 className="text-2xl font-bold mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
          Recent Writing
        </h2>

        <div className="space-y-8">
          {recentArticles.map((article) => (
            <div key={article.slug} className="group">
              <Link 
                href={`/${article.category}/${article.slug}`}
                className="block"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <span className="text-sm text-gray-400 shrink-0 sm:ml-4">
                    {format(new Date(article.date), "MMM d, yyyy")}
                  </span>
                </div>
                
                {article.description && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {article.description}
                  </p>
                )}
                
                <div className="mt-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                  {article.category}
                </div>
              </Link>
            </div>
          ))}

          {recentArticles.length === 0 && (
            <p className="text-gray-500 italic">No articles found. Time to write!</p>
          )}
        </div>
      </section>
    </main>
  );
}