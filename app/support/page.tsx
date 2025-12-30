import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { getMoneroStats } from '../actions/get-monero-stats';

export const revalidate = 60;

export default async function SupportPage() {
    const stats = await getMoneroStats();
    const displayAddress = stats.address === 'Not Configured'
        ? '488uLAQnFGvQ9LJMMqQzjRgVcvZVSRYgA2v7ZdiygQDmC6frLWwEzTj525puRSve8VDvBg8gdXF1V6woP6qhpm87FAaSoxY' // Fallback to provided
        : stats.address;

    return (
        <div className="max-w-3xl mx-auto py-12 space-y-16">
            <section className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none border-b-8 border-black pb-6">
                    Support<br />The Mission
                </h1>
                <p className="text-lg font-medium italic underline decoration-yellow-300 decoration-4">
                    publicrecord.fyi is a self-funded project. Your contributions fund P2P infrastructure and legal defense.
                </p>
            </section>

            <div className="grid md:grid-cols-1 gap-12">
                <section className="space-y-6">
                    <h2 className="text-3xl font-black uppercase tracking-tight">Donate Monero (XMR)</h2>
                    <div className="bg-white p-8 border-4 border-black space-y-8 brutal-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 font-black text-9xl leading-none select-none pointer-events-none">
                            XMR
                        </div>

                        <p className="font-bold text-xl leading-snug max-w-md">
                            Privacy is a prerequisite for freedom. We only accept <span className="bg-yellow-300 px-1">Monero</span> to protect your financial history.
                        </p>

                        <div className="space-y-2">
                            <p className="text-xs font-mono uppercase font-black text-gray-400 tracking-widest">Public Contribution Address</p>
                            <div className="bg-gray-50 border-2 border-black p-3 font-mono text-[11px] break-all select-all brutal-shadow-small">
                                {displayAddress}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-6 border-2 border-black">
                            <div className="bg-white border-2 border-black p-2 brutal-shadow-small shrink-0">
                                <Image
                                    src="/Monero_QR_code.png"
                                    alt="Monero Donation QR Code"
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>
                            <div className="prose prose-sm font-medium italic text-gray-600">
                                <p>
                                    Scan this code to contribute instantly. Your support ensures the survival of this archive against seizure and legal pressure.
                                </p>
                                <p className="mt-2 text-[10px] font-mono opacity-50">
                                    URI: monero:{displayAddress}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="bg-black text-white p-8 md:p-12 space-y-6 brutal-shadow-white mt-12">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white underline decoration-yellow-300">Why Only Monero?</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4 text-gray-200">
                    <p>
                        Credit cards, banks, and transparent blockchains are surveillance tools. They create a permanent, searchable record of your associations and beliefs.
                    </p>
                    <p>
                        Monero is the only digital currency that functions like cash: private by default, untraceable, and censorship-resistant. We use it because we practice what we preach.
                    </p>
                </div>
            </section>
        </div>
    );
}
