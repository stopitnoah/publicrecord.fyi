import Feed from '../../components/feed';
import { fetchSubmissions } from '../../actions/fetch-submissions';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 60;

type Props = {
    params: Promise<{ state: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { state } = await params;
    const upperState = state.toUpperCase();

    return {
        title: `Public Records for ${upperState} | PublicRecord.fyi`,
        description: `Cryptographically verified public records for the jurisdiction of ${upperState}.`,
    };
}

export default async function StatePage({ params }: Props) {
    const { state } = await params;
    const upperState = state.toUpperCase();

    // Fetch initial data for this state
    const initialData = await fetchSubmissions(0, 20, undefined, upperState);

    // If no data and it doesn't look like a state code, maybe it's invalid
    // (In a real app, we'd validate against a list of states, but for now we'll just show the feed)

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="border-b-8 border-black pb-6 mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/" className="text-sm font-bold uppercase underline hover:no-underline">← Back to All</Link>
                </div>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                    Records: <span className="bg-yellow-300 px-2">{upperState}</span>
                </h1>
                <p className="font-mono text-sm mt-4 text-gray-600">
                    Showing all cryptographically verified records for the jurisdiction of {upperState}.
                </p>
            </div>

            {/* Feed */}
            <div id="feed">
                <Feed initialData={initialData} />
            </div>

            {/* State Disclaimer */}
            <div className="bg-black text-white p-8 brutal-shadow">
                <h2 className="text-xl font-bold uppercase mb-4">Jurisdictional Notice</h2>
                <p className="text-sm font-mono leading-relaxed text-gray-400">
                    The data shown here pertains specifically to the state of {upperState}.
                    Public officials in this jurisdiction are subject to the transparency requirements of their respective state public records laws (e.g., PRA, FOIA, OPRA).
                </p>
            </div>
        </div>
    );
}
