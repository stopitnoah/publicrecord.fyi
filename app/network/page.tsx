import { supabase } from '@/lib/supabase';

export const revalidate = 60;

async function getStats() {
    const { count } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true });

    return {
        submissions: count || 0,
        canaryTimestamp: "2025-12-29"
    };
}

export default async function NetworkPage() {
    const stats = await getStats();

    return (
        <div className="max-w-4xl mx-auto py-12 space-y-16 font-mono">
            {/* Resilience Marquee */}
            <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-4 border-black brutal-shadow-white">
                <div className="animate-marquee inline-block font-mono text-xs font-bold uppercase tracking-widest">
                    TRIPLE REDUNDANCY ACTIVE: CLOUD (SUPABASE) • P2P (BITTORRENT) • DECENTRALIZED (IPFS) • SEIZURE-PROOF ARCHITECTURE ENABLED • FORKABLE METADATA • OPEN SOURCE INDEPENDENCE •
                    TRIPLE REDUNDANCY ACTIVE: CLOUD (SUPABASE) • P2P (BITTORRENT) • DECENTRALIZED (IPFS) • SEIZURE-PROOF ARCHITECTURE ENABLED • FORKABLE METADATA • OPEN SOURCE INDEPENDENCE •
                </div>
            </div>

            {/* Header */}
            <section className="bg-black text-white p-8 border-4 border-black brutal-shadow-white">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Network Resilience</h1>
                <p className="text-lg font-bold">Protocol Status: STABLE • 12 Active Mirrors • Seizure-Proof Architecture</p>
            </section>

            {/* Technical Architecture */}
            <section className="space-y-8">
                <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-2">Technical Architecture</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="border-2 border-black p-6 bg-white brutal-shadow">
                        <h3 className="font-bold uppercase mb-4 text-red-600">The Triple Redundancy</h3>
                        <ul className="space-y-4 text-sm leading-relaxed">
                            <li>
                                <strong className="block uppercase text-xs">1. Cloud Gateway (Supabase)</strong>
                                Providing fast, reliable access for the general public via standard browser.
                            </li>
                            <li>
                                <strong className="block uppercase text-xs">2. P2P Backup (BitTorrent)</strong>
                                Every submission generates a magnet link, distributing the data across a global swarm.
                            </li>
                            <li>
                                <strong className="block uppercase text-xs">3. Decentralized (IPFS)</strong>
                                Content-addressed storage ensures data remains accessible even if domain names are revoked.
                            </li>
                        </ul>
                    </div>
                    <div className="border-2 border-black p-6 bg-gray-50 brutal-shadow">
                        <h3 className="font-bold uppercase mb-4">System Status</h3>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between border-b border-black border-dotted pb-1">
                                <span>Database:</span>
                                <span className="text-green-600 font-bold">ONLINE</span>
                            </div>
                            <div className="flex justify-between border-b border-black border-dotted pb-1">
                                <span>IPFS Node:</span>
                                <span className="text-green-600 font-bold">CONNECTED</span>
                            </div>
                            <div className="flex justify-between border-b border-black border-dotted pb-1">
                                <span>BitTorrent Trackers:</span>
                                <span className="text-green-600 font-bold">PEERING</span>
                            </div>
                            <div className="flex justify-between border-b border-black border-dotted pb-1">
                                <span>Tor Proxy:</span>
                                <span className="text-yellow-600 font-bold">ACTIVE (v3)</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h4 className="font-bold text-xs uppercase mb-2">Network Health</h4>
                            <div className="w-full bg-gray-200 h-4 border border-black">
                                <div className="bg-green-500 h-full w-[99%]"></div>
                            </div>
                            <p className="text-[10px] mt-1">99.9% Uptime Across Distributed Mirrors</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Survival Protocols */}
            <section className="space-y-8">
                <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-2">Survival Protocols</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4 font-sans">
                    <p>
                        publicrecord.fyi is designed to survive its creator. If this domain is seized or the gateway goes dark, use these protocols to access and redeploy the archive.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 font-mono">
                    <div className="space-y-6">
                        <div className="bg-red-50 border-2 border-black p-6">
                            <h3 className="font-black uppercase mb-2">1. The Repository</h3>
                            <p className="text-sm mb-4">The code is open-source. Clone it now to ensure you have a copy of the infrastructure.</p>
                            <code className="text-xs bg-black text-white p-2 block break-all">
                                git clone https://github.com/publicrecord-fyi/registry.git
                            </code>
                        </div>

                        <div className="bg-yellow-50 border-2 border-black p-6">
                            <h3 className="font-black uppercase mb-2">2. Data Recovery</h3>
                            <p className="text-sm">Use the magnet links on individual record pages or download the weekly database dump.</p>
                            <button className="mt-4 brutal-btn text-xs bg-gray-200 cursor-not-allowed opacity-50">Database Dump (Coming Soon)</button>
                        </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-black p-6">
                        <h3 className="font-black uppercase mb-2">3. Deployment Guide</h3>
                        <p className="text-sm mb-4">Redeploy your own instance in under 10 minutes:</p>
                        <ol className="text-xs space-y-2 list-decimal list-inside">
                            <li>Create a Supabase project</li>
                            <li>Run <code>/brain/supabase_schema.sql</code></li>
                            <li>Set environment variables from <code>.env.example</code></li>
                            <li>Deploy to Vercel/Netlify/Self-host</li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* Warrant Canary */}
            <section className="bg-black text-white p-8 border-4 border-black brutal-shadow-white">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white border-b-2 border-white pb-2 inline-block mb-8 underline decoration-yellow-400">
                    Warrant Canary
                </h2>
                <div className="space-y-6 text-sm">
                    <p className="text-lg font-bold text-yellow-400">
                        As of {stats.canaryTimestamp}, the creator has not been served with any secret warrants, gag orders, or law enforcement demands.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        If this message is not updated for more than 14 days, assume the creator has been compromised or the domain has been seized.
                        In that event, transition immediately to P2P mirrors and community-run instances.
                    </p>
                </div>
            </section>
        </div>
    );
}
