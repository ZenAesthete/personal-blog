import { notFound } from "next/navigation";
import { CATEGORIES, getArticlesByCategory } from "@/lib/content";
// 1. Import the new Card component
import { ArticleCard } from "../components/ArticleCard";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${title} | Personal Blog`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!CATEGORIES.includes(category as any)) {
    notFound();
  }

  const articles = getArticlesByCategory(category);

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Header - PRESERVED */}
      <header className="mb-12 border-b-2 border-gray-200 pb-4">
        <h1 className="text-4xl font-serif font-bold capitalize text-gray-900 dark:text-gray-100">
          {category}
        </h1>
        <p className="text-gray-500 mt-2 font-serif italic">
          {articles.length} {articles.length === 1 ? 'entry' : 'entries'}
        </p>
      </header>

      {/* 2. Replaced manual loop with ArticleCard */}
      <div className="space-y-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}

        {articles.length === 0 && (
          <p className="text-gray-500 italic">No entries in this category yet.</p>
        )}
      </div>
    </main>
  );
}