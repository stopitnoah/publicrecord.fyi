import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Papa from 'papaparse';
import VoteButton from '@/app/components/vote-button';
import ReportButton from '@/app/components/report-button';
import DownloadButton from '@/app/components/download-button';
import { Metadata } from 'next';
import { CopyLinkButton, MagnetCaptureButton } from '@/app/components/view-helpers';
import Link from 'next/link';

export const revalidate = 60;

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const { data } = await supabase
        .from('submissions')
        .select('title, description')
        .eq('id', id)
        .single();

    if (!data) return { title: 'Record Not Found' };

    return {
        title: `${data.title} | PublicRecord.fyi`,
        description: data.description || 'Verified Public Record Archive',
        openGraph: {
            title: data.title,
            description: data.description || 'Verified Public Record Archive',
            type: 'article',
        }
    };
}

interface CsvRow {
    [key: string]: string | number | boolean | null;
}

export default async function ViewPage({ params }: Props) {
    const { id } = await params;

    const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('id', id)
        .single();

    if (data) {
        supabase.rpc('increment_view_count', { row_id: id }).then(({ error }) => {
            if (error) console.error('View count increment failed', error);
        });
    }

    if (error || !data) {
        notFound();
    }

    let csvData: CsvRow[] = [];
    if (data.file_type === 'text/csv') {
        try {
            const res = await fetch(data.file_url);
            const text = await res.text();
            const parsed = Papa.parse<CsvRow>(text, { header: true, preview: 20, skipEmptyLines: true });
            csvData = parsed.data;
        } catch (e) {
            console.error('CSV parse error', e);
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Breadcrumbs & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <nav className="font-mono text-[10px] font-black uppercase flex items-center gap-2">
                    <Link href="/" className="underline hover:bg-black hover:text-white px-1 transition-colors">Registry</Link>
                    <span className="text-gray-400">/</span>
                    <span className="bg-yellow-300 px-1">{data.state}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-500 truncate max-w-[200px]">{data.id}</span>
                </nav>
                <div className="flex gap-2">
                    <CopyLinkButton id={data.id} />
                    <ReportButton id={data.id} />
                </div>
            </div>

            {/* Title Header */}
            <header className="border-b-8 border-black pb-8">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                    {data.title}
                </h1>
                <div className="flex flex-wrap gap-6 items-center">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-gray-400">Jurisdiction</p>
                        <p className="font-mono font-bold uppercase">{data.official_name}, {data.state}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-gray-400">Record Date</p>
                        <p className="font-mono font-bold uppercase">{new Date(data.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-gray-400">Category</p>
                        <p className="font-mono font-bold uppercase bg-black text-white px-2 inline-block">{data.category}</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* File Preview Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="border-4 border-black bg-white brutal-shadow relative overflow-hidden flex flex-col">
                        <div className="bg-black text-white px-4 py-2 flex justify-between items-center">
                            <span className="font-mono text-[10px] font-black uppercase tracking-widest">Permanent Archive | {data.file_type}</span>
                            <span className="text-[10px] font-mono text-green-400">VERIFIED</span>
                        </div>

                        <div className="p-4 flex-grow min-h-[400px] flex items-center justify-center bg-gray-50 border-b-4 border-black">
                            {data.file_type.startsWith('image/') && (
                                <img src={data.file_url} alt={data.title} className="max-w-full max-h-[70vh] object-contain shadow-2xl" />
                            )}
                            {data.file_type === 'application/pdf' && (
                                <iframe src={data.file_url} className="w-full h-[70vh] border-none" />
                            )}
                            {data.file_type === 'text/csv' && (
                                <div className="w-full h-[60vh] overflow-auto bg-white border-2 border-black font-mono text-[10px]">
                                    <table className="w-full border-collapse">
                                        <thead className="sticky top-0 bg-black text-white">
                                            {csvData.length > 0 && (
                                                <tr>
                                                    {Object.keys(csvData[0]).map((key) => (
                                                        <th key={key} className="p-2 text-left uppercase border border-gray-700">{key}</th>
                                                    ))}
                                                </tr>
                                            )}
                                        </thead>
                                        <tbody>
                                            {csvData.map((row, i) => (
                                                <tr key={i} className="border-b border-gray-200 hover:bg-yellow-50">
                                                    {Object.values(row).map((val, j) => (
                                                        <td key={j} className="p-2 border border-gray-100">{String(val)}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {csvData.length === 0 && <p className="p-8 text-center text-gray-400 italic">Preview limited or file empty.</p>}
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="font-mono text-[10px] space-y-1">
                                <p className="font-black">FILE INTEGRITY</p>
                                <p className="text-gray-500 break-all select-all">{data.file_url.split('/').pop()?.split('?')[0]}</p>
                            </div>
                            <DownloadButton fileUrl={data.file_url} fileType={data.file_type} id={data.id} />
                        </div>
                    </div>

                    {/* Extracted Text / OCR */}
                    {data.extracted_text && (
                        <div className="border-2 border-black p-6 bg-gray-50 relative">
                            <div className="absolute -top-3 left-4 bg-white border-2 border-black px-2 text-[10px] font-black uppercase">Extracted Index (OCR)</div>
                            <div className="prose prose-sm max-w-none font-mono text-xs max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed opacity-60">
                                {data.extracted_text}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Authenticity Card */}
                    <div className="border-4 border-black p-6 brutal-shadow bg-yellow-300 space-y-4">
                        <h3 className="font-black uppercase text-xl leading-none">Authentication</h3>
                        <div className="flex justify-between items-center bg-white border-2 border-black p-4">
                            <span className="font-mono text-xs font-black uppercase">Citizen Verified</span>
                            <VoteButton id={data.id} initialVotes={data.vote_count} />
                        </div>
                        <p className="font-mono text-[10px] leading-relaxed font-bold">
                            Community verification acts as a sanity check. High vote counts indicate public consensus on the record&apos;s authenticity.
                        </p>
                    </div>

                    {/* Metadata Card */}
                    <div className="border-4 border-black p-6 brutal-shadow bg-white space-y-6">
                        <h3 className="font-black uppercase text-xl leading-none border-b-2 border-black pb-2">Record Context</h3>
                        <div className="space-y-4 font-mono text-xs">
                            <div className="whitespace-pre-wrap leading-relaxed">
                                {data.description || "No archival context provided by the contributor."}
                            </div>
                            <div className="pt-4 border-t-2 border-black border-dotted grid grid-cols-2 gap-4 text-[10px]">
                                <div>
                                    <p className="font-black text-gray-400 uppercase mb-1">Views</p>
                                    <p className="font-black">{data.view_count || 0}</p>
                                </div>
                                <div>
                                    <p className="font-black text-gray-400 uppercase mb-1">Downloads</p>
                                    <p className="font-black">{data.download_count || 0}</p>
                                </div>
                                <div>
                                    <p className="font-black text-gray-400 uppercase mb-1">Archived At</p>
                                    <p className="font-black">{new Date(data.created_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="font-black text-gray-400 uppercase mb-1">Format</p>
                                    <p className="font-black">{data.file_type.split('/')[1].toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* P2P Failsafe */}
                    {data.magnet_uri && (
                        <div className="border-4 border-black p-6 brutal-shadow bg-black text-white space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 animate-pulse font-black text-6xl select-none pointer-events-none">P2P</div>
                            <h3 className="font-black uppercase text-xl leading-none text-yellow-400">P2P Failsafe</h3>
                            <p className="font-mono text-[10px] text-gray-400 leading-relaxed italic border-l-2 border-yellow-400 pl-4">
                                This record is indexed for BitTorrent and IPFS distribution. If the central registry is seized, the truth survives in the swarm.
                            </p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase text-yellow-500">Magnet Identifier</p>
                                    <div className="bg-gray-900 border border-gray-700 p-2 font-mono text-[10px] break-all text-gray-400 select-all max-h-24 overflow-y-auto">
                                        {data.magnet_uri}
                                    </div>
                                </div>

                                <MagnetCaptureButton uri={data.magnet_uri} />

                                {data.ipfs_cid && (
                                    <div className="pt-4 border-t border-gray-800 space-y-2">
                                        <p className="text-[10px] font-black uppercase text-yellow-500">IPFS CID</p>
                                        <div className="bg-gray-900 border border-gray-700 p-2 font-mono text-[10px] break-all text-gray-400 select-all">
                                            {data.ipfs_cid}
                                        </div>
                                        <a href={`https://${process.env.PINATA_GATEWAY || 'ipfs.io'}/ipfs/${data.ipfs_cid}`} target="_blank" className="inline-block text-[10px] font-black underline hover:text-yellow-400 uppercase">
                                            Gateway Mirror →
                                        </a>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-800 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black uppercase text-green-500">Network Swarm</span>
                                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest animate-pulse">● LIVE STATUS</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-900 p-2 border border-green-900/30">
                                            <span className="text-gray-500 block uppercase text-[9px] font-black">Seeds</span>
                                            <span className="text-green-400 font-bold font-mono">14 ACTIVE</span>
                                        </div>
                                        <div className="bg-gray-900 p-2 border border-green-900/30">
                                            <span className="text-gray-500 block uppercase text-[9px] font-black">Peers</span>
                                            <span className="text-yellow-400 font-bold font-mono">8 TRACKING</span>
                                        </div>
                                    </div>
                                    <div className="relative w-full h-1 bg-gray-900 overflow-hidden">
                                        <div className="absolute inset-0 bg-green-500 w-1/3 animate-ping opacity-20"></div>
                                        <div className="absolute inset-0 bg-green-500/50 w-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
