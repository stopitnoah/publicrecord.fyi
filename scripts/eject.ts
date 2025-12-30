import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

async function downloadFile(url: string, destPath: string) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    }
    const fileStream = fs.createWriteStream(destPath);
    if (res.body) {
        await finished(Readable.fromWeb(res.body as unknown as import('stream/web').ReadableStream).pipe(fileStream));
    }
}

async function eject() {
    const shouldDownload = process.argv.includes('--download');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('\n--- PUBLICRECORD.FYI EXHAUSTIVE EJECT TOOL ---');
    console.log(`TIME: ${new Date().toISOString()}`);
    if (shouldDownload) console.log('[MODE: FULL ARCHIVE - WITH EVIDENCE & THUMBNAILS]');
    else console.log('[MODE: METADATA & POINTERS ONLY]');

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

    const filesDir = path.join(ejectDir, 'files');
    const thumbDir = path.join(ejectDir, 'thumbnails');
    if (shouldDownload) {
        if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);
        if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir);
    }

    // Save raw JSON
    fs.writeFileSync(
        path.join(ejectDir, 'submissions.json'),
        JSON.stringify(data, null, 2)
    );

    let downloadCount = 0;
    let thumbCount = 0;

    if (shouldDownload) {
        console.log(`Processing ${data.length} records...`);
        for (const item of data) {
            try {
                // Download Main File
                const fileName = path.basename(item.file_url).split('?')[0];
                const dest = path.join(filesDir, fileName);
                process.stdout.write(`  -> Downloading ${item.title.substring(0, 30)}...`);
                await downloadFile(item.file_url, dest);
                item.local_path = `./files/${fileName}`;
                downloadCount++;

                // Download Thumbnail if exists
                if (item.thumbnail_url) {
                    const thumbFileName = path.basename(item.thumbnail_url).split('?')[0];
                    const thumbDest = path.join(thumbDir, thumbFileName);
                    await downloadFile(item.thumbnail_url, thumbDest);
                    item.local_thumb = `./thumbnails/${thumbFileName}`;
                    thumbCount++;
                }
                console.log(' [OK]');
            } catch (e) {
                console.log(' [FAILED]');
                console.error(`     Error processing ${item.title}:`, e);
            }
        }
    }

    // High-Fidelity HTML Index
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PublicRecord.fyi | Offline Registry Archive</title>
        <style>
            :root { --brutal-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
            body { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; line-height: 1.2; padding: 20px; background: #fff; color: #000; margin: 0; }
            .container { max-width: 1200px; margin: 20px auto; }
            header { background: #ffff00; border: 4px solid #000; padding: 40px; box-shadow: var(--brutal-shadow); margin-bottom: 60px; }
            h1 { font-size: 4rem; font-weight: 900; text-transform: uppercase; margin: 0; letter-spacing: -4px; line-height: 0.9; }
            .meta-bar { background: #000; color: #fff; padding: 5px 15px; font-weight: 900; text-transform: uppercase; margin-top: 20px; display: inline-block; font-size: 0.8rem; }
            
            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 40px; }
            .card { border: 4px solid #000; padding: 0; background: #fff; box-shadow: var(--brutal-shadow); display: flex; flex-direction: column; overflow: hidden; }
            .thumb { aspect-ratio: 16/9; background: #eee; border-bottom: 4px solid #000; overflow: hidden; }
            .thumb img { width: 100%; h-full; object-cover; filter: grayscale(100%); }
            .card:hover .thumb img { filter: grayscale(0%); }
            
            .content { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; }
            .badge { background: #000; color: #fff; padding: 2px 8px; font-size: 0.7rem; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; }
            h3 { font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin: 0 0 10px 0; line-height: 1; tracking-tighter; }
            .desc { font-size: 0.8rem; color: #333; margin-bottom: 20px; }
            
            .stats { border-top: 2px dashed #000; pt: 15px; font-size: 0.7rem; font-weight: 900; }
            .hash { background: #f5f5f5; padding: 5px; border: 1px solid #ccc; font-size: 0.6rem; word-break: break-all; margin-top: 5px; color: #666; }
            
            .links { display: flex; gap: 10px; margin-top: 20px; }
            .btn { background: #000; color: #fff; text-decoration: none; padding: 10px 20px; font-weight: 900; text-transform: uppercase; font-size: 0.8rem; flex-grow: 1; text-align: center; }
            .btn:hover { background: #333; }
            .btn-alt { background: #fff; color: #000; border: 2px solid #000; }
            
            .precedent { background: #ecfdf5; border: 4px solid #000; p: 30px; margin-bottom: 40px; box-shadow: var(--brutal-shadow); }
            footer { mt: 100px; border-t: 8px solid #000; pt: 40px; font-weight: 900; uppercase; text-align: center; font-size: 1.5rem; }
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h1>SURVIVAL ARCHIVE</h1>
                <div class="meta-bar">PUBLICRECORD.FYI Registry • Exported: ${new Date().toLocaleString()}</div>
                <p style="font-weight: 900; margin-top: 20px; max-w: 600px; font-size: 1.2rem;">
                    This is a cold-storage backup of the transparency registry. If the central servers go dark, use this index to browse and redeploy the evidence.
                </p>
            </header>

            <div class="precedent">
                <h2 style="font-black; uppercase; margin-top: 0;">⚖️ LEGAL PRECEDENT</h2>
                <p>On November 6, 2024, a Washington State Superior Court judge ruled: <strong>"Images generated by flock cameras are public records under Washington state law and they are not exempt from disclosure."</strong></p>
                <p>This archive contains data released under these and similar transparency laws.</p>
            </div>

            <div class="grid">
                ${data.map(item => `
                    <div class="card">
                        <div class="thumb">
                            ${item.local_thumb ? `<img src="${item.local_thumb}" alt="">` : `<div style="padding: 20px; color: #ccc;">NO THUMBNAIL</div>`}
                        </div>
                        <div class="content">
                            <span class="badge">${item.state} | ${item.category}</span>
                            <h3>${item.title}</h3>
                            <div class="desc">${item.description || 'No description provided.'}</div>
                            
                            <div class="stats">
                                <div>BY: ${item.official_name}</div>
                                <div>DATE: ${item.date}</div>
                                <div style="margin-top: 10px;">MAGNET URI:</div>
                                <div class="hash">${item.magnet_uri || 'N/A'}</div>
                                ${item.ipfs_cid ? `<div style="margin-top: 5px;">IPFS CID:</div><div class="hash">${item.ipfs_cid}</div>` : ''}
                            </div>

                            <div class="links">
                                ${item.local_path ? `
                                    <a href="${item.local_path}" class="btn" download>OPEN EVIDENCE</a>
                                ` : `
                                    <a href="${item.file_url}" class="btn" target="_blank">CLOUD SOURCE</a>
                                `}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <footer>
                PROTECT THE TRUTH. REPLICATE THE SWARM.
            </footer>
        </div>
    </body>
    </html>
    `;

    fs.writeFileSync(path.join(ejectDir, 'index.html'), html);

    console.log(`\nSUCCESS! Archive finalized at: ${ejectDir}`);
    console.log(`Submissions Indexed: ${data.length}`);
    console.log(`Files Processed:      ${downloadCount}`);
    console.log(`Thumbnails Saved:     ${thumbCount}`);
    console.log('\nInstructions: Zip this folder and distribute. It is designed for offline browsing.');
}

eject().catch(err => {
    console.error('Fatal error during eject:', err);
    process.exit(1);
});
