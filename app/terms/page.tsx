export default function TermsPage() {
    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-4">Terms of Service</h1>

            <div className="space-y-6 font-mono text-sm leading-relaxed">
                <p><strong>Effective Date:</strong> {new Date().getFullYear()}</p>

                <h3 className="text-lg font-bold uppercase mt-4">1. Acceptance</h3>
                <p>By using publicrecord.fyi, you agree to these terms.</p>

                <h3 className="text-lg font-bold uppercase mt-4">2. Submissions</h3>
                <p>
                    You agree not to upload content that is illegal, contains malware, or violates the privacy of private individuals unrelated to public interest (e.g. do not upload private license plate logs unless they demonstrate broad surveillance patterns).
                </p>
                <p>
                    By submitting content, you grant publicrecord.fyi a perpetual, irrevocable, worldwide, royalty-free license to host, store, use, display, reproduce, and distribute such content as part of the public registry. You understand that this site is designed for maximal &quot;survival&quot; and content may be mirrored across decentralized networks.
                </p>

                <h3 className="text-lg font-bold uppercase mt-4">3. Disclaimer</h3>
                <p>
                    We do not guarantee the accuracy of user-submitted content. All records are provided &quot;as is&quot;.
                    We are not responsible for how this data is used.
                </p>
            </div>
        </div>
    );
}
