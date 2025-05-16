import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ClipboardCopy } from 'lucide-react';

const SecretSharePage = ({ darkMode }) => {
    const { id } = useParams();
    const [secret, setSecret] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchSecret = async () => {
            try {
                const res = await fetch(`https://crypta-secret-share.chmill-net.workers.dev/share/${id}`);
                if (!res.ok) {
                    throw new Error('Secret nicht gefunden oder bereits abgerufen.');
                }
                const data = await res.json();
                setSecret(data.secret);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSecret();
    }, [id]);

    const copyToClipboard = () => {
        if (secret) {
            navigator.clipboard.writeText(secret);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (loading) return <div className={`p-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Lade Passwort…</div>;

    if (error)
        return (
            <div className={`p-6 text-center text-red-600`}>
                <p>{error}</p>
                <Link to="/" className="text-blue-500 hover:underline mt-4 block">
                    Zurück zur Startseite
                </Link>
            </div>
        );

    return (
        <div className={`p-6 max-w-xl mx-auto text-center ${darkMode ? 'text-white' : 'text-black'}`}>
            <h1 className="text-3xl font-bold mb-4">Dein geteiltes Passwort</h1>
            <div
                className="p-4 rounded font-mono select-all text-lg mb-4"
                style={{
                    backgroundColor: darkMode ? '#1f2937' : '#e5e7eb',
                    color: darkMode ? 'white' : 'black',
                    userSelect: 'all',
                }}
            >
                {secret}
            </div>
            <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2 mx-auto mb-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
                <ClipboardCopy size={20} />
                {copied ? 'Kopiert!' : 'Kopieren'}
            </button>
            <p className="text-sm text-gray-400">
                Dieses Passwort kann nur einmal abgerufen werden und ist danach nicht mehr verfügbar.
            </p>
            <Link to="/" className="text-blue-500 hover:underline mt-6 inline-block">
                Zurück zur Startseite
            </Link>
        </div>
    );
};

export default SecretSharePage;
