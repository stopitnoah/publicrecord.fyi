import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "publicrecord.fyi",
  description: "User-sourced ALPR public record aggregator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} min-h-screen flex flex-col`}
      >
        <header className="border-b-2 border-black p-4 flex justify-between items-center bg-white sticky top-0 z-50">
          <h1 className="text-xl font-black tracking-tighter uppercase">publicrecord.fyi</h1>
          <nav className="flex gap-4 text-sm font-bold">
            <a href="/" className="hover:underline">Feed</a>
            <a href="/upload" className="hover:underline">Upload</a>
            <a href="/resources" className="hover:underline">Resources</a>
            <a href="/about" className="hover:underline">About</a>
          </nav>
        </header>
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <footer className="border-t-2 border-black p-6 text-center text-sm font-mono mt-auto space-y-2">
          <p>© {new Date().getFullYear()} publicrecord.fyi // Light and Sturdy</p>
          <div className="flex justify-center gap-4 text-[10px] font-bold uppercase">
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/emergency" className="text-red-600 hover:underline">Emergency Protocols</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
