'use server'
import { supabase } from '@/lib/supabase';

export async function incrementDownloadCount(id: string) {
    const { error } = await supabase.rpc('increment_download_count', { row_id: id });
    if (error) {
        console.error('Increment download error:', error);
    }
}
