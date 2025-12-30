'use client'

import { useState } from 'react';

export default function InteractiveViewHelpers({ id, magnetUri }: { id: string, magnetUri?: string }) {
    const [copiedLink, setCopiedLink] = useState(false);
    const [copiedMagnet, setCopiedMagnet] = useState(false);

    const copyLink = () => {
        const url = `${window.location.origin}/view/${id}`;
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    const copyMagnet = () => {
        if (!magnetUri) return;
        navigator.clipboard.writeText(magnetUri);
        setCopiedMagnet(true);
        setTimeout(() => setCopiedMagnet(false), 2000);
    };

    return (
        <>
            {/* We will inject these into the server component's slots via children or just render them as buttons to be used in the main page */}
            <div className="hidden">Interactive component for state management</div>
        </>
    );
}

export function CopyLinkButton({ id }: { id: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const url = `${window.location.origin}/view/${id}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`text-[10px] font-black uppercase border-2 border-black px-2 py-1 transition-all active:translate-y-1 ${copied ? 'bg-green-400' : 'hover:bg-black hover:text-white bg-white'}`}
        >
            {copied ? 'Link Copied!' : 'Copy Share Link'}
        </button>
    );
}

export function MagnetCaptureButton({ uri }: { uri: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(uri);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`block w-full border-2 border-black font-black p-3 text-center uppercase tracking-tighter transition-all active:translate-y-1 ${copied ? 'bg-green-400 text-black border-green-400' : 'bg-yellow-400 text-black border-yellow-400 hover:bg-black hover:text-yellow-400'}`}
        >
            {copied ? 'MAGNET CAPTURED' : 'Capture Magnet URI'}
        </button>
    );
}
