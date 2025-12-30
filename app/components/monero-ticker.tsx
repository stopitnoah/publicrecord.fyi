'use client'
import { useEffect, useState } from 'react';
import { getMoneroStats } from '../actions/get-monero-stats';
import QRCode from './qr-code';

export default function MoneroTicker() {
    const [stats, setStats] = useState<{ price: number, balance: string, address: string } | null>(null);
    const [showPay, setShowPay] = useState(false);

    useEffect(() => {
        getMoneroStats().then(setStats);
    }, []);

    if (!stats) return null;

    return (
        <div className="border-t-2 border-black bg-white p-4 font-mono">
            <div className="flex justify-center">
                <button
                    onClick={() => setShowPay(!showPay)}
                    className="brutal-btn px-8 py-2 text-xs uppercase tracking-widest bg-yellow-300 font-black"
                >
                    {showPay ? 'Hide Support Options' : 'Support The Mission (XMR)'}
                </button>
            </div>

            {showPay && (
                <div className="max-w-xl mx-auto mt-4 p-4 border-2 border-black bg-gray-50 flex flex-col md:flex-row gap-6 items-center animate-in slide-in-from-bottom-2">
                    <QRCode data={stats.address} />
                    <div className="space-y-2 flex-grow">
                        <p className="text-xs font-bold uppercase">Public Donation Address:</p>
                        <code className="block p-2 bg-white border border-black text-[10px] break-all select-all">
                            {stats.address}
                        </code>
                        <p className="text-[10px] text-gray-600">
                            <strong>Why Monero?</strong> XMR is the only currency that protects the financial privacy of whistleblowers and donors. We do not accept traceable assets.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
