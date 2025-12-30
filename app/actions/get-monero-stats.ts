'use server'

export async function getMoneroStats() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd', {
            next: { revalidate: 300 } // Cache for 5 mins
        });
        const data = await res.json();
        const price = data.monero?.usd || 0;

        // Balance fetch would go here if we had a view key/node
        // For now, we mock it as 'Restricted' or '0.00' to show the UI
        const address = process.env.MONERO_ADDRESS;
        const viewKey = process.env.MONERO_VIEW_KEY;

        return {
            price,
            balance: viewKey ? 'Fetch Error (Node Offline)' : 'Restricted (View Key Required)',
            address: address || 'Not Configured'
        };
    } catch (e) {
        console.error('XMR fetch error', e);
        return { price: 0, balance: 'API ERROR', address: 'N/A' };
    }
}
