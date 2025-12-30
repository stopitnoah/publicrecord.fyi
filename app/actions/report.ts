'use server'
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function reportSubmission(id: string) {
    const { error } = await supabase.rpc('increment_report_count', { row_id: id });

    if (error) {
        // Fallback if RPC fails (Note: this still requires RLS permissions to update)
        // Note: Direct SQL increment like `report_count = report_count + 1` isn't easy via JS SDK update
        // but we'll try to fetch and set if RPC is missing.
        const { data } = await supabase.from('submissions').select('report_count').eq('id', id).single();
        if (data) {
            await supabase
                .from('submissions')
                .update({ report_count: (data.report_count || 0) + 1 })
                .eq('id', id);
        }
    }

    revalidatePath(`/view/${id}`);
    revalidatePath('/');
}
