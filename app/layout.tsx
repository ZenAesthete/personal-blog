import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Nav from "./components/Nav";
import { ThemeProvider } from "./components/ThemeProvider"; // Import the Provider
import "./globals.css";

// Load Poppins (Geometric Sans)
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Personal Blog",
    default: "Personal Blog",
  },
  description: "Thoughts, reflections, and philosophy regarding the modern world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. Add suppressHydrationWarning (Required for next-themes)
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      {/* 
         2. REMOVED "bg-white text-gray-900". 
         We let globals.css handle the background/text colors via variables 
         so they switch automatically in Dark Mode.
      */}
      <body className="min-h-screen flex flex-col antialiased bg-paper text-ink transition-colors duration-300">
        <ThemeProvider>
          <Nav />

          <div className="flex-grow">
            {children}
          </div>

          <footer className="border-t border-gray-200 py-12 mt-20 bg-gray-50 dark:bg-gray-100 transition-colors duration-300">
            <div className="container mx-auto px-4 text-center text-sm text-gray-500 font-medium">
              <p>© {new Date().getFullYear()} — Personal Knowledge Archive.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}