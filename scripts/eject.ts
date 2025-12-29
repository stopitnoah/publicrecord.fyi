import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

async function eject() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('--- PUBLICRECORD.FYI EJECT TOOL ---');
    console.log('Fetching all submissions...');

    const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    const ejectDir = path.join(process.cwd(), 'eject_archive');
    if (!fs.existsSync(ejectDir)) fs.mkdirSync(ejectDir);

    // Save JSON metadata
    fs.writeFileSync(
        path.join(ejectDir, 'submissions.json'),
        JSON.stringify(data, null, 2)
    );

    // Create a simple HTML index for offline viewing
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>PublicRecord.fyi - Offline Archive</title>
        <style>
            body { font-family: monospace; padding: 20px; background: #f0f0f0; }
            .card { border: 2px solid black; padding: 15px; margin-bottom: 20px; background: white; box-shadow: 4px 4px 0px 0px black; }
            .badge { background: black; color: white; padding: 2px 5px; font-size: 12px; }
            .safe { color: green; font-weight: bold; }
        </style>
    </head>
    <body>
        <h1>OFFLINE ARCHIVE [v1.0]</h1>
        <p>This is a static backup of all metadata and P2P links. Access files via Magnets/CIDs.</p>
        <hr/>
        ${data.map(item => `
            <div class="card">
                <h3>${item.title}</h3>
                <p><strong>Official:</strong> ${item.official_name} (${item.state})</p>
                <p><strong>Description:</strong> ${item.description || 'None'}</p>
                <div style="font-size: 11px; word-break: break-all;">
                    <p><strong>MAGNET:</strong> <br/> <a href="${item.magnet_uri}">${item.magnet_uri}</a></p>
                    <p><strong>IPFS:</strong> <br/> ${item.ipfs_cid || 'N/A'}</p>
                    <p><strong>ORIGINAL:</strong> <br/> <a href="${item.file_url}">${item.file_url}</a></p>
                </div>
            </div>
        `).join('')}
    </body>
    </html>
    `;

    fs.writeFileSync(path.join(ejectDir, 'index.html'), html);

    console.log(`Success! Archive created at: ${ejectDir}`);
    console.log('Instructions: Zip this folder and distribute it to any one who will help keep the data alive.');
}

eject();
