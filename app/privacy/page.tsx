export default function PrivacyPage() {
    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-4">Privacy Policy</h1>

            <div className="space-y-6 font-mono text-sm leading-relaxed">
                <h3 className="text-lg font-bold uppercase mt-4">1. Data Collection</h3>
                <p>
                    We collect minimal data necessary for operation and abuse prevention:
                </p>
                <ul className="list-disc list-inside ml-4">
                    <li><strong>IP Address & User Agent:</strong> Hashed to create a fingerprint for rate limiting and duplicate vote prevention. We do not store raw IP addresses permanently linked to submissions if possible, but hashes are stored.</li>
                    <li><strong>Uploaded Content:</strong> All files and metadata uploaded are public.</li>
                </ul>

                <h3 className="text-lg font-bold uppercase mt-4">2. Cookies</h3>
                <p>
                    We use no tracking cookies. We may use local storage for UI preferences. hCaptcha uses cookies for security verification.
                </p>

                <h3 className="text-lg font-bold uppercase mt-4">3. Third Parties</h3>
                <p>
                    We use Supabase for storage and hCaptcha for security. Please review their privacy policies.
                </p>
            </div>
        </div>
    );
}
