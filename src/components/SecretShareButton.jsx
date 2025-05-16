import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

const SecretShareButton = ({ password, onShare }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const shareSecret = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://crypta-secret-share.chmill-net.workers.dev/secret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: password }),
      });
      if (!response.ok) throw new Error('Fehler beim Teilen');
      const data = await response.json();

      try {
        await navigator.clipboard.writeText(data.shareUrl);
        if (onShare) onShare('Sicherer Link zum Passwort in Zwischenablage');
      } catch (clipError) {
        setError('Fehler beim Kopieren in die Zwischenablage');
        console.error('Clipboard error:', clipError);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        disabled={loading}
        onClick={shareSecret}
        title="Passwort teilen"
        className="p-1 rounded bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
        style={{ width: 32, height: 32 }}
      >
        <Share2 size={18} />
      </button>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </>
  );
};

export default SecretShareButton;
