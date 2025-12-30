import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export const revalidate = 60;

async function getStats() {
    const { count } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true });

    return {
        submissions: count || 0,
    };
}

export default async function SupportPage() {
    const stats = await getStats();

    return (
        <div className="max-w-3xl mx-auto py-12 space-y-16">
            <section className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none border-b-8 border-black pb-6">
                    Support<br />The Mission
                </h1>
                <p className="text-lg font-medium">
                    publicrecord.fyi is a self-funded project. Your donations help cover hosting, bandwidth, and legal defense.
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-12">
                <section className="space-y-6">
                    <h2 className="text-3xl font-black uppercase tracking-tight">Donate Monero</h2>
                    <div className="bg-yellow-50 p-6 border-2 border-black space-y-4 brutal-shadow">
                        <p className="font-bold">Because privacy matters, we only accept Monero (XMR).</p>

                        <div className="space-y-1">
                            <p className="text-xs font-mono uppercase font-bold text-gray-500">Address</p>
                            <div className="bg-white border-2 border-black p-2 font-mono text-[10px] break-all select-all">
                                488uLAQnFGvQ9LJMMqQzjRgVcvZVSRYgA2v7ZdiygQDmC6frLWwEzTj525puRSve8VDvBg8gdXF1V6woP6qhpm87FAaSoxY
                            </div>
                        </div>

                        <div className="flex justify-center py-4 bg-white border-2 border-black relative min-h-[300px]">
                            <Image
                                src="/Monero_QR_code.png"
                                alt="Monero Donation QR Code"
                                width={300}
                                height={300}
                                className="object-contain px-2"
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black uppercase tracking-tight">Transparency</h2>
                    <div className="bg-gray-100 p-6 border-2 border-black font-mono text-sm space-y-6 brutal-shadow">
                        <div>
                            <h4 className="font-bold border-b border-black mb-2 uppercase">Funding Status</h4>
                            <div className="flex justify-between py-1">
                                <span>Total donated:</span>
                                <span className="font-bold">0.00 XMR</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span>Monthly costs:</span>
                                <span>$25-50 + Legal</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span>Current runway:</span>
                                <span>Infinite (Self-funded)</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold border-b border-black mb-2 uppercase">Impact</h4>
                            <div className="flex justify-between py-1">
                                <span>Submissions:</span>
                                <span className="font-bold">{stats.submissions}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span>Active Mirrors:</span>
                                <span>12</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="bg-black text-white p-8 md:p-12 space-y-6 brutal-shadow-white mt-12">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Why Just Monero?</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4 text-gray-200">
                    <p>
                        Credit cards and banks are surveillance tools. They track who you support, when, and how much.
                    </p>
                    <p>
                        Monero is the only digital currency that functions like cash: private, untraceable, and censorship-resistant. If we&apos;re going to fight for privacy, we should use tools that respect it.
                    </p>
                </div>
            </section>
        </div>
    );
}
