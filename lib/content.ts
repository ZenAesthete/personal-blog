import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const CATEGORIES = [
  "philosophy",
  "reflections",
  "resonance",
  "spirituality",
] as const;

export type Category = (typeof CATEGORIES)[number];


export interface ArticleMeta {
  title: string;
  date: string;
  category: Category;
  description: string;
  slug: string;
}

export interface Article extends ArticleMeta {
  content: string;
}


const CONTENT_DIR = path.join(process.cwd(), "content");

export function getAllArticles(): ArticleMeta[] {
  const categories = fs.readdirSync(CONTENT_DIR);

  const articles: ArticleMeta[] = [];

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category);

    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, "utf8");

      const { data } = matter(fileContents);

      articles.push({
        title: data.title,
        date: data.date,
        category: data.category as Category,
        description: data.description,
        slug: file.replace(".md", ""),
      });
    }
  }

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticlesByCategory(category: Category): ArticleMeta[] {
  return getAllArticles().filter(
    (article) => article.category === category
  );
}

export function getCategoriesWithCounts() {
  const articles = getAllArticles();

  return CATEGORIES.map((category) => ({
    category,
    count: articles.filter((a) => a.category === category).length,
  }));
}

export function getArticleBySlug(
  category: Category,
  slug: string
): Article | null {
  const filePath = path.join(
    CONTENT_DIR,
    category,
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    date: data.date,
    category: data.category as Category,
    description: data.description,
    slug,
    content,
  };
}
