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

            {/* What are ALPRs */}
            <section className="space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tight">What are ALPRs?</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4">
                    <p>
                        Automated License Plate Readers (ALPRs) are AI-powered cameras that capture and analyze images of all passing vehicles, storing details like your car&apos;s location, date, and time.
                    </p>
                    <p>
                        They also capture your car&apos;s <span className="highlight-text bg-yellow-100 px-1 font-bold">make, model, color, and identifying features</span> such as dents, roof racks, and bumper stickers, turning these into searchable data points.
                    </p>
                    <div className="bg-gray-50 p-6 border-l-4 border-black">
                        <p className="text-sm font-bold uppercase tracking-widest mb-2">The Loophole</p>
                        <p>
                            These systems are marketed as tools to fight crime, but they ignore the powerful tools police already have (like warrants). Instead, they create a loophole: <strong>mass surveillance without a warrant.</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* The Dangers */}
            <section className="space-y-8">
                <h2 className="text-3xl font-black uppercase tracking-tight">The Dangers</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="border-4 border-black p-4 bg-red-50 space-y-2">
                        <div className="text-2xl">👁️</div>
                        <h3 className="font-black uppercase">Privacy Violations</h3>
                        <p className="text-sm leading-snug">
                            ALPRs track your movements and store your data for long periods, creating a detailed record of your location history.
                        </p>
                    </div>

                    <div className="border-4 border-black p-4 bg-white space-y-2">
                        <div className="text-2xl">⚠️</div>
                        <h3 className="font-black uppercase">Risk of Misuse</h3>
                        <p className="text-sm leading-snug">
                            Data from ALPRs has led to wrongful arrests, profiling, and stalking of ex-partners by police officers.
                        </p>
                    </div>

                    <div className="border-4 border-black p-4 bg-gray-50 space-y-2">
                        <div className="text-2xl">📉</div>
                        <h3 className="font-black uppercase">Limited Benefits</h3>
                        <p className="text-sm leading-snug">
                            There&apos;s no substantial evidence that ALPRs effectively prevent crime, despite unethical vendor claims.
                        </p>
                    </div>
                </div>

                <div className="prose-lg font-medium leading-relaxed bg-black text-white p-6 border-4 border-black brutal-shadow-white">
                    <p className="leading-relaxed">
                        <span className="text-yellow-300 font-bold uppercase">"Your driving history is rarely confined..."</span>
                        <br />
                        It&apos;s typically shared with thousands of other agencies nationwide (secretly). Once the data is out of your community, you have no control over how it&apos;s used.
                    </p>
                </div>
            </section>

            {/* What is Flock? */}
            <section className="space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tight">What is Flock?</h2>
                <div className="prose-lg font-medium leading-relaxed space-y-4">
                    <p>
                        Flock Safety is one of the largest ALPR vendors in the US. Their cameras are installed for police, businesses, and HOAs. Captured data is uploaded to Flock&apos;s cloud, where participating agencies can search and share information across jurisdictions.
                    </p>

                    <div className="border-4 border-red-600 p-6 bg-red-50 relative mt-8">
                        <div className="absolute -top-3 left-4 bg-red-600 text-white px-2 py-0.5 text-[10px] font-black uppercase">Critical Warning</div>
                        <h3 className="font-black uppercase text-xl mb-2 text-red-900">Similar Sites are Disappearing</h3>
                        <p className="text-red-900 font-medium">
                            Following takedown claims submitted on behalf of Flock, sites similar to <a href="https://deflock.me" className="underline font-bold">DeFlock</a> have gone offline.
                        </p>
                        <p className="text-red-900 font-black mt-2 italic">
                            If DeFlock disappears, it&apos;s clear why.
                        </p>
                    </div>
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
                    <p className="font-black border-l-4 border-black pl-4 py-2 bg-yellow-50 lg:text-3xl tracking-tighter uppercase italic">
                        If surveillance is mandatory for citizens, it is mandatory for officials. If it is unacceptable for officials, it must be dismantled for all.
                    </p>
                    <p>
                        This isn&apos;t about revenge or vindictiveness. It&apos;s about creating alignment—what we call <strong>Mutual Privacy</strong>. If surveillance is acceptable for innocent citizens, it&apos;s acceptable for public officials. If it&apos;s unacceptable for officials, it should be unacceptable for everyone.
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
