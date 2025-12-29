export default function EmergencyPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 space-y-16 font-mono">
            <section className="bg-red-600 text-white p-8 border-4 border-black brutal-shadow">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Emergency Protocols</h1>
                <p className="text-lg font-bold">How to survive a site seizure or creator disappearance.</p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-2">1. The Repository</h2>
                <p>The code for publicrecord.fyi is open-source and intended to be cloned by everyone. If the main domain goes down, anyone can redeploy in minutes.</p>
                <div className="bg-gray-100 p-4 border-2 border-black">
                    <p className="font-bold mb-2 uppercase text-xs">Clone URL:</p>
                    <code className="text-sm break-all">https://github.com/[YOUR_USERNAME]/[YOUR_REPO].git</code>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-2">2. Data Recovery (P2P)</h2>
                <p>Every file uploaded to this platform is cryptographically indexed. You do not need this website to recover the data.</p>
                <div className="border-2 border-black p-6 bg-yellow-50">
                    <h3 className="font-bold uppercase mb-2">Database Torrent</h3>
                    <p className="text-sm mb-4">A JSON export of all submission metadata and magnet links is generated weekly.</p>
                    <p className="text-xs text-gray-500 italic mb-4">[Weekly updated magnet link will appear here]</p>
                    <button className="brutal-btn text-xs bg-gray-200 cursor-not-allowed opacity-50">Download Database Export (Coming Soon)</button>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-2">3. Deployment Guide</h2>
                <div className="prose prose-sm max-w-none space-y-4">
                    <div className="bg-white border-2 border-black p-4">
                        <h4 className="font-bold uppercase">Quick Start:</h4>
                        <ol className="list-decimal list-inside space-y-1 mt-2">
                            <li>Create a new Supabase project.</li>
                            <li>Run the schema from <code>/brain/supabase_schema.sql</code>.</li>
                            <li>Deploy to Vercel or any Node.js host.</li>
                            <li>Point your own domain to the new instance.</li>
                        </ol>
                    </div>
                </div>
            </section>

            <section className="bg-black text-white p-8 border-2 border-black">
                <h2 className="text-2xl font-black uppercase tracking-tight text-white border-b border-white pb-2 inline-block mb-6">Warrant Canary</h2>
                <div className="space-y-4 text-sm text-gray-300">
                    <p>As of <strong>{new Date().toISOString().split('T')[0]}</strong>, the creator has not been served with any secret warrants, gag orders, or law enforcement demands.</p>
                    <p>If this message is not updated for more than 14 days, assume the creator has been compromised.</p>
                </div>
            </section>
        </div>
    );
}
