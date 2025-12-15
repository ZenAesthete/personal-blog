import Link from "next/link";
import { CATEGORIES } from "@/lib/content";

export default function Nav() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 py-6 mb-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo / Home Link */}
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight hover:text-blue-600 transition-colors"
        >
          Personal Blog
        </Link>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6">
          {CATEGORIES.map((category) => (
            <li key={category}>
              <Link 
                href={`/${category}`}
                className="text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}