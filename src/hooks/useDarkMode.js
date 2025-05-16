import { useState, useEffect } from 'react';

export function useDarkMode() {
    // Prüfe initial, ob User bevorzugt Dark Mode (optional)
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // State mit LocalStorage Sync, damit Dark Mode beim Reload erhalten bleibt
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved !== null ? JSON.parse(saved) : prefersDark;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return { darkMode, setDarkMode };
}
