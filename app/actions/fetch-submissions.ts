'use server'
import { supabase } from '@/lib/supabase';

export async function fetchSubmissions(offset: number, limit: number = 20) {
    try {
        const { data, error } = await supabase
            .from('submissions')
            .select('*')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error(error);
            return [];
        }
        return data || [];
    } catch (e) {
        console.error('Fetch error:', e);
        return [];
    }
}
