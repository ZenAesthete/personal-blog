import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import "./globals.css";

// 1. Load Google Font
const inter = Inter({ subsets: ["latin"] });

// 2. Define Global Metadata
export const metadata: Metadata = {
  title: {
    template: "%s | Personal Blog", // %s is replaced by the page title
    default: "Personal Blog",       // Default if no page title is found
  },
  description: "Thoughts, reflections, and philosophy regarding the modern world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 
          3. Apply Body Classes 
          - inter.className: Applies the font
          - min-h-screen flex flex-col: Pushes footer to bottom
          - antialiased: Makes text look sharper
      */}
      <body 
        className={`${inter.className} min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 antialiased`}
      >
        <Nav />

        {/* 
            We do NOT wrap children in <main> here because 
            our page components (app/page.tsx, etc) already have their own <main>.
            This wrapper div just ensures flexible spacing.
        */}
        <div className="flex-grow">
          {children}
        </div>

        <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Personal Blog. Built with Next.js & MDX.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}