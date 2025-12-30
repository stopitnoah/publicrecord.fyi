import Feed from './components/feed';
import { fetchSubmissions } from './actions/fetch-submissions';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 60;

export default async function Home() {
    const initialData = await fetchSubmissions(0, 20);

    return (
        <div className="space-y-12">
            {/* NEW HIGH-IMPACT HERO */}
            {/* NEW HIGH-IMPACT HERO */}
            <div className="max-w-5xl mx-auto bg-white border-4 border-black p-6 md:p-10 brutal-shadow flex flex-col items-center text-center space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none italic relative z-10">
                    The Mutual <br className="hidden md:block" />
                    <span className="underline decoration-yellow-300 decoration-8 underline-offset-4">Accountability</span> Registry
                </h1>
                <div className="max-w-2xl text-left border-l-4 border-black pl-6 py-2 relative z-10">
                    <p className="text-lg md:text-xl font-bold leading-relaxed italic text-gray-800">
                        If they watch you, you can watch them.
                    </p>
                    <p className="mt-2 text-lg md:text-2xl font-black leading-relaxed uppercase">
                        <span className="bg-black text-white px-2 decoration-clone leading-normal py-1">Public records are our only collective defense against the surveillance state.</span>
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 pt-4 relative z-10">
                    <Link href="/upload" className="brutal-btn px-8 py-3 text-lg uppercase tracking-widest bg-yellow-300 hover:bg-yellow-400">
                        Submit Evidence
                    </Link>
                    <a href="#feed" className="brutal-btn px-8 py-3 text-lg uppercase tracking-widest bg-white hover:bg-gray-50">
                        Explore Archive
                    </a>
                </div>
            </div>

            {/* REALITY CHECK STATS */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-black text-white border-4 border-black p-6 brutal-shadow-white space-y-2">
                    <p className="text-6xl font-black text-yellow-300 leading-none tracking-tighter italic">1 : 521</p>
                    <p className="text-xs font-bold uppercase tracking-widest">Search Ratio</p>
                    <p className="text-sm font-medium opacity-80 leading-snug">For every 1 legitimate search, this system generates 521 automated tracking records on innocent drivers.</p>
                </div>
                <div className="bg-white border-4 border-black p-6 brutal-shadow space-y-2">
                    <p className="text-6xl font-black leading-none tracking-tighter italic italic underline decoration-yellow-400 decoration-8 underline-offset-4">92,000+</p>
                    <p className="text-xs font-bold uppercase tracking-widest">Connected Cameras</p>
                    <p className="text-sm font-medium leading-snug">The current estimated size of the private-public surveillance cloud monitoring American roads.</p>
                </div>
                <div className="bg-white border-4 border-black p-6 brutal-shadow space-y-2">
                    <p className="text-6xl font-black leading-none tracking-tighter italic italic underline decoration-yellow-400 decoration-8 underline-offset-4">30 Million</p>
                    <p className="text-xs font-bold uppercase tracking-widest">Annual Searches</p>
                    <p className="text-sm font-medium leading-snug">The volume of national network queries performed annually with minimal to no oversight.</p>
                </div>
            </div>

            {/* Surveillance in the Wild (WOW Examples) */}
            <div className="space-y-6">
                <div className="flex items-center gap-4 border-b-4 border-black pb-2 mb-8">
                    <div className="w-4 h-4 bg-red-600 animate-pulse"></div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Surveillance in the Wild</h2>
                    <span className="ml-auto bg-red-600 text-white px-2 py-0.5 text-[10px] font-black uppercase">Evidence of Misuse</span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="border-l-4 border-black pl-6 space-y-4">
                        <div className="space-y-1">
                            <span className="font-mono text-xs font-black uppercase text-gray-400">TEXAS • ABORTION TRACKING</span>
                            <h3 className="text-xl font-black uppercase tracking-tight">83,000 Cameras Searched</h3>
                        </div>
                        <p className="text-base font-medium leading-relaxed">
                            Audit logs revealed that a sheriff&apos;s office searched 83,000 cameras nationwide to track a woman suspected of self-managing an abortion. The search occurred thousands of miles outside their jurisdiction.
                        </p>
                    </div>

                    <div className="border-l-4 border-black pl-6 space-y-4">
                        <div className="space-y-1">
                            <span className="font-mono text-xs font-black uppercase text-gray-400">ILLINOIS • ILLEGAL SHARING</span>
                            <h3 className="text-xl font-black uppercase tracking-tight">CBP Violation Prompted Halt</h3>
                        </div>
                        <p className="text-base font-medium leading-relaxed">
                            FOIA records forced the admission that Flock Safety systems were illegally sharing Illinois driver data with federal agencies (CBP), forcing a nationwide halt of federal pilot programs.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 border-2 border-black p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 italic">
                    <div className="text-4xl">⚠️</div>
                    <p className="font-bold leading-relaxed text-sm md:text-base">
                        &quot;When surveillance is one-directional, it is <strong>tyranny</strong>. When it is mutual, it is <strong>transparency</strong>. We exist to flip the camera.&quot;
                    </p>
                </div>
            </div>

            {/* HOW IT WORKS (3-STEP) */}
            <div className="bg-black text-white p-8 md:p-12 brutal-shadow-white space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic underline decoration-yellow-300 decoration-4 underline-offset-8">
                        How It Works
                    </h2>
                    <p className="font-bold text-gray-400">Archiving public truth is a three-step process.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Step 1 */}
                    <div className="relative space-y-4">
                        <div className="text-8xl font-black opacity-20 absolute -top-10 -left-6 select-none">1</div>
                        <h3 className="text-2xl font-black uppercase tracking-tight relative z-10">Locate</h3>
                        <p className="font-medium text-gray-300 leading-relaxed">
                            Find the surveillance infrastructure in your city. Identify the vendors (Flock, Motorola, Rekor) and the agencies operating them.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative space-y-4">
                        <div className="text-8xl font-black opacity-20 absolute -top-10 -left-6 select-none">2</div>
                        <h3 className="text-2xl font-black uppercase tracking-tight relative z-10">Request</h3>
                        <p className="font-medium text-gray-300 leading-relaxed">
                            Use our <Link href="/resources" className="text-yellow-300 underline underline-offset-4">FOIA templates</Link> to legally request the data. By law, these records belong to the public.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative space-y-4">
                        <div className="text-8xl font-black opacity-20 absolute -top-10 -left-6 select-none">3</div>
                        <h3 className="text-2xl font-black uppercase tracking-tight relative z-10">Archive</h3>
                        <p className="font-medium text-gray-300 leading-relaxed">
                            Upload the verified data here. We distribute it across a decentralized network to ensure it can never be deleted or hidden.
                        </p>
                    </div>
                </div>
            </div>

            {/* WHAT TO ARCHIVE */}
            <div className="space-y-8">
                <h2 className="text-3xl font-black uppercase tracking-tighter italic border-b-4 border-black pb-2 inline-block">
                    What to Archive
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="border-4 border-black p-4 brutal-shadow bg-blue-50 space-y-2">
                        <div className="text-2xl">📸</div>
                        <h4 className="font-black uppercase tracking-tight">Camera Logs</h4>
                        <p className="text-xs font-bold leading-snug">Lists of every plate scanned at specific locations. Vital for tracking mutual accountability.</p>
                    </div>
                    <div className="border-4 border-black p-4 brutal-shadow bg-purple-50 space-y-2">
                        <div className="text-2xl">📑</div>
                        <h4 className="font-black uppercase tracking-tight">Policy Manuals</h4>
                        <p className="text-xs font-bold leading-snug">Standard Operating Procedures. See the rules they follow and the rules they break.</p>
                    </div>
                    <div className="border-4 border-black p-4 brutal-shadow bg-green-50 space-y-2">
                        <div className="text-2xl">💰</div>
                        <h4 className="font-black uppercase tracking-tight">Contracts</h4>
                        <p className="text-xs font-bold leading-snug">Service agreements between cities and vendors like Flock or Motorola.</p>
                    </div>
                    <div className="border-4 border-black p-4 brutal-shadow bg-red-50 space-y-2">
                        <div className="text-2xl">🕵️</div>
                        <h4 className="font-black uppercase tracking-tight">Audit Logs</h4>
                        <p className="text-xs font-bold leading-snug">Records of WHO searched WHAT. The primary tool for identifying surveillance abuse.</p>
                    </div>
                </div>
            </div>

            {/* Washington Ruling Banner (Updated) */}
            <div className="bg-yellow-300 border-4 border-black p-6 flex flex-col md:flex-row items-center justify-between gap-6 brutal-shadow">
                <div className="flex items-center gap-4">
                    <span className="text-4xl">⚖️</span>
                    <div>
                        <p className="font-black uppercase tracking-tight text-lg leading-none mb-1">Legal Precedent: DATA IS PUBLIC</p>
                        <p className="font-bold text-sm">
                            Washington State court ruled ALPR data = public records (Nov 2024). You have the RIGHT to see what they see.
                        </p>
                    </div>
                </div>
                <Link href="/resources" className="brutal-btn bg-white px-6 py-2 text-xs font-black uppercase hover:bg-gray-50 shrink-0">
                    Get FOIA Templates →
                </Link>
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
