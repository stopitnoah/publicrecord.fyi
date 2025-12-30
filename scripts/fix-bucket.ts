
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

async function fixBucket() {
    console.log('Checking bucket: submissions...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
        console.error('Error listing buckets:', listError);
        return;
    }

    const subBucket = buckets.find(b => b.name === 'submissions');

    if (!subBucket) {
        console.log('Bucket "submissions" not found. Creating it...');
        const { error: createError } = await supabase.storage.createBucket('submissions', {
            public: true,
            allowedMimeTypes: ['application/pdf', 'image/png', 'image/jpeg', 'text/csv', 'text/plain'],
            fileSizeLimit: 52428800 // 50MB
        });
        if (createError) console.error('Error creating bucket:', createError);
        else console.log('Bucket created and set to public.');
    } else {
        console.log('Bucket found. Current public status:', subBucket.public);
        if (!subBucket.public) {
            console.log('Setting bucket to public...');
            const { error: updateError } = await supabase.storage.updateBucket('submissions', {
                public: true
            });
            if (updateError) console.error('Error updating bucket:', updateError);
            else console.log('Bucket updated to public.');
        } else {
            console.log('Bucket is already public.');
        }
    }
}

fixBucket().catch(console.error);
