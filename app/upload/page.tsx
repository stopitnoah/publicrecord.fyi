import UploadForm from './form';

export default function UploadPage() {
    return (
        <div className="max-w-xl mx-auto py-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Submit Evidence</h2>
            <p className="font-mono text-sm mb-6 border-l-4 border-black pl-4">
                Contribute to the public record. All submissions are verified by the community.
                Anonymous upload is permitted but IP usage is tracked to prevent abuse.
            </p>

            <UploadForm />
        </div>
    );
}
