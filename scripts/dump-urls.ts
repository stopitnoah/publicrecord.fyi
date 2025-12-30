
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';

function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            envContent.split('\n').forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {
                    process.env[key.trim()] = value.trim();
                }
            });
        }
    } catch (e) {
        console.error('Error loading .env.local:', e);
    }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function dumpUrls() {
    const { data, error } = await supabase.from('submissions').select('title, file_url, file_type').limit(10);
    if (error) {
        console.error('Error fetching submissions:', error);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
}

dumpUrls().catch(console.error);
