import Feed from './components/feed';
import { fetchSubmissions } from './actions/fetch-submissions';

export const revalidate = 60;

export default async function Home() {
    const initialData = await fetchSubmissions(0, 20);

    return (
        <div className="space-y-12">
            <div className="border-2 border-black p-6 md:p-10 brutal-shadow bg-yellow-50">
                <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-none">Citizen<br />Oversight.</h2>
                <p className="text-lg font-mono mb-8 max-w-2xl leading-relaxed">
                    A decentralized, resilient public record of Automated License Plate Reader (ALPR) deployments.
                    <br /><br />
                    <span className="bg-black text-white px-2">Upload evidence.</span> <span className="bg-black text-white px-2">Vote on verification.</span> <span className="bg-black text-white px-2">Keep the record public.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="/upload" className="brutal-btn text-center uppercase tracking-widest">
                        Submit Record
                    </a>
                    <a href="#feed" className="px-4 py-2 font-bold hover:underline self-center uppercase text-sm">
                        Browse Feed ↓
                    </a>
                </div>
            </div>

            <div id="feed" className="pt-8">
                <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-2">
                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Recent Submissions</h3>
                    <span className="font-mono text-xs md:text-sm animate-pulse">● LIVE</span>
                </div>
                <Feed initialData={initialData} />
            </div>
        </div>
    );
}
