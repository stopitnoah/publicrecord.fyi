'use server'

import { supabase } from '@/lib/supabase';
import { getFingerprint } from '@/lib/fingerprint';
import crypto from 'crypto';
import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

const MAX_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'text/csv'];
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;

export type FormState = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    debug?: string[];
}

export async function submitRecord(prevState: FormState, formData: FormData): Promise<FormState> {
    const file = formData.get('file') as File;
    const official_name = formData.get('official_name') as string;
    const title = formData.get('title') as string;
    const state = formData.get('state') as string;
    const date = formData.get('date') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string || 'general';
    const captchaToken = formData.get('h-captcha-response') as string;

    const debugLogs: string[] = [];

    // 1. Validate Captcha
    if (!HCAPTCHA_SECRET) {
        console.warn("HCAPTCHA_SECRET missing");
        return { success: false, message: 'Server configuration error (Captcha)' };
    }

    if (!captchaToken) {
        return { success: false, message: 'Please complete the captcha' };
    }

    try {
        const verifyRes = await fetch('https://api.hcaptcha.com/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `response=${captchaToken}&secret=${HCAPTCHA_SECRET}`
        });
        const verifyJson = await verifyRes.json();
        if (!verifyJson.success) {
            return { success: false, message: 'Captcha verification failed' };
        }
    } catch (e) {
        return { success: false, message: 'Captcha service error' };
    }

    // 2. Validate File
    if (!file || file.size === 0) return { success: false, message: 'No file uploaded' };
    if (file.size > MAX_SIZE) return { success: false, message: 'File too large (>50MB)' };
    if (!ALLOWED_TYPES.includes(file.type)) return { success: false, message: 'Invalid file type' };

    // 3. Rate Limit
    const fingerprint = await getFingerprint();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count, error: countError } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .eq('client_fingerprint', fingerprint)
        .gt('created_at', oneHourAgo);

    if (countError) {
        console.error('Rate limit error', countError);
    } else if (count && count >= 5) {
        return { success: false, message: 'Rate limit exceeded (5 submissions/hour)' };
    }

    // 4. Upload File
    const fileExt = file.name.split('.').pop();
    if (!fileExt) return { success: false, message: 'Invalid file extension' };

    const safeName = Math.random().toString(36).substring(2, 15) + '_' + Date.now() + '.' + fileExt;

    // Generate Magnet Link
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const hash = crypto.createHash('sha1').update(buffer).digest('hex');
    const trackers = [
        'udp://tracker.opentrackr.org:1337/announce',
        'udp://tracker.openbittorrent.com:6969/announce',
        'wss://tracker.openwebtorrent.com'
    ].map(t => `&tr=${encodeURIComponent(t)}`).join('');
    const magnetUri = `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(file.name)}${trackers}`;

    const { error: uploadError } = await supabase.storage
        .from('submissions')
        .upload(safeName, file);

    if (uploadError) {
        return { success: false, message: 'Upload failed: ' + uploadError.message };
    }

    const publicUrlResult = supabase.storage.from('submissions').getPublicUrl(safeName);
    const publicUrl = publicUrlResult.data.publicUrl;

    // 4.5. Pin to IPFS (Pinata)
    let ipfsCid: string | null = null;
    const pinataJwt = process.env.PINATA_JWT;
    if (pinataJwt) {
        try {
            const formDataPinata = new FormData();
            formDataPinata.append('file', file);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

            const pinataRes = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${pinataJwt}`
                },
                body: formDataPinata,
                signal: controller.signal
            });
            clearTimeout(timeout);

            if (pinataRes.ok) {
                const pinataJson = await pinataRes.json();
                ipfsCid = pinataJson.IpfsHash;
                debugLogs.push("IPFS: Pinned successfully");
            } else {
                console.error('Pinata upload failed', await pinataRes.text());
                debugLogs.push("IPFS: External pinning failed");
            }
        } catch (e) {
            console.error('IPFS Pinning error', e);
            debugLogs.push("IPFS: Connection error or timeout");
        }
    } else {
        debugLogs.push("IPFS: Skipping (No API key)");
    }

    // 4.6. Generate Thumbnail (Images only)
    let thumbnailUrl: string | null = null;
    if (file.type.startsWith('image/')) {
        try {
            const thumbBuffer = await sharp(buffer)
                .resize(600, 600, { fit: 'inside', withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toBuffer();

            const thumbName = `thumb_${Date.now()}_${safeName.replace(/\.[^/.]+$/, ".jpg")}`;
            const { error: thumbUploadError } = await supabase.storage
                .from('submissions')
                .upload(thumbName, thumbBuffer, { contentType: 'image/jpeg' });

            if (!thumbUploadError) {
                thumbnailUrl = supabase.storage.from('submissions').getPublicUrl(thumbName).data.publicUrl;
                debugLogs.push("Image: Thumbnail generated");
            } else {
                console.error('Thumbnail upload failed', thumbUploadError);
                debugLogs.push("Image: Thumbnail upload failed");
            }
        } catch (e) {
            console.error('Thumbnail generation error', e);
            debugLogs.push("Image: Sharp processing error");
        }
    }

    // 4.7. OCR Processing (Images only)
    let extractedText: string | null = null;
    if (file.type.startsWith('image/')) {
        try {
            const worker = await createWorker('eng');
            const { data: { text } } = await worker.recognize(buffer);
            extractedText = text;
            await worker.terminate();
            debugLogs.push("Image: OCR processing complete");
        } catch (e) {
            console.error('OCR processing error', e);
            debugLogs.push("Image: OCR failed");
        }
    }

    // 5. Insert Record
    const { data: insertData, error: insertError } = await (supabase
        .from('submissions')
        .insert({
            official_name,
            title,
            state,
            date,
            description,
            file_url: publicUrl,
            file_type: file.type,
            client_fingerprint: fingerprint,
            category: category,
            magnet_uri: magnetUri,
            ipfs_cid: ipfsCid,
            thumbnail_url: thumbnailUrl,
            extracted_text: extractedText
        } as any) as any)
        .select()
        .single();

    if (insertError) {
        await supabase.storage.from('submissions').remove([safeName]);
        return { success: false, message: 'Database insert failed: ' + insertError.message, debug: debugLogs };
    }

    return {
        success: true,
        message: 'Record verified and archived',
        debug: debugLogs,
        // Next.js redirect doesn't work in useActionState sometimes, so we'll handle it in the component if needed
        // but traditionally we'd redirect here.
        // We'll return the ID so the client can redirect if success.
        errors: { redirectId: [insertData.id] }
    };
}
