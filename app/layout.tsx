import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import MoneroTicker from "./components/monero-ticker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "PublicRecord.fyi | Decentralized Transparency Registry",
  description: "A seizure-proof archive of verified public records. Protecting evidence via BitTorrent & IPFS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#f8f8f8] text-black min-h-screen flex flex-col`}>
        {/* Navigation */}
        <nav className="border-b-4 border-black bg-white sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-black uppercase tracking-tighter hover:bg-black hover:text-white transition-colors px-2">
              PublicRecord<span className="text-gray-500">.fyi</span>
            </Link>
            <Link href="/network" className="hidden sm:flex items-center gap-2 px-2 py-0.5 border border-black hover:bg-black hover:text-white transition-all group">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-tighter">Network: Stable</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/about" className="text-sm font-bold uppercase hover:underline">About</Link>
            <Link href="/support" className="text-sm font-bold uppercase hover:underline">Support</Link>
            <Link href="/upload" className="brutal-btn px-4 py-1 text-sm uppercase">Submit</Link>
          </div>
        </nav>

        <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
          {children}
        </main>

        <footer className="mt-20 border-t-4 border-black bg-white">
          <MoneroTicker />
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="font-black uppercase text-xl mb-4 italic underline decoration-4 underline-offset-4">Resilience</h3>
                <p className="text-sm font-mono leading-relaxed text-gray-600">
                  This registry is mirrored across Tor, IPFS, and BitTorrent. Seizing this domain only affects the gateway; the records are permanent.
                </p>
              </div>
              <div>
                <h3 className="font-black uppercase text-xl mb-4 italic underline decoration-4 underline-offset-4">Transparency</h3>
                <ul className="space-y-2 font-bold uppercase text-xs">
                  <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
                  <li><Link href="/network" className="hover:underline">Network Status</Link></li>
                  <li><Link href="/resources" className="hover:underline">FOIA Resources</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-black uppercase text-xl mb-4 italic underline decoration-4 underline-offset-4">Network</h3>
                <p className="text-xs font-mono text-gray-500">
                  v1.2.0-stable<br />
                  Verified Mirrors: 12 active<br />
                  Data Integrity: 100% SHA-1 Verified
                </p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-black border-dotted flex justify-between items-center flex-wrap gap-4">
              <p className="font-black uppercase text-[10px] tracking-widest">
                © {new Date().getFullYear()} No Rights Reserved. Information wants to be free.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
