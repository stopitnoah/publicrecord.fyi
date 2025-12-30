
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

const BAD_TITLES = [
    "Illegal Federal Data Sharing Report",
    "Police Chief Misuse Arrest Record",
    "83,000 Camera Network Search Audit"
];

async function cleanupBadRecords() {
    console.log('Cleaning up bad records...');

    // 1. Get the files to potentially delete from storage (optional, but good practice)
    const { data: records } = await supabase
        .from('submissions')
        .select('file_url, title')
        .in('title', BAD_TITLES);

    if (records && records.length > 0) {
        console.log(`Found ${records.length} bad records to delete.`);

        // 2. Delete from database
        const { error } = await supabase
            .from('submissions')
            .delete()
            .in('title', BAD_TITLES);

        if (error) {
            console.error('Error deleting records:', error);
        } else {
            console.log('Successfully deleted bad records from database.');
        }
    } else {
        console.log('No bad records found.');
    }
}

cleanupBadRecords().catch(console.error);
