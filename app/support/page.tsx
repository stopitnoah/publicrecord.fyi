import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { getMoneroStats } from '../actions/get-monero-stats';
import { createCheckoutSession } from '../actions/create-checkout-session';

export const revalidate = 60;

export default async function SupportPage() {
    let stats = { address: 'Not Configured', price: 0 };
    try {
        stats = await getMoneroStats();
    } catch (e) {
        console.error('SupportPage render error:', e);
    }

    const displayAddress = stats.address === 'Not Configured' || !stats.address || stats.address === 'N/A'
        ? '488uLAQnFGvQ9LJMMqQzjRgVcvZVSRYgA2v7ZdiygQDmC6frLWwEzTj525puRSve8VDvBg8gdXF1V6woP6qhpm87FAaSoxY'
        : stats.address;

    return (
        <div className="max-w-4xl mx-auto py-12 space-y-16">
            <section className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none border-b-8 border-black pb-6">
                    Support<br />The Mission
                </h1>
                <p className="text-xl font-bold italic underline decoration-yellow-300 decoration-4 max-w-2xl text-balance">
                    Redundant, decentralized infrastructure isn&apos;t free. Your contributions fund hosting, global mirroring, and legal defense.
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Credit Card Section */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-black uppercase tracking-tight">Standard Contribution</h2>
                    <div className="bg-white p-8 border-4 border-black space-y-6 brutal-shadow relative flex flex-col h-full">
                        <div className="flex items-center gap-4 text-gray-400">
                            <span className="font-mono text-xs font-bold uppercase tracking-widest">Credit / Debit / Apple Pay</span>
                        </div>

                        <p className="font-bold text-lg leading-snug">
                            Fast and direct. Suitable for public supporters who value ease of use.
                        </p>

                        <div className="space-y-4 mt-auto">
                            <form action={createCheckoutSession} className="space-y-4">
                                <div>
                                    <label htmlFor="amount" className="block text-xs font-bold uppercase tracking-widest mb-1">Custom Amount ($)</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        defaultValue="10"
                                        min="1"
                                        step="1"
                                        className="w-full border-2 border-black p-2 font-mono text-lg focus:outline-none focus:bg-yellow-50"
                                    />
                                </div>
                                <button type="submit" className="w-full brutal-btn bg-yellow-300 text-black text-center py-4 uppercase font-black tracking-widest hover:bg-yellow-400 transition-colors">
                                    Proceed to Payment
                                </button>
                            </form>
                            <p className="text-[10px] font-mono text-gray-500 italic">
                                * Payments processed via encrypted gateway.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Monero Section */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-black uppercase tracking-tight">Private Contribution</h2>
                    <div className="bg-white p-8 border-4 border-black space-y-6 brutal-shadow relative flex flex-col h-full">
                        <div className="flex items-center gap-2 text-yellow-600">
                            <span className="font-mono text-xs font-bold uppercase tracking-widest">Monero (XMR)</span>
                        </div>

                        <p className="font-bold text-lg leading-snug">
                            Zero traceability. Recommended for high-risk supporters and privacy advocates.
                        </p>

                        <div className="space-y-2">
                            <div className="bg-gray-50 border-2 border-black p-3 font-mono text-[10px] break-all select-all brutal-shadow-small">
                                {displayAddress}
                            </div>
                        </div>

                        <div className="mt-auto flex gap-4 items-center bg-gray-50 p-4 border-2 border-black">
                            <div className="bg-white border-2 border-black p-1 brutal-shadow-small shrink-0">
                                <Image
                                    src="/Monero_QR_code.png"
                                    alt="Monero Donation QR Code"
                                    width={100}
                                    height={100}
                                    className="object-contain"
                                />
                            </div>
                            <div className="text-[10px] font-medium italic text-gray-600">
                                Scan to contribute privately. <br />
                                monero:{displayAddress.substring(0, 10)}...
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="bg-black text-white p-8 md:p-12 space-y-6 brutal-shadow-white mt-12">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white underline decoration-yellow-300">Resilience Philosophy</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4 text-gray-200">
                    <p>
                        Every dollar and XMR received is distributed across our network of 12 active mirrors to ensure this registry outlives any single server or domain.
                    </p>
                    <p>
                        We use <span className="text-yellow-300 font-bold uppercase">adversarial architecture</span>. By supporting this mission, you are not just funding a website; you are funding a permanent, un-censorable public utility.
                    </p>
                </div>
            </section>
        </div>
    );
}
