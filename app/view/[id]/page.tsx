import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Papa from 'papaparse';
import VoteButton from '@/app/components/vote-button';
import ReportButton from '@/app/components/report-button';

export const revalidate = 60;

type Props = {
    params: Promise<{ id: string }>;
};

export default async function ViewPage({ params }: Props) {
    const { id } = await params;

    const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('id', id)
        .single();

    // Increment view count (fire and forget)
    if (data) {
        supabase.rpc('increment_view_count', { row_id: id }).then(({ error }) => {
            if (error) console.error('View count increment failed', error);
        });
    }

    if (error || !data) {
        notFound();
    }

    let csvData: any[] = [];
    if (data.file_type === 'text/csv') {
        try {
            const res = await fetch(data.file_url);
            const text = await res.text();
            // Parse checks
            const parsed = Papa.parse(text, { header: true, preview: 10, skipEmptyLines: true });
            csvData = parsed.data;
        } catch (e) {
            console.error('CSV parse error', e);
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="border-b-4 border-black pb-4 mb-8">
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">{data.title}</h1>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                    <div className="flex flex-wrap gap-3 items-center">
                        <span className="bg-black text-white px-3 py-1 font-bold uppercase tracking-wider text-sm">{data.state}</span>
                        <span className="font-mono font-bold text-gray-700 uppercase">{data.official_name}</span>
                    </div>
                    <span className="font-mono text-sm border-2 border-black px-2 py-1 bg-white">{new Date(data.date).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (File) */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="border-2 border-black p-2 brutal-shadow bg-white min-h-[400px] flex items-center justify-center relative overflow-hidden">
                        {data.file_type.startsWith('image/') && (
                            <div className="relative w-full h-full flex justify-center bg-gray-50">
                                <img src={data.file_url} alt={data.title} className="max-w-full max-h-[800px] object-contain" />
                            </div>
                        )}
                        {data.file_type === 'application/pdf' && (
                            <iframe src={data.file_url} className="w-full h-[80vh] min-h-[600px] border-none" />
                        )}
                        {data.file_type === 'text/csv' && (
                            <div className="w-full overflow-x-auto self-start pt-4">
                                <table className="w-full text-xs font-mono border-collapse">
                                    <thead>
                                        {csvData.length > 0 && (
                                            <tr className="bg-gray-100 sticky top-0">
                                                {Object.keys(csvData[0]).map((key) => (
                                                    <th key={key} className="border border-black p-2 text-left bg-gray-200 whitespace-nowrap">{key}</th>
                                                ))}
                                            </tr>
                                        )}
                                    </thead>
                                    <tbody>
                                        {csvData.map((row, i) => (
                                            <tr key={i} className="hover:bg-yellow-50">
                                                {Object.values(row).map((val: any, j) => (
                                                    <td key={j} className="border border-black p-2 whitespace-nowrap">{val}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {csvData.length === 0 && <p className="p-4 text-center">Unable to preview CSV</p>}
                            </div>
                        )}
                    </div>

                    <div className="text-center md:text-right">
                        <a href={data.file_url} download target="_blank" className="brutal-btn text-xs inline-flex items-center gap-2">
                            <span>DOWNLOAD FILE</span>
                            <span className="opacity-50">({data.file_type.split('/')[1].toUpperCase()})</span>
                        </a>
                    </div>
                </div>

                {/* Sidebar: Details & Vote */}
                <div className="space-y-8">
                    <div className="bg-yellow-50 border-2 border-black p-6 relative">
                        <div className="absolute -top-3 left-4 bg-white border-2 border-black px-2 text-xs font-bold uppercase">Actions</div>
                        <div className="flex justify-between items-center mb-6 mt-2">
                            <span className="font-mono text-sm font-bold uppercase">Authenticity</span>
                            <VoteButton id={data.id} initialVotes={data.vote_count} />
                        </div>
                        <p className="text-xs text-gray-600 font-mono leading-relaxed">
                            By voting, you certify that this record appears to be a legitimate public document.
                        </p>
                    </div>

                    <div className="border-2 border-black p-6 relative">
                        <div className="absolute -top-3 left-4 bg-white border-2 border-black px-2 text-xs font-bold uppercase">Context</div>
                        <p className="font-mono text-sm whitespace-pre-wrap leading-relaxed mt-2">
                            {data.description || "No description provided."}
                        </p>
                    </div>

                    {data.magnet_uri && (
                        <div className="bg-black text-white p-6 relative brutal-shadow">
                            <div className="absolute -top-3 left-4 bg-white text-black border-2 border-black px-2 text-xs font-bold uppercase">P2P Failsafe</div>
                            <p className="text-xs font-mono mb-4 text-gray-400">
                                This file is cryptographically indexed for P2P distribution. If this site is seized, use this magnet to recover the data.
                            </p>
                            <a href={data.magnet_uri} className="block bg-yellow-400 text-black border-2 border-black p-3 text-center font-black uppercase tracking-tighter hover:bg-yellow-300 active:translate-y-1 transition-all">
                                Copy Magnet URI
                            </a>
                            <div className="mt-4 p-2 border border-gray-700 bg-gray-900 overflow-hidden">
                                <p className="text-[10px] font-mono break-all text-gray-500 select-all">
                                    {data.magnet_uri}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="font-mono text-xs text-gray-500 border-t-2 border-dotted border-black pt-4">
                        <div className="flex justify-between">
                            <span>ID:</span>
                            <span className="font-bold shrink-0 ml-4 truncate max-w-[150px]">{data.id}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                            <span>Jurisdiction:</span>
                            <span className="font-bold">{data.state}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span>Views:</span>
                            <span className="font-bold">{data.view_count || 0}</span>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <ReportButton id={data.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
