import { notFound } from "next/navigation";
import {
  CATEGORIES,
  Category,
  getArticleBySlug,
} from "@/lib/content";
import { remark } from "remark";
import html from "remark-html";

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { category, slug } = await params;

  const normalizedCategory = category.toLowerCase() as Category;

  if (!CATEGORIES.includes(normalizedCategory)) {
    notFound();
  }

  const article = getArticleBySlug(normalizedCategory, slug);

  if (!article) {
    notFound();
  }

  const processedContent = await remark()
    .use(html)
    .process(article.content);

  const contentHtml = processedContent.toString();

  return (
    <main>
    <article className="article">
      <h1>{article.title}</h1>

      <p>
        <small>
          {article.date} · {article.category}
        </small>
      </p>

      <div
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  </main>
  );
}

