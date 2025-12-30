import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Renamed supabaseKey to supabaseAnonKey for consistency with the new createClient call

if (!supabaseUrl || !supabaseAnonKey) { // Updated condition to use supabaseAnonKey
    console.warn('Missing Supabase environment variables');
}

// Supabase client singleton
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
