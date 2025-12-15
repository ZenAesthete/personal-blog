import Link from "next/link";
import { CATEGORIES } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export default function Nav() {
  return (
    <nav className="border-b-4 border-double border-gray-300 py-8 mb-12 relative">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6">
        
        {/* 
           Theme Toggle Positioned Absolutely 
           - Top right on desktop
           - Relative on mobile (so it doesn't overlap logo)
        */}
        <div className="absolute right-4 top-8 hidden md:block">
          <ThemeToggle />
        </div>
        
        {/* Logo */}
        <Link 
          href="/" 
          className="text-5xl font-bold font-serif tracking-tight text-gray-900 hover:text-accent transition-colors"
        >
          Personal Blog
        </Link>

        {/* Mobile Toggle (Visible only on small screens) */}
        <div className="md:hidden">
          <ThemeToggle />
        </div>

        {/* Categories */}
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-2">
          {CATEGORIES.map((category) => (
            <li key={category}>
              <Link 
                href={`/${category}`}
                className="text-lg font-serif font-medium text-gray-600 hover:text-accent hover:italic transition-all duration-300 capitalize"
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