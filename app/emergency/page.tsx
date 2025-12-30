import Link from 'next/link';

export default function EmergencyPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 space-y-16 font-mono">
            {/* Alert Header */}
            <section className="bg-red-600 text-white p-8 border-4 border-black brutal-shadow-white animate-pulse">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Emergency Protocol</h1>
                <p className="text-lg font-bold">If this domain is pending seizure or the gateway is unresponsive, initiate redundancy procedures immediately.</p>
            </section>

            {/* Fork Instructions */}
            <section className="space-y-8">
                <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-2">1. Fork the Infrastructure</h2>
                <div className="border-2 border-black p-6 bg-white brutal-shadow space-y-4">
                    <p className="font-bold underline">The truth is not proprietary. The entire engine is open source.</p>
                    <ol className="list-decimal list-inside space-y-4 text-sm leading-relaxed">
                        <li>
                            <strong>Clone the Repository:</strong> Establish a local copy of the code.
                            <code className="block bg-black text-white p-3 mt-2 text-xs break-all">
                                git clone https://github.com/stopitnoah/publicrecord.fyi.git
                            </code>
                        </li>
                        <li>
                            <strong>Mirror the Data:</strong> Use the <code>eject</code> tool to download all metadata and files from the cloud bucket.
                            <code className="block bg-black text-white p-3 mt-2 text-xs">
                                npm install<br />
                                npm run eject -- --download
                            </code>
                            <p className="text-[10px] mt-2 italic text-gray-500">* Requires Supabase environment variables from .env.example</p>
                        </li>
                    </ol>
                </div>
            </section>

            {/* P2P Access */}
            <section className="space-y-8">
                <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-2">2. P2P Recovery Swarm</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="border-2 border-black p-6 bg-yellow-50 brutal-shadow">
                        <h3 className="font-black uppercase mb-4">BitTorrent</h3>
                        <p className="text-xs leading-relaxed">
                            Every record in this registry is cryptographically hashed and indexed in the DHT.
                            If this site goes dark, search local trackers for "publicrecord.fyi" or use saved magnet links.
                        </p>
                    </div>
                    <div className="border-2 border-black p-6 bg-blue-50 brutal-shadow">
                        <h3 className="font-black uppercase mb-4">IPFS</h3>
                        <p className="text-xs leading-relaxed">
                            Content is pinned across decentralized nodes. Retrieve records via any IPFS gateway using the CIDs found in your local <code>submissions.json</code> export.
                        </p>
                    </div>
                </div>
            </section>

            {/* Redeployment */}
            <section className="space-y-8">
                <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-2">3. Redeployment</h2>
                <div className="border-2 border-black p-6 bg-gray-50 brutal-shadow space-y-4">
                    <p className="text-sm">
                        You can bring a new gateway online in minutes. Public servants cannot stop the signal if the community maintains the relay.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border border-black bg-white">
                            <span className="text-xs font-black uppercase block border-b border-black mb-2 text-gray-400 font-mono">Step A</span>
                            <p className="text-[10px] font-bold">Launch new Supabase & Vercel instances</p>
                        </div>
                        <div className="p-4 border border-black bg-white">
                            <span className="text-xs font-black uppercase block border-b border-black mb-2 text-gray-400 font-mono">Step B</span>
                            <p className="text-[10px] font-bold">Import <code>eject_archive/submissions.json</code></p>
                        </div>
                        <div className="p-4 border border-black bg-white">
                            <span className="text-xs font-black uppercase block border-b border-black mb-2 text-gray-400 font-mono">Step C</span>
                            <p className="text-[10px] font-bold">Point <code>RECORDS_DOMAIN</code> to new mirror</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-black text-white p-8 border-4 border-black brutal-shadow-white flex justify-between items-center">
                <p className="font-black uppercase tracking-widest text-xs">Stay Paranoid. Stay Transparent.</p>
                <Link href="/" className="brutal-btn bg-white text-black px-4 py-2 text-xs uppercase font-black">Back to Registry</Link>
            </div>
        </div>
    );
}
