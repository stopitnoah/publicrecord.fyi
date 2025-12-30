import Feed from './components/feed';
import { fetchSubmissions } from './actions/fetch-submissions';
import Link from 'next/link';

export const revalidate = 60;

export default async function Home() {
    const initialData = await fetchSubmissions(0, 20);

    return (
        <div className="space-y-12">
            {/* NEW HIGH-IMPACT HERO */}
            <div className="bg-white border-4 border-black p-8 md:p-12 brutal-shadow flex flex-col items-center text-center space-y-6">
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none italic decoration-yellow-400 underline decoration-8 underline-offset-4">
                    The Decentralized <br className="hidden md:block" /> Public Record Registry
                </h1>
                <p className="max-w-3xl text-lg md:text-2xl font-bold leading-relaxed italic border-l-4 border-black pl-4">
                    A seizure-proof archive of verified public evidence. <br />
                    <span className="bg-black text-white px-2 not-italic">Protecting transparency through permanent architecture.</span>
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <a href="/upload" className="brutal-btn px-8 py-3 text-lg uppercase tracking-widest bg-yellow-300">
                        Submit Evidence
                    </a>
                    <a href="#feed" className="BRUTAL-btn px-8 py-3 text-lg uppercase tracking-widest bg-white">
                        Explore Archive
                    </a>
                    <Link href="/resources" className="px-8 py-3 font-bold uppercase hover:underline border-2 border-black hover:bg-gray-100 flex items-center">
                        FOIA Templates
                    </Link>
                </div>
            </div>

            {/* Washington Ruling Banner */}
            <div className="bg-yellow-300 border-4 border-black p-4 flex flex-col md:flex-row items-center justify-between gap-4 brutal-shadow">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">⚖️</span>
                    <p className="font-bold text-sm md:text-base">
                        <strong className="uppercase">Legal Precedent:</strong> Washington State court ruled ALPR data = public records (Nov 2024)
                    </p>
                </div>
                <Link href="/resources" className="text-xs font-bold underline shrink-0 hover:text-gray-700">
                    Read Ruling & Templates →
                </Link>
            </div>

            {/* It's Working Section (Proof) */}
            <div className="border-2 border-black p-6 md:p-8 bg-green-50 space-y-4 brutal-shadow">
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                    <span>✓</span> Proof of Impact
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <p className="font-medium leading-relaxed">
                        After the Washington court ruling, a county sheriff <strong>IMMEDIATELY pulled the plug on all Flock cameras</strong> when he realized citizens could now track his department&apos;s movements as easily as they tracked theirs.
                    </p>
                    <div className="border-l-4 border-black pl-6 space-y-4">
                        <blockquote className="italic text-gray-700 border-b border-black border-dotted pb-2">
                            &quot;I thought if you weren&apos;t doing anything wrong, you didn&apos;t have to worry about who was watching you. I guess that only applies to private citizens.&quot;
                        </blockquote>
                        <p className="text-sm font-bold uppercase tracking-tighter">Radical transparency forces accountability.</p>
                    </div>
                </div>
            </div>

            {/* Feed */}
            <div id="feed" className="pt-8">
                <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-2">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-gray-400">The Registry</p>
                        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Recent Submissions</h3>
                    </div>
                    <span className="font-mono text-xs md:text-sm animate-pulse">● LIVE DATASTREAM</span>
                </div>
                <Feed initialData={initialData} />
            </div>
        </div>
    );
}
