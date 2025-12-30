'use client'
import Link from 'next/link';

export default function MoneroTicker() {
    return (
        <div className="border-t-2 border-black bg-white p-4 font-mono">
            <div className="flex justify-center">
                <Link
                    href="/support"
                    className="brutal-btn px-8 py-2 text-xs uppercase tracking-widest bg-yellow-300 font-black hover:bg-yellow-400"
                >
                    SUPPORT
                </Link>
            </div>
        </div>
    );
}
