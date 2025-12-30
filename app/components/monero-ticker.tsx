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

    if (!stats) return <div className="font-mono text-[10px] animate-pulse">CONNECTING TO XMR NETWORK...</div>;

    return (
        <div className="border-t-2 border-black bg-white p-4 font-mono">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-500 uppercase font-bold">XMR Price</span>
                        <span className="font-black">${stats.price.toLocaleString()} USD</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-500 uppercase font-bold">Transparency Balance</span>
                        <span className="font-black text-red-600">{stats.balance}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                        onClick={() => setShowPay(!showPay)}
                        className="brutal-btn px-4 py-1 text-[10px] uppercase tracking-widest bg-yellow-300"
                    >
                        {showPay ? 'Close' : 'Support Resilience (XMR)'}
                    </button>
                    <div className="hidden md:block text-[9px] text-gray-400 max-w-[200px] leading-tight italic">
                        All contributions fund P2P infrastructure and legal defense.
                    </div>
                </div>
            </div>

            {showPay && (
                <div className="mt-4 p-4 border-2 border-black bg-gray-50 flex flex-col md:flex-row gap-6 items-center animate-in slide-in-from-bottom-2">
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
