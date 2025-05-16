import React, { useState, useEffect } from 'react';
import { ClipboardCopy, Share2 } from 'lucide-react';

const PasswordItem = ({ password, copied, copy, darkMode, onShare }) => {
    const [shareUrl, setShareUrl] = useState(null);
    const [shareCopied, setShareCopied] = useState(false);
    const [sharing, setSharing] = useState(false);
    const [shareError, setShareError] = useState('');

    const handleShareClick = async () => {
        if (sharing) return; // Verhindert mehrfach Klicks
        setSharing(true);
        setShareError('');
        try {
            const url = await onShare(password);
            if (url) {
                setShareUrl(url);
                setShareCopied(false);
                setTimeout(() => setShareUrl(null), 8000); // Link nach 8 Sekunden ausblenden
            } else {
                setShareError('Fehler beim Teilen');
            }
        } catch {
            setShareError('Fehler beim Teilen');
        } finally {
            setSharing(false);
        }
    };

    const copyShareUrl = () => {
        if (shareUrl) {
            navigator.clipboard.writeText(shareUrl);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 2000);
        }
    };

    return (
        <div className={`flex flex-col rounded px-4 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between">
                <span className="break-all w-full font-mono">{password}</span>
                <button
                    onClick={copy}
                    className={`ml-4 p-1 rounded ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
                    title="In Zwischenablage kopieren"
                    aria-label="Copy password"
                    type="button"
                >
                    <ClipboardCopy size={18} />
                </button>
                <button
                    onClick={handleShareClick}
                    className={`ml-2 p-1 rounded bg-green-600 hover:bg-green-700 text-white flex items-center justify-center`}
                    title="Passwort teilen"
                    aria-label="Share password"
                    type="button"
                    disabled={sharing}
                >
                    <Share2 size={18} />
                </button>
            </div>

            {shareUrl && (
                <div className="mt-2 flex items-center space-x-2 bg-gray-900 text-gray-100 p-2 rounded select-text font-mono break-all">
                    <span className="flex-1">{shareUrl}</span>
                    <button
                        onClick={copyShareUrl}
                        className={`p-1 rounded ${shareCopied ? 'text-green-400' : 'text-gray-400 hover:text-white'}`}
                        title="Link kopieren"
                        aria-label="Copy share link"
                        type="button"
                    >
                        <ClipboardCopy size={16} />
                    </button>
                </div>
            )}

            {shareError && (
                <div className="mt-2 text-red-500 text-sm font-medium">
                    {shareError}
                </div>
            )}

            {copied && (
                <div className="mt-2 text-green-400 text-sm font-medium animate-pulse select-none">
                    Passwort kopiert!
                </div>
            )}
        </div>
    );
};

export default PasswordItem;
