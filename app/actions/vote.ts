'use server'

import { supabase } from '@/lib/supabase';
import { getFingerprint } from '@/lib/fingerprint';
import { revalidatePath } from 'next/cache';

export async function vote(submissionId: string) {
    const fp = await getFingerprint();

    // Try RPC first (best for atomicity and RLS bypass via SECURITY DEFINER)
    const { error } = await supabase.rpc('vote_submission', {
        sub_id: submissionId,
        fp: fp
    });

    if (error) {
        if (error.message.includes('function') && error.message.includes('not found')) {
            // Fallback: Check if already voted (client side logic on server)
            // Note: this will fail if RLS blocks INSERT/UPDATE, but we try.

            const { error: insertError } = await supabase
                .from('votes')
                .insert({ submission_id: submissionId, client_fingerprint: fp });

            if (!insertError) {
                // Increment count (Requires RLS permission or Service Key)
                // We'll try. If it fails, at least the vote record is there.
                await supabase.rpc('increment_vote_count', { row_id: submissionId });
                // Or direct update if allowed (likely not per plan)
            }
        } else {
            console.error('Vote error:', error);
        }
    }

    revalidatePath('/');
    revalidatePath(`/view/${submissionId}`);
}
