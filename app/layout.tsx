import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Nav from "./components/Nav";
import "./globals.css";

// Load Poppins (Geometric Sans)
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Regular, Medium, SemiBold, Bold
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
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-white text-gray-900">
        <Nav />

        <div className="flex-grow">
          {children}
        </div>

        <footer className="border-t border-gray-100 py-12 mt-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500 font-medium">
            <p>© {new Date().getFullYear()} — Personal Knowledge Archive.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}