'use client'
import { useState } from 'react';
import { fetchSubmissions } from '@/app/actions/fetch-submissions';
import VoteButton from './vote-button';
import Link from 'next/link';
import { Database } from '@/database.types';

type Submission = Database['public']['Tables']['submissions']['Row'];

const CATEGORIES = [
    { value: '', label: 'ALL CATEGORIES' },
    { value: 'alpr_camera', label: 'ALPR CAMERAS' },
    { value: 'policy', label: 'POLICIES' },
    { value: 'violation', label: 'VIOLATIONS' },
    { value: 'tracking', label: 'OFFICIALS' },
    { value: 'other', label: 'OTHER' },
];

export default function Feed({ initialData }: { initialData: Submission[] }) {
    const [data, setData] = useState(initialData);
    const [offset, setOffset] = useState(initialData.length);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialData.length >= 20);

    // Filters
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'newest' | 'top'>('newest');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setLoading(true);
        const newData = await fetchSubmissions(0, 20, search, undefined, category, sort, startDate, endDate);
        setData(newData);
        setOffset(newData.length);
        setHasMore(newData.length >= 20);
        setLoading(false);
    };

    const resetFilters = async () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
        setSort('newest');
        setCategory('');
        setLoading(true);
        const newData = await fetchSubmissions(0, 20);
        setData(newData);
        setOffset(newData.length);
        setHasMore(newData.length >= 20);
        setLoading(false);
    };

    const loadMore = async () => {
        setLoading(true);
        const newData = await fetchSubmissions(offset, 20, search, undefined, category, sort, startDate, endDate);
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
        const newData = await fetchSubmissions(0, 20, search, undefined, category, newSort, startDate, endDate);
        setData(newData);
        setOffset(newData.length);
        setHasMore(newData.length >= 20);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="mb-8 border-2 border-black brutal-shadow bg-white overflow-hidden">
                <form onSubmit={handleSearch} className="divide-y-2 divide-black">
                    <div className="flex flex-col sm:flex-row divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
                        <input
                            type="text"
                            placeholder="SEARCH RECORDS..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-grow p-4 font-mono text-sm focus:outline-none focus:bg-yellow-50"
                        />
                        <button type="submit" className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors">
                            SEARCH
                        </button>
                    </div>

                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50">
                        <div className="space-y-1">
                            <label className="font-mono text-[10px] font-black uppercase text-gray-500">From Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full p-2 border-2 border-black font-mono text-xs focus:outline-none focus:ring-4 focus:ring-yellow-300"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="font-mono text-[10px] font-black uppercase text-gray-500">To Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full p-2 border-2 border-black font-mono text-xs focus:outline-none focus:ring-4 focus:ring-yellow-300"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="font-mono text-[10px] font-black uppercase text-gray-500">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 border-2 border-black font-mono text-xs focus:outline-none focus:ring-4 focus:ring-yellow-300 bg-white"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end gap-2">
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="w-full p-2 border-2 border-black font-black text-[10px] uppercase hover:bg-gray-200 transition-colors"
                            >
                                RESET FILTERS
                            </button>
                        </div>
                    </div>

                    <div className="p-4 flex flex-wrap gap-4 items-center justify-between bg-white">
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => toggleSort('newest')}
                                className={`px-4 py-2 text-xs font-black uppercase border-2 border-black transition-all ${sort === 'newest' ? 'bg-black text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white text-black hover:translate-x-[-2px] hover:translate-y-[-2px] brutal-shadow-sm'}`}
                            >
                                NEWEST
                            </button>
                            <button
                                type="button"
                                onClick={() => toggleSort('top')}
                                className={`px-4 py-2 text-xs font-black uppercase border-2 border-black transition-all ${sort === 'top' ? 'bg-black text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white text-black hover:translate-x-[-2px] hover:translate-y-[-2px] brutal-shadow-sm'}`}
                            >
                                TOP VERIFIED
                            </button>
                        </div>
                        <div className="text-[10px] font-mono font-bold text-gray-400">
                            {data.length} RECORDS FOUND
                        </div>
                    </div>
                </form>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-64 border-2 border-black bg-gray-200 brutal-shadow"></div>
                    ))}
                </div>
            ) : data.length === 0 ? (
                <div className="text-center font-mono p-12 border-2 border-black border-dashed bg-gray-50 brutal-shadow lg:my-20">
                    <p className="text-xl mb-4 font-black uppercase">No records found matching your criteria.</p>
                    <p className="text-sm mb-8 max-w-md mx-auto">The registry is built by the community. You can change the paradigm by submitting records for your jurisdiction.</p>
                    <Link href="/upload" className="brutal-btn inline-block">
                        SUBMIT RECORD
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item) => (
                        <div key={item.id} className="border-2 border-black p-4 brutal-shadow bg-white flex flex-col justify-between h-full hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest">{item.state}</span>
                                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase" suppressHydrationWarning>
                                        {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>

                                {item.thumbnail_url ? (
                                    <Link href={`/view/${item.id}`} className="block mb-4 overflow-hidden border-2 border-black bg-gray-50 aspect-video relative">
                                        <img
                                            src={item.thumbnail_url}
                                            alt=""
                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                    </Link>
                                ) : (
                                    <div className="mb-4 aspect-video bg-gray-100 border-2 border-black flex items-center justify-center border-dashed">
                                        <span className="font-mono text-[10px] font-bold text-gray-400">NO PREVIEW</span>
                                    </div>
                                )}

                                <h3 className="font-black text-lg leading-none mb-2 line-clamp-2 min-h-[2.5rem] uppercase tracking-tighter">
                                    <Link href={`/view/${item.id}`} className="hover:bg-yellow-300 transition-colors">
                                        {item.title}
                                    </Link>
                                </h3>
                                <p className="text-xs font-mono font-bold text-gray-600 mb-4 line-clamp-1 truncate uppercase" title={item.official_name}>
                                    BY: {item.official_name}
                                </p>
                            </div>

                            <div className="flex justify-between items-center mt-auto pt-4 border-t-2 border-black border-dashed">
                                <span className="text-[10px] font-black uppercase bg-gray-100 px-2 py-1 border border-black">{item.file_type.split('/')[1] || 'FILE'}</span>
                                <div className="flex items-center gap-3">
                                    <VoteButton id={item.id} initialVotes={item.vote_count} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && hasMore && (
                <div className="text-center pt-12 pb-12">
                    <button onClick={loadMore} className="brutal-btn w-full md:w-auto px-12">
                        LOAD MORE RECORDS
                    </button>
                </div>
            )}
        </div>
    );
}
