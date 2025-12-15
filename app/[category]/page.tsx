import { notFound } from "next/navigation";
import {
  CATEGORIES,
  Category,
  getArticlesByCategory,
} from "@/lib/content";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const normalizedCategory = category.toLowerCase() as Category;

  if (!CATEGORIES.includes(normalizedCategory)) {
    notFound();
  }

  const articles = getArticlesByCategory(normalizedCategory);

  return (
    <main>
      <h1>{normalizedCategory}</h1>

      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <a href={`/${normalizedCategory}/${article.slug}`}>
              {article.title}
            </a>{" "}
            — <small>{article.date}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
