import { headers } from 'next/headers';
import { createHash } from 'crypto';

export async function getFingerprint(): Promise<string> {
    const headersList = await headers();
    // x-forwarded-for can be a comma-separated list
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
    const ua = headersList.get('user-agent') || 'unknown';

    return createHash('sha256').update(`${ip}|${ua}`).digest('hex');
}
