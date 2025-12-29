'use client'

import { useActionState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { submitRecord, type FormState } from '@/app/actions/submit-record';
import { useState, useRef, useEffect } from 'react';

const initialState: FormState = {
    success: false,
    message: '',
};

export default function UploadForm() {
    // @ts-ignore - React 19 types might be unstable or missing in some environments
    const [state, formAction, isPending] = useActionState(submitRecord, initialState);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const captchaRef = useRef<HCaptcha>(null);

    const [fileName, setFileName] = useState<string | null>(null);

    useEffect(() => {
        if (state.message && !state.success && captchaRef.current) {
            captchaRef.current.resetCaptcha();
            setCaptchaToken(null);
        }
        if (state.success) {
            setFileName(null);
        }
    }, [state]);

    const onCaptchaChange = (token: string) => {
        setCaptchaToken(token);
    };

    return (
        <form action={formAction} className="space-y-6 border-2 border-black p-6 brutal-shadow bg-white">

            <div>
                <label htmlFor="official_name" className="block text-sm font-bold uppercase mb-1">Official Name (Department/Agency)</label>
                <input
                    id="official_name"
                    name="official_name"
                    type="text"
                    required
                    placeholder="e.g. Springfield Police Dept"
                    className="w-full border-2 border-black p-2 focus:outline-none focus:bg-yellow-50 rounded-none"
                />
            </div>

            <div>
                <label htmlFor="title" className="block text-sm font-bold uppercase mb-1">Record Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="e.g. ALPR Usage Policy 2024"
                    className="w-full border-2 border-black p-2 focus:outline-none focus:bg-yellow-50 rounded-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="state" className="block text-sm font-bold uppercase mb-1">State</label>
                    <select
                        id="state"
                        name="state"
                        required
                        className="w-full border-2 border-black p-2 focus:outline-none focus:bg-yellow-50 rounded-none bg-white"
                    >
                        <option value="">Select...</option>
                        <option value="AL">Alabama</option>
                        {/* ... abbreviated list for brevity, can populate full list ... */}
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        <option value="OTHER">Other/national</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-bold uppercase mb-1">Date of Record</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        className="w-full border-2 border-black p-2 focus:outline-none focus:bg-yellow-50 rounded-none"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-bold uppercase mb-1">Description (Optional)</label>
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="w-full border-2 border-black p-2 focus:outline-none focus:bg-yellow-50 rounded-none"
                />
            </div>

            <div>
                <label htmlFor="file" className="block text-sm font-bold uppercase mb-1">File Evidence</label>
                <div className={`border-2 border-dashed border-black p-4 text-center hover:bg-gray-50 cursor-pointer relative ${fileName ? 'bg-yellow-50 border-solid' : ''}`}>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        required
                        accept=".pdf,image/png,image/jpeg,.csv"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setFileName(file ? file.name : null);
                        }}
                    />
                    <p className="font-mono text-sm font-bold truncate">
                        {fileName ? `SELECTED: ${fileName}` : 'Drag PDF, IMG, CSV (Max 50MB)'}
                    </p>
                </div>
            </div>

            <div className="mb-4">
                {process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ? (
                    <div className="flex justify-center">
                        <HCaptcha
                            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                            onVerify={onCaptchaChange}
                            ref={captchaRef}
                        />
                    </div>
                ) : (
                    <p className="text-red-500 font-bold border-2 border-red-500 p-2">MISSING HCAPTCHA CONFIG</p>
                )}
                <input type="hidden" name="h-captcha-response" value={captchaToken || ''} />
            </div>

            {/* Status Message */}
            {state.message && (
                <div aria-live="polite" className={`p-3 border-2 border-black ${state.success ? 'bg-green-200' : 'bg-red-200'}`}>
                    <p className="font-mono font-bold">{state.message}</p>
                </div>
            )}

            <button
                disabled={isPending || !captchaToken}
                type="submit"
                className="brutal-btn w-full disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
                {isPending ? 'UPLOADING...' : 'SUBMIT RECORD'}
            </button>
        </form>
    )
}
