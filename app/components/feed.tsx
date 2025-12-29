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

    // Filters
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'newest' | 'top'>('newest');

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setLoading(true);
        const newData = await fetchSubmissions(0, 20, search, undefined, undefined, sort);
        setData(newData);
        setOffset(newData.length);
        setHasMore(newData.length >= 20);
        setLoading(false);
    };

    const loadMore = async () => {
        setLoading(true);
        const newData = await fetchSubmissions(offset, 20, search, undefined, undefined, sort);
        if (newData.length === 0) {
            setHasMore(false);
        } else {
            setData([...data, ...newData]);
            setOffset(offset + newData.length);
            if (newData.length < 20) setHasMore(false);
        }
        setLoading(false);
    };

    const toggleSort = async (newSort: 'newest' | 'top') => {
        if (newSort === sort) return;
        setSort(newSort);
        setLoading(true);
        const newData = await fetchSubmissions(0, 20, search, undefined, undefined, newSort);
        setData(newData);
        setOffset(newData.length);
        setHasMore(newData.length >= 20);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="mb-8 p-4 border-2 border-black brutal-shadow bg-white">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="SEARCH RECORDS..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-grow p-2 border-2 border-black font-mono text-sm focus:outline-none focus:ring-0"
                    />
                    <button type="submit" className="brutal-btn px-6 py-2">
                        SEARCH
                    </button>
                </form>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => toggleSort('newest')}
                        className={`brutal-btn px-4 py-1 text-sm ${sort === 'newest' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        NEWEST
                    </button>
                    <button
                        onClick={() => toggleSort('top')}
                        className={`brutal-btn px-4 py-1 text-sm ${sort === 'top' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        TOP VERIFIED
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center font-mono p-8 border-2 border-black border-dashed opacity-50">Loading...</div>
            ) : data.length === 0 ? (
                <div className="text-center font-mono p-12 border-2 border-black border-dashed opacity-50 bg-gray-50">
                    <p className="text-xl mb-2">No records found matching your search.</p>
                    <p className="text-xs">Try broader terms or browse the newest feed.</p>
                </div>
            ) : (
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
            )}

            {!loading && hasMore && (
                <div className="text-center pt-8">
                    <button onClick={loadMore} className="brutal-btn w-full md:w-auto">
                        LOAD MORE RECORDS
                    </button>
                </div>
            )}
        </div>
    );
}
