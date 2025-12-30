import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 space-y-16">

            {/* Header */}
            <section className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none border-b-8 border-black pb-6">
                    About<br />publicrecord.fyi
                </h1>
            </section>

            {/* Greenwald Quote Section */}
            <div className="border-2 border-black p-6 md:p-10 brutal-shadow bg-gray-50 relative overflow-hidden">
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif italic leading-relaxed max-w-3xl mb-4">
                    &quot;We are supposed to know nearly everything about them. That is why they are called <strong className="not-italic">public servants</strong>.<br /><br />
                    They on the other hand are supposed to know nearly nothing about us. That is why we are called <strong className="not-italic">private citizens</strong>.&quot;
                </blockquote>
                <p className="font-mono text-sm text-gray-600">— Glenn Greenwald</p>
            </div>

            {/* The Problem */}
            <section className="space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tight">The Problem</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4">
                    <p>
                        I&apos;ve been online since I was 7 years old—far before I could comprehend or consent to what that meant.
                        Every click, every search, every awkward moment of growing up: captured, stored, analyzed. My privacy has been effectively violated my entire life by surveillance systems I never agreed to and couldn&apos;t escape.
                    </p>
                    <p>
                        Automatic License Plate Reader (ALPR) systems are just one piece of this apparatus. They photograph every license plate that passes by, creating a detailed map of everyone&apos;s movements. This data gets stored for months or years. It tracks where you go, when you go there, and who you&apos;re with.
                    </p>
                    <p className="font-bold border-l-4 border-black pl-4 py-2 bg-gray-50">
                        This surveillance doesn&apos;t make us safer. It makes us monitored.
                    </p>
                </div>
            </section>

            {/* The Response */}
            <section className="space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tight">The Response</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4">
                    <p>
                        Public officials fund, control, and expand these surveillance systems. But here&apos;s the thing: they&apos;re tracked by the same systems.
                    </p>
                    <p>
                        ALPR data is a public record. Under Freedom of Information Act (FOIA) laws, this data is legally accessible to any citizen who requests it.
                    </p>
                    <p>
                        publicrecord.fyi crowdsources and aggregates these public records. If a city council member votes to expand ALPR networks, their own movements become part of the public database. If a police chief oversees surveillance infrastructure, their vehicle&apos;s location history is a public record.
                    </p>
                    <div className="pt-4">
                        <Link href="/resources" className="brutal-btn uppercase tracking-widest text-sm bg-white hover:bg-gray-50">
                            View FOIA Resources &amp; Legal Basis
                        </Link>
                    </div>
                </div>
            </section>

            {/* The Philosophy */}
            <section className="space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tight">The Philosophy</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4">
                    <p>
                        I&apos;m not trying to hurt anyone. I&apos;m trying to fix this.
                    </p>
                    <p>
                        The surveillance apparatus will never be dismantled while those in power are insulated from its effects. When officials experience the same loss of privacy they impose on citizens, the political calculus changes.
                    </p>
                    <p>
                        This isn&apos;t about revenge or vindictiveness. It&apos;s about creating alignment. If surveillance is acceptable for innocent citizens, it&apos;s acceptable for public officials. If it&apos;s unacceptable for officials, it should be unacceptable for everyone.
                    </p>
                    <p>
                        Public records are public records. This site doesn&apos;t hack, leak, or steal anything. We simply aggregate what government agencies have already deemed public information.
                    </p>
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
                        When that happens, this site becomes obsolete. That&apos;s the goal. <br />
                        Until then, if you&apos;re a public official who values privacy: fight to dismantle the surveillance state. That&apos;s the only way this stops.
                    </p>
                </div>
            </section>

            {/* What This Is Not */}
            <section className="space-y-6 border-2 border-black p-6 brutal-shadow bg-red-50">
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

            {/* Part of a Movement */}
            <section className="space-y-6 bg-black text-white p-8 brutal-shadow-white">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white border-b-2 border-white pb-2 inline-block">
                    Part of a Movement
                </h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4 text-gray-200">
                    <p>This project supports the growing movement for surveillance accountability:</p>
                    <ul className="space-y-2 font-mono text-sm">
                        <li>→ Dr. John Padfield&apos;s <strong className="text-yellow-300">Brushfires of Freedom</strong> tour</li>
                        <li>→ <strong className="text-yellow-300">DFlock&apos;s</strong> camera mapping initiative</li>
                        <li>→ <strong className="text-yellow-300">Institute for Justice&apos;s</strong> legal challenges</li>
                    </ul>
                    <p className="font-bold border-t border-gray-700 pt-4 mt-4 text-xs font-mono uppercase tracking-widest">
                        We provide infrastructure. You provide accountability.
                    </p>
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
                        I don&apos;t do this because I&apos;m paranoid. I do this because I&apos;ve lived under surveillance my entire life, and I refuse to make it easy for them.
                    </p>
                    <p>
                        Building this site isn&apos;t an act of aggression. It&apos;s an act of self-defense and collective liberation.
                    </p>
                    <p className="text-white font-bold border-l-4 border-white pl-4">
                        If you&apos;ve also had enough of being watched, tracked, and catalogued without your consent: you&apos;re not alone. Let&apos;s fix this together.
                    </p>
                </div>
            </section>

            <div className="text-center font-mono text-xs opacity-50 space-y-1 pb-12">
                <p>This site is designed to survive its creator. That&apos;s by design.</p>
                <div className="flex justify-center gap-4 mt-4 underline">
                    <Link href="/network">Network Status</Link>
                    <Link href="/support">Support the Mission</Link>
                </div>
            </div>

        </div>
    );
}
