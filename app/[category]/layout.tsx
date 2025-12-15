import { ReactNode } from "react";
import { CATEGORIES, Category } from "@/lib/content";

interface CategoryLayoutProps {
  children: ReactNode;
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryLayout({
  children,
  params,
}: CategoryLayoutProps) {
  const { category } = await params;
  const normalizedCategory = category.toLowerCase() as Category;

  const themeClass = CATEGORIES.includes(normalizedCategory)
    ? `theme-${normalizedCategory}`
    : "";

  return <div className={themeClass}>{children}</div>;
}
