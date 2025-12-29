'use client'
import { incrementDownloadCount } from '@/app/actions/download';

export default function DownloadButton({ fileUrl, fileType, id }: { fileUrl: string, fileType: string, id: string }) {
    return (
        <a
            href={fileUrl}
            download
            target="_blank"
            onClick={() => incrementDownloadCount(id)}
            className="brutal-btn text-xs inline-flex items-center gap-2"
        >
            <span>DOWNLOAD FILE</span>
            <span className="opacity-50">({fileType.split('/')[1].toUpperCase()})</span>
        </a>
    );
}
