export const sharePassword = async (password) => {
    try {
        const response = await fetch(
            'https://crypta-secret-share.chmill-net.workers.dev/secret',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secret: password }),
            }
        );
        if (!response.ok) throw new Error('Fehler beim Teilen');
        const data = await response.json();
        return data.shareUrl;
    } catch (error) {
        console.error(error);
        return null;
    }
};
