import Feed from './components/feed';
import { fetchSubmissions } from './actions/fetch-submissions';
import Link from 'next/link';

export const revalidate = 60;

export default async function Home() {
    const initialData = await fetchSubmissions(0, 20);

    return (
        <div className="space-y-12">
            {/* Resilience Marquee */}
            <div className="bg-black text-white py-1 overflow-hidden whitespace-nowrap border-t-2 border-b-2 border-black">
                <div className="animate-marquee inline-block font-mono text-[10px] font-bold uppercase tracking-widest">
                    TRIPLE REDUNDANCY ACTIVE: CLOUD (SUPABASE) • P2P (BITTORRENT) • DECENTRALIZED (IPFS) • SEIZURE-PROOF ARCHITECTURE ENABLED • FORKABLE METADATA • OPEN SOURCE INDEPENDENCE •
                    TRIPLE REDUNDANCY ACTIVE: CLOUD (SUPABASE) • P2P (BITTORRENT) • DECENTRALIZED (IPFS) • SEIZURE-PROOF ARCHITECTURE ENABLED • FORKABLE METADATA • OPEN SOURCE INDEPENDENCE •
                </div>
            </div>
            {/* Washington Ruling Banner */}
            <div className="bg-yellow-300 border-4 border-black p-4 flex flex-col md:flex-row items-center justify-between gap-4 brutal-shadow">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">⚖️</span>
                    <p className="font-bold text-sm md:text-base">
                        <strong>Legal Precedent:</strong> Washington State court ruled ALPR data = public records (Nov 2024)
                    </p>
                </div>
                <Link href="/resources" className="text-xs font-bold underline shrink-0 hover:text-gray-700">
                    Read Ruling & Templates →
                </Link>
            </div>

            {/* Hero with Greenwald Quote */}
            <div className="border-2 border-black p-6 md:p-10 brutal-shadow bg-white relative overflow-hidden">
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif italic leading-relaxed max-w-3xl mb-6">
                    &quot;We are supposed to know nearly everything about them. That is why they are called <strong className="not-italic">public servants</strong>.<br /><br />
                    They on the other hand are supposed to know nearly nothing about us. That is why we are called <strong className="not-italic">private citizens</strong>.&quot;
                </blockquote>
                <p className="font-mono text-sm text-gray-600 mb-8">— Glenn Greenwald</p>

                <p className="text-lg font-bold mb-8 max-w-2xl">
                    publicrecord.fyi <span className="bg-black text-white px-2">inverts the surveillance paradigm.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="/upload" className="brutal-btn text-center uppercase tracking-widest">
                        Submit Record
                    </a>
                    <a href="/resources" className="px-4 py-2 font-bold hover:underline self-center uppercase text-sm border-2 border-black hover:bg-gray-100">
                        FOIA Templates
                    </a>
                </div>
            </div>

            {/* It's Working Section */}
            <div className="border-2 border-black p-6 md:p-8 bg-green-50 space-y-4">
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                    <span>✓</span> It&apos;s Working
                </h2>
                <p className="font-medium leading-relaxed">
                    After Washington&apos;s court ruling, a county sheriff <strong>IMMEDIATELY pulled the plug on all Flock cameras</strong> when he realized citizens could track public officials.
                </p>
                <blockquote className="border-l-4 border-black pl-4 italic text-gray-700">
                    &quot;I thought if you weren&apos;t doing anything wrong, you didn&apos;t have to worry about who was watching you. I guess that only applies to private citizens.&quot;
                </blockquote>
                <p className="text-sm font-bold">Your submissions create accountability pressure.</p>
            </div>

            {/* Feed */}
            <div id="feed" className="pt-8">
                <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-2">
                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Recent Submissions</h3>
                    <span className="font-mono text-xs md:text-sm animate-pulse">● LIVE</span>
                </div>
                <Feed initialData={initialData} />
            </div>
        </div>
    );
}
