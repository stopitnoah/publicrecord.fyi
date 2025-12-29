'use client'
import { useState } from 'react';
import { reportSubmission } from '@/app/actions/report';

export default function ReportButton({ id }: { id: string }) {
    const [reported, setReported] = useState(false);

    if (reported) {
        return (
            <span className="text-[10px] font-bold text-red-600 uppercase border border-red-600 px-2 py-1">
                Reported
            </span>
        );
    }

    return (
        <button
            onClick={async () => {
                if (confirm('Flag this submission for moderation?')) {
                    setReported(true);
                    await reportSubmission(id);
                }
            }}
            className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase underline decoration-dotted transition-colors"
        >
            Report Abuse
        </button>
    );
}
