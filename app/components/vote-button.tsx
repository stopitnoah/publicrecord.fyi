'use client'

import { useOptimistic, startTransition } from 'react';
import { vote } from '@/app/actions/vote';

export default function VoteButton({ id, initialVotes }: { id: string, initialVotes: number }) {
    const [optimisticVotes, addOptimisticVote] = useOptimistic(
        initialVotes,
        (state, newVote: number) => state + newVote
    );

    return (
        <button
            onClick={() => {
                startTransition(() => {
                    addOptimisticVote(1);
                });
                vote(id);
            }}
            className="flex items-center gap-2 border-2 border-black px-3 py-1 hover:bg-yellow-100 transition-colors font-mono text-sm active:translate-y-1"
            title="Verify this record"
        >
            <span className="text-lg">▲</span>
            <span className="font-bold">{optimisticVotes}</span>
        </button>
    );
}
