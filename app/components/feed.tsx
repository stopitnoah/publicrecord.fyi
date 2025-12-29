'use client'
import { useState } from 'react';
import { fetchSubmissions } from '@/app/actions/fetch-submissions';
import VoteButton from './vote-button';
import Link from 'next/link';
import { Database } from '@/database.types';

type Submission = Database['public']['Tables']['submissions']['Row'];

export default function Feed({ initialData }: { initialData: Submission[] }) {
    const [data, setData] = useState(initialData);
    const [offset, setOffset] = useState(initialData.length);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialData.length >= 20);

    const loadMore = async () => {
        setLoading(true);
        const newData = await fetchSubmissions(offset);
        if (newData.length === 0) {
            setHasMore(false);
        } else {
            setData([...data, ...newData]);
            setOffset(offset + newData.length);
            if (newData.length < 20) setHasMore(false);
        }
        setLoading(false);
    };

    if (data.length === 0) {
        return <div className="text-center font-mono p-8 border-2 border-black border-dashed opacity-50">No records found. Be the first to upload.</div>
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item) => (
                    <div key={item.id} className="border-2 border-black p-4 brutal-shadow bg-white flex flex-col justify-between h-full hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-black text-white px-2 py-0.5 text-xs font-bold uppercase tracking-wider">{item.state}</span>
                                <span className="text-xs font-mono text-gray-500 border-b border-black">{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-3 min-h-[3.5rem]">
                                <Link href={`/view/${item.id}`} className="hover:underline decoration-2 underline-offset-2">
                                    {item.title}
                                </Link>
                            </h3>
                            <p className="text-sm font-mono text-gray-600 mb-4 line-clamp-1 truncate" title={item.official_name}>
                                {item.official_name}
                            </p>
                        </div>

                        <div className="flex justify-between items-center mt-4 border-t-2 border-black pt-2 border-dotted">
                            <span className="text-xs font-bold uppercase bg-gray-100 px-1">{item.file_type.split('/')[1] || 'FILE'}</span>
                            <VoteButton id={item.id} initialVotes={item.vote_count} />
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="text-center pt-8">
                    <button onClick={loadMore} disabled={loading} className="brutal-btn w-full md:w-auto">
                        {loading ? 'LOADING DATA...' : 'LOAD MORE RECORDS'}
                    </button>
                </div>
            )}
        </div>
    );
}
