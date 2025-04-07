import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sonic AI - Powered by Gemini",
  description: "A question-answering app powered by Google Gemini API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 min-h-screen flex flex-col`}>
        {/* Header */}
        <header className="bg-white shadow-md py-6">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 animate-pulse">
              Sonic AI – Powered by Gemini
            </h1>
            <p className="text-gray-600 mt-1">Owned by sonttr777</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-4">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm">
              Sonic AI adalah model tanya jawab berbasis Gemini milik sonttr777.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
