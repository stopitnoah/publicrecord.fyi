'use server'
import { supabase } from '@/lib/supabase';

export async function fetchSubmissions(
    offset: number,
    limit: number = 20,
    search?: string,
    state?: string,
    category?: string,
    sort: 'newest' | 'top' = 'newest',
    startDate?: string,
    endDate?: string
) {
    try {
        let query = supabase
            .from('submissions')
            .select('*');

        if (state && state !== '') {
            query = query.eq('state', state);
        }

        if (category && category !== '') {
            query = query.eq('category', category);
        }

        if (search && search !== '') {
            query = query.or(`official_name.ilike.%${search}%,title.ilike.%${search}%,description.ilike.%${search}%,extracted_text.ilike.%${search}%`);
        }

        if (startDate && startDate !== '') {
            query = query.gte('date', startDate);
        }

        if (endDate && endDate !== '') {
            query = query.lte('date', endDate);
        }

        if (sort === 'top') {
            query = query.order('vote_count', { ascending: false });
        }

        // Always order by created_at as secondary or primary
        query = query.order('created_at', { ascending: false });

        const { data, error } = await query.range(offset, offset + limit - 1);

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
