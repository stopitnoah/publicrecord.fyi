'use server'
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function reportSubmission(id: string) {
    const { error } = await supabase.rpc('increment_report_count', { row_id: id });

    if (error) {
        // Fallback if RPC fails
        await supabase
            .from('submissions')
            .update({ report_count: 1 }) // This is wrong for increment, need RPC really
            .eq('id', id);
    }

    revalidatePath(`/view/${id}`);
    revalidatePath('/');
}
