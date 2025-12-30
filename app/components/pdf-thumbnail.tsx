
'use client'
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfThumbnailProps {
    url: string;
    fallback: React.ReactNode;
}

export default function PdfThumbnail({ url, fallback }: PdfThumbnailProps) {
    const [hasError, setHasError] = useState(false);

    if (hasError) return <>{fallback}</>;

    return (
        <div className="w-full h-full overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
            <Document
                file={url}
                onLoadError={() => setHasError(true)}
                loading={
                    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
                        <span className="font-mono text-[10px] text-gray-400">LOADING PDF...</span>
                    </div>
                }
                error={
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <span className="font-mono text-[10px] text-red-400">PDF ERROR</span>
                    </div>
                }
                className="flex justify-center items-start w-full h-full"
            >
                <Page
                    pageNumber={1}
                    width={400}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="shadow-sm"
                />
            </Document>
            {/* Overlay for hover effect consistency */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
        </div>
    );
}
