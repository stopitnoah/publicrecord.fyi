import { supabase } from '@/lib/supabase';
import { headers } from 'next/headers';

export const revalidate = 60;

async function getStats() {
    // We can fetch the count of submissions
    const { count } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true });

    return {
        submissions: count || 0,
        canaryDate: new Date().toISOString().split('T')[0], // For now, dynamic to today for "freshness" or hardcoded if manual update preferred. 
        // Real canary usually requires manual intervention to prove life. 
        // Setting it to a fixed date to simulate a real canary that ages.
        canaryTimestamp: "2025-12-29"
    };
}

export default async function AboutPage() {
    const stats = await getStats();
    const canaryAgeDays = Math.floor((new Date().getTime() - new Date(stats.canaryTimestamp).getTime()) / (1000 * 3600 * 24));

    let canaryColor = "bg-green-100 text-green-800 border-green-500";
    if (canaryAgeDays > 7) canaryColor = "bg-yellow-100 text-yellow-800 border-yellow-500";
    if (canaryAgeDays > 14) canaryColor = "bg-red-100 text-red-800 border-red-500";

    return (
        <div className="max-w-3xl mx-auto py-12 space-y-16">

            {/* Header */}
            <section className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none border-b-8 border-black pb-6">
                    About<br />publicrecord.fyi
                </h1>
            </section>

            {/* The Problem */}
            <section className="space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tight decoration-4">The Problem</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4">
                    <p>
                        I've been online since I was 7 years old—far before I could comprehend or consent to what that meant.
                        Every click, every search, every awkward moment of growing up: captured, stored, analyzed. My privacy has been effectively violated my entire life by surveillance systems I never agreed to and couldn't escape.
                    </p>
                    <p>
                        Automatic License Plate Reader (ALPR) systems are just one piece of this apparatus. They photograph every license plate that passes by, creating a detailed map of everyone's movements. This data gets stored for months or years. It tracks where you go, when you go there, and who you're with.
                    </p>
                    <p className="font-bold border-l-4 border-black pl-4 py-2 bg-gray-50">
                        This surveillance doesn't make us safer. It makes us monitored.
                    </p>
                </div>
            </section>

            {/* The Response */}
            <section className="space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tight">The Response</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4">
                    <p>
                        Public officials fund, control, and expand these surveillance systems. But here's the thing: they're tracked by the same systems.
                    </p>
                    <p>
                        ALPR data is a public record. Under Freedom of Information Act (FOIA) laws, this data is legally accessible to any citizen who requests it.
                    </p>
                    <p>
                        publicrecord.fyi crowdsources and aggregates these public records. If a city council member votes to expand ALPR networks, their own movements become part of the public database. If a police chief oversees surveillance infrastructure, their vehicle's location history is a public record.
                    </p>
                </div>
            </section>

            {/* The Philosophy */}
            <section className="space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tight">The Philosophy</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4">
                    <p>
                        I'm not trying to hurt anyone. I'm trying to fix this.
                    </p>
                    <p>
                        The surveillance apparatus will never be dismantled while those in power are insulated from its effects. When officials experience the same loss of privacy they impose on citizens, the political calculus changes.
                    </p>
                    <p>
                        This isn't about revenge or vindictiveness. It's about creating alignment. If surveillance is acceptable for innocent citizens, it's acceptable for public officials. If it's unacceptable for officials, it should be unacceptable for everyone.
                    </p>
                    <p>
                        Public records are public records. This site doesn't hack, leak, or steal anything. We simply aggregate what government agencies have already deemed public information.
                    </p>
                </div>
            </section>

            {/* How It Works */}
            <section className="space-y-8 bg-black text-white p-8 brutal-shadow-white">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white border-b-2 border-white pb-2 inline-block">How It Works</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold uppercase mb-4 text-yellow-300">For Users</h3>
                        <ul className="space-y-3 font-mono text-sm leading-relaxed">
                            <li>→ Anyone can upload ALPR data or other public records obtained via FOIA</li>
                            <li>→ All submissions are user-submitted and unverified (marked as "alleged")</li>
                            <li>→ Community voting surfaces the most relevant submissions</li>
                            <li>→ All data is preserved via BitTorrent, ensuring it can't be deleted</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold uppercase mb-4 text-yellow-300">Technical Architecture</h3>
                        <ul className="space-y-3 font-mono text-sm leading-relaxed">
                            <li>→ Primary hosting via Supabase (fast, reliable)</li>
                            <li>→ Every file automatically creates a BitTorrent backup</li>
                            <li>→ If this site is seized or taken down, it auto-switches to pure peer-to-peer mode</li>
                            <li>→ Anyone can fork the code and redeploy in under 10 minutes</li>
                            <li>→ Zero data loss, even if I disappear</li>
                        </ul>
                        <p className="mt-4 font-bold border-t border-white pt-4">This site is designed to survive its creator.</p>
                    </div>
                </div>
            </section>

            {/* The Goal */}
            <section className="space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tight">The Goal</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4">
                    <p className="text-2xl font-black">I want them to stop spying on me. On all of us.</p>
                    <p>The path is simple:</p>
                    <ol className="list-decimal list-inside space-y-2 font-bold ml-4 marker:font-black">
                        <li>Make surveillance mutual rather than one-directional</li>
                        <li>Create political pressure from those with power to change the system</li>
                        <li>Dismantle the surveillance apparatus entirely</li>
                    </ol>
                    <p>
                        When that happens, this site becomes obsolete. That's the goal. <br />
                        Until then, if you're a public official who values privacy: fight to dismantle the surveillance state. That's the only way this stops.
                    </p>
                </div>
            </section>

            {/* What This Is Not */}
            <section className="space-y-6 border-2 border-black p-6">
                <h2 className="text-3xl font-black uppercase tracking-tight">What This Is Not</h2>
                <ul className="space-y-4 font-medium">
                    <li className="flex gap-4">
                        <span className="font-black text-red-600 uppercase shrink-0">Not Doxxing</span>
                        <span>Doxxing reveals private information. This aggregates public records that government agencies have already released.</span>
                    </li>
                    <li className="flex gap-4">
                        <span className="font-black text-red-600 uppercase shrink-0">Not Hacking</span>
                        <span>Every piece of data here was legally obtained through official government channels.</span>
                    </li>
                    <li className="flex gap-4">
                        <span className="font-black text-red-600 uppercase shrink-0">Not Harassment</span>
                        <span>Harassment involves targeting individuals with threatening behavior. This is transparency work, protected by the First Amendment.</span>
                    </li>
                    <li className="flex gap-4">
                        <span className="font-black text-red-600 uppercase shrink-0">Not Partisan</span>
                        <span>Surveillance is not a left vs. right issue. It affects everyone, regardless of political affiliation.</span>
                    </li>
                </ul>
            </section>

            {/* How You Can Help / Transparency */}
            <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-6">
                    <h2 className="text-3xl font-black uppercase tracking-tight">Transparency</h2>
                    <div className="bg-gray-100 p-6 border-2 border-black font-mono text-sm space-y-4">
                        <div>
                            <h4 className="font-bold border-b border-black mb-2 uppercase">Funding Status</h4>
                            <div className="flex justify-between">
                                <span>Total donated:</span>
                                <span className="font-bold">0.00 XMR</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Monthly costs:</span>
                                <span>$25-50 + Legal Fund</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Current runway:</span>
                                <span>Infinite (Self-funded)</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold border-b border-black mb-2 uppercase">System Status</h4>
                            <div className="flex justify-between">
                                <span>Total submissions:</span>
                                <span className="font-bold">{stats.submissions}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Active seeders:</span>
                                <span>0</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Last canary:</span>
                                <span>{stats.canaryTimestamp}</span>
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 border-2 ${canaryColor} font-mono text-xs`}>
                        <p className="font-bold uppercase mb-1">Warrant Canary</p>
                        <p>No government requests or legal demands received as of {stats.canaryTimestamp}.</p>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black uppercase tracking-tight">Support</h2>
                    <div className="bg-yellow-50 p-6 border-2 border-black space-y-4">
                        <p className="font-bold">This project runs on donations. Hosting, bandwidth, and legal defense all cost money. Because privacy matters, we only accept Monero.</p>

                        <div className="space-y-1">
                            <p className="text-xs font-mono uppercase font-bold text-gray-500">Monero Address (XMR)</p>
                            <div className="bg-white border-2 border-black p-2 font-mono text-xs break-all select-all">
                                847520...[YOUR MONERO ADDRESS]...
                            </div>
                        </div>

                        <div className="flex justify-center py-4 bg-white border-2 border-black">
                            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center font-mono text-xs text-center p-2">
                                [QR CODE]
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Legal & Contact */}
            <section className="grid md:grid-cols-2 gap-12 pt-8 border-t-4 border-black">
                <div className="space-y-4 font-mono text-sm">
                    <h3 className="font-bold uppercase mb-2">Legal</h3>
                    <p>All data on this site is user-submitted and marked as alleged/unverified. We do not guarantee accuracy or availability.</p>
                    <p>Public records are public. If you believe content violates the law, contact us.</p>
                    <p>This project operates under First Amendment protections for transparency and journalism.</p>
                </div>

                <div className="space-y-4 font-mono text-sm">
                    <h3 className="font-bold uppercase mb-2">Contact</h3>
                    <ul className="space-y-2">
                        <li><span className="opacity-50 w-24 inline-block">General:</span> <a href="mailto:contact@publicrecord.fyi" className="underline">contact@publicrecord.fyi</a></li>
                        <li><span className="opacity-50 w-24 inline-block">Legal/DMCA:</span> <a href="mailto:legal@publicrecord.fyi" className="underline">legal@publicrecord.fyi</a></li>
                        <li><span className="opacity-50 w-24 inline-block">Press:</span> <a href="mailto:press@publicrecord.fyi" className="underline">press@publicrecord.fyi</a></li>
                        <li><span className="opacity-50 w-24 inline-block">Secure:</span> [PGP key fingerprint]</li>
                    </ul>
                </div>
            </section>

            {/* Personal Note */}
            <section className="bg-black text-white p-8 md:p-12 space-y-6 brutal-shadow-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl leading-none select-none pointer-events-none">
                    !
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">A Personal Note</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4 text-gray-200">
                    <p>
                        I live in my Tesla. I've legally changed my name and transitioned gender. I use GrapheneOS and Qubes. I have a virtual office as my legal address.
                    </p>
                    <p>
                        I don't do this because I'm paranoid. I do this because I've lived under surveillance my entire life, and I refuse to make it easy for them.
                    </p>
                    <p>
                        Building this site isn't an act of aggression. It's an act of self-defense and collective liberation.
                    </p>
                    <p className="text-white font-bold border-l-4 border-white pl-4">
                        If you've also had enough of being watched, tracked, and catalogued without your consent: you're not alone. Let's fix this together.
                    </p>
                </div>

                <div className="pt-8 mt-8 border-t border-gray-800 text-center space-y-2 font-serif italic text-lg opacity-80">
                    <p>"Those who would give up essential Liberty, to purchase a little temporary Safety, deserve neither Liberty nor Safety." – Benjamin Franklin</p>
                    <p>"Privacy is not about hiding. Privacy is about freedom." – Anonymous</p>
                </div>
            </section>

            <div className="text-center font-mono text-xs opacity-50 space-y-1 pb-12">
                <p>Latest database backup: [magnet link updates weekly]</p>
                <p>Tor mirror: [.onion address when available]</p>
                <p>IPFS hash: [hash when available]</p>
                <p className="font-bold mt-2">This site will outlive its creator. That's by design.</p>
            </div>

        </div>
    );
}
