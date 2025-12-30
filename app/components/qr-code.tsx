export default function QRCode({ data, size = 150 }: { data: string, size?: number }) {
    if (!data || data === 'Not Configured') return null;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;

    return (
        <div className="bg-white p-2 border-2 border-black inline-block">
            <img src={qrUrl} alt="Payment QR Code" width={size} height={size} className="grayscale" />
        </div>
    );
}
