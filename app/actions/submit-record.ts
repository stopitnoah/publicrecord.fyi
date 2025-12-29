'use server'

import { supabase } from '@/lib/supabase';
import { getFingerprint } from '@/lib/fingerprint';
import { redirect } from 'next/navigation';

const MAX_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'text/csv'];
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;

export type FormState = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
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

    // 1. Validate Captcha
    if (!HCAPTCHA_SECRET) {
        console.warn("HCAPTCHA_SECRET missing");
        // Allow in dev if missing? No, failing secure.
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

    // Note: If exact count is slow, this might be a bottleneck, but for MVP it's fine.
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

    // Sanitize filename
    const safeName = Math.random().toString(36).substring(2, 15) + '_' + Date.now() + '.' + fileExt;

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('submissions')
        .upload(safeName, file);

    if (uploadError) {
        return { success: false, message: 'Upload failed: ' + uploadError.message };
    }

    const publicUrlResult = supabase.storage.from('submissions').getPublicUrl(safeName);
    const publicUrl = publicUrlResult.data.publicUrl;

    // 5. Insert Record
    const { data: insertData, error: insertError } = await supabase
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
            category: category
        })
        .select()
        .single();

    if (insertError) {
        // Cleanup file if insert fails? (Optional but good practice).
        await supabase.storage.from('submissions').remove([safeName]);
        return { success: false, message: 'Database insert failed: ' + insertError.message };
    }

    redirect(`/view/${insertData.id}`);
    // Redirect throws, so code below is unreachable
}
