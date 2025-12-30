'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function NavMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative z-50">
                {/* Logo & Network Status (Left) */}
                <div className="flex items-center gap-4">
                    <Link href="/" onClick={closeMenu} className="text-2xl font-black uppercase tracking-tighter hover:bg-black hover:text-white transition-colors px-2">
                        PublicRecord<span className="text-gray-500">.fyi</span>
                    </Link>
                    <Link href="/network" onClick={closeMenu} className="hidden sm:flex items-center gap-2 px-2 py-0.5 border border-black hover:bg-black hover:text-white transition-all group">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-tighter">Network: Stable</span>
                    </Link>
                </div>

                {/* Desktop Navigation (Right) */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/about" className="text-sm font-bold uppercase hover:underline">About</Link>
                    <Link href="/support" className="text-sm font-bold uppercase hover:underline">Support</Link>
                    <a
                        href="https://github.com/stopitnoah/publicrecord.fyi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold uppercase hover:underline flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        GitHub
                    </a>
                    <Link href="/upload" className="brutal-btn px-4 py-1 text-sm uppercase">Submit</Link>
                </div>

                {/* Mobile Menu Toggle (Right) */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden brutal-shadow-small border-2 border-black p-2 bg-yellow-300 hover:bg-yellow-400 active:translate-y-0.5 transition-all"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Overlay Menu */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 space-y-8 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="space-y-4">
                        <Link
                            href="/about"
                            onClick={closeMenu}
                            className="block text-4xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 hover:bg-black hover:text-white px-2"
                        >
                            About
                        </Link>
                        <Link
                            href="/network"
                            onClick={closeMenu}
                            className="block text-4xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 hover:bg-black hover:text-white px-2"
                        >
                            Network
                        </Link>
                        <Link
                            href="/support"
                            onClick={closeMenu}
                            className="block text-4xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 hover:bg-black hover:text-white px-2"
                        >
                            Support
                        </Link>
                        <a
                            href="https://github.com/stopitnoah/publicrecord.fyi"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                            className="block text-4xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 hover:bg-black hover:text-white px-2"
                        >
                            GitHub
                        </a>
                    </div>

                    <Link
                        href="/upload"
                        onClick={closeMenu}
                        className="brutal-btn w-full text-center py-6 text-2xl uppercase font-black tracking-widest bg-yellow-300"
                    >
                        Submit Record
                    </Link>

                    <div className="mt-8 pt-8 border-t-2 border-black border-dotted flex items-center justify-between italic text-sm">
                        <span className="font-bold">Protocol Status</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span>STABLE</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
