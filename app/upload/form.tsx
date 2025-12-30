'use client'

import { useActionState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { submitRecord, type FormState } from '@/app/actions/submit-record';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const initialState: FormState = {
    success: false,
    message: '',
};

export default function UploadForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(submitRecord, initialState);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const captchaRef = useRef<HCaptcha>(null);

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (state.message && !state.success && captchaRef.current) {
            captchaRef.current.resetCaptcha();
            // Wrap in setTimeout to avoid synchronous setState during render/effect cycle
            setTimeout(() => setCaptchaToken(null), 0);
        }
        if (state.success && state.errors?.redirectId) {
            // Success! Wait a bit then redirect
            const id = state.errors.redirectId[0];
            router.push(`/view/${id}`);
        }
    }, [state, router]);

    const [category, setCategory] = useState<string>('general');

    const onCaptchaChange = (token: string) => {
        setCaptchaToken(token);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            if (selected.type.startsWith('image/')) {
                const url = URL.createObjectURL(selected);
                setPreviewUrl(url);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    return (
        <form action={formAction} className="space-y-6 border-4 border-black p-6 brutal-shadow bg-white animate-in slide-in-from-right-4 duration-500">

            {/* Category Selector */}
            <div className="space-y-3">
                <label className="block text-xs font-black uppercase mb-1 text-gray-400 tracking-widest">Submission Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                        { value: 'alpr_camera', label: 'CAMERAS' },
                        { value: 'policy', label: 'POLICIES' },
                        { value: 'violation', label: 'VIOLATIONS' },
                        { value: 'other', label: 'OTHER' },
                    ].map((cat) => (
                        <label
                            key={cat.value}
                            className={`border-2 border-black p-3 text-center cursor-pointer text-[10px] font-black uppercase transition-all active:translate-y-1 ${category === cat.value ? 'bg-black text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-yellow-50 brutal-shadow-sm'}`}
                        >
                            <input
                                type="radio"
                                name="category"
                                value={cat.value}
                                checked={category === cat.value}
                                onChange={() => setCategory(cat.value)}
                                className="sr-only"
                            />
                            {cat.label}
                        </label>
                    ))}
                </div>
                <label
                    className={`block w-full border-2 border-black p-3 text-center cursor-pointer text-[10px] font-black uppercase transition-all active:translate-y-1 ${category === 'tracking' ? 'bg-red-600 text-white border-red-600' : 'bg-red-50 hover:bg-red-100 text-red-800'}`}
                >
                    <input
                        type="radio"
                        name="category"
                        value="tracking"
                        checked={category === 'tracking'}
                        onChange={() => setCategory('tracking')}
                        className="sr-only"
                    />
                    🔥 Public Official Tracking (High Risk / High Accountability)
                </label>
            </div>

            {/* Alert Box */}
            {category === 'tracking' && (
                <div className="bg-red-100 border-b-8 border-red-600 p-4 font-mono">
                    <p className="font-black text-red-800 uppercase text-xs mb-2">⚠️ JURISDICTIONAL ARCHIVE NOTICE</p>
                    <p className="text-xs text-red-700 leading-relaxed italic border-l-2 border-red-600 pl-3">
                        &quot;Use your state&apos;s open records law to request the flock vehicle tracking
                        data on your public officials... especially the ones that have supported
                        spending your dollars building the surveillance state infrastructure.&quot;
                    </p>
                    <p className="text-[10px] font-black mt-2 uppercase text-red-600 tracking-tighter">Legal Precedent Established in Washington State (Nov 2024)</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="official_name" className="block text-[10px] font-black uppercase mb-1 text-gray-400">Department / Agency</label>
                        <input
                            id="official_name"
                            name="official_name"
                            type="text"
                            required
                            placeholder="e.g. LAPD, Boston PD"
                            className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-50 rounded-none brutal-shadow-inner"
                        />
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-[10px] font-black uppercase mb-1 text-gray-400">Record Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            placeholder="e.g. 2024 Flock Policy Manual"
                            className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-50 rounded-none brutal-shadow-inner"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="state" className="block text-[10px] font-black uppercase mb-1 text-gray-400">State Code</label>
                            <select
                                id="state"
                                name="state"
                                required
                                className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-50 rounded-none bg-white brutal-shadow-inner"
                            >
                                <option value="">SELECT...</option>
                                {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'FED'].map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-[10px] font-black uppercase mb-1 text-gray-400">Record Date</label>
                            <input
                                id="date"
                                name="date"
                                type="date"
                                required
                                className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-50 rounded-none brutal-shadow-inner"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-[10px] font-black uppercase mb-1 text-gray-400">Context / Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={1}
                            placeholder="Add brief archival context..."
                            className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-yellow-50 rounded-none brutal-shadow-inner"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-black uppercase mb-1 text-gray-400">File Evidence (Max 50MB)</label>
                <div className={`border-4 border-dashed border-black p-8 text-center hover:bg-gray-50 cursor-pointer relative transition-colors ${file ? 'bg-green-50 border-solid' : 'bg-white'}`}>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        required
                        accept=".pdf,image/png,image/jpeg,.csv"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleFileChange}
                    />
                    <div className="space-y-4">
                        {previewUrl ? (
                            <div className="mx-auto w-32 h-32 border-2 border-black brutal-shadow overflow-hidden bg-white">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <span className="text-4xl block opacity-30">📁</span>
                        )}
                        <p className="font-mono text-xs font-black truncate max-w-xs mx-auto uppercase">
                            {file ? `CAPTURED: ${file.name}` : 'DRAG PDF, IMAGE, OR CSV HERE'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
                <div className="flex-grow">
                    {process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ? (
                        <HCaptcha
                            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                            onVerify={onCaptchaChange}
                            ref={captchaRef}
                        />
                    ) : (
                        <div className="bg-red-500 text-white p-2 font-mono text-xs font-black">MISSING HCAPTCHA CONFIG</div>
                    )}
                    <input type="hidden" name="h-captcha-response" value={captchaToken || ''} />
                </div>

                <button
                    disabled={isPending || !captchaToken}
                    type="submit"
                    className="brutal-btn w-full md:w-auto px-12 py-6 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-lg group relative overflow-hidden"
                >
                    <span className="relative z-10">{isPending ? 'INDEXING...' : 'ARCHIVE RECORD'}</span>
                    {isPending && (
                        <div className="absolute inset-0 bg-yellow-400 animate-pulse duration-500"></div>
                    )}
                </button>
            </div>

            {/* Progress / Status Overlay */}
            {isPending && (
                <div className="border-2 border-black p-4 bg-yellow-50 font-mono text-[10px] space-y-2 animate-pulse">
                    <p className="font-black uppercase">Archive Process Initialized...</p>
                    <div className="w-full bg-gray-200 h-2 border border-black">
                        <div className="bg-black h-full animate-progress" style={{ width: '60%' }}></div>
                    </div>
                    <div className="flex justify-between font-bold text-gray-500">
                        <span>Generating Magnet URI</span>
                        <span>Pinning to IPFS</span>
                        <span>OCR Analysis</span>
                    </div>
                </div>
            )}

            {state.message && (
                <div aria-live="polite" className={`p-4 border-4 border-black brutal-shadow font-mono ${state.success ? 'bg-green-400' : 'bg-red-400'}`}>
                    <p className="font-black uppercase text-xs mb-2">{state.success ? 'SUCCESS' : 'ERROR'}</p>
                    <p className="font-bold text-sm tracking-tight">{state.message}</p>
                    {state.debug && (
                        <ul className="mt-2 text-[10px] border-t border-black pt-2 opacity-70">
                            {state.debug.map((log, i) => <li key={i}>→ {log}</li>)}
                        </ul>
                    )}
                </div>
            )}

            <style jsx>{`
                @keyframes progress {
                    0% { width: 0% }
                    100% { width: 100% }
                }
                .animate-progress {
                    animation: progress 10s linear infinite;
                }
            `}</style>
        </form>
    )
}
