import React from 'react';
import { Link } from 'react-router-dom';

const Datenschutz = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 text-sm text-gray-800">
            <h1 className="text-xl font-bold mb-4 text-gray-900">Datenschutzerklärung</h1>

            <p className="mb-4">
                Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten (nachfolgend kurz „Daten“) innerhalb unseres Onlineangebotes auf.
                Es werden keine personenbezogenen Daten gespeichert, ausgewertet oder an Dritte weitergegeben.
            </p>

            <p className="mb-4">
                <strong>Hosting durch GitHub Pages</strong><br />
                Diese Website wird bei GitHub Pages gehostet. Beim Besuch der Seite werden von GitHub ggf. technische Zugriffsdaten (wie IP-Adresse, Browsertyp, Datum/Uhrzeit) in Server-Logs gespeichert. Diese Daten dienen ausschließlich der technischen Bereitstellung und Fehlersuche.
            </p>

            <p className="mb-4">
                <strong>Keine Cookies, keine Analyse</strong><br />
                Wir verwenden keine Cookies, kein Tracking und keine Analyse-Tools.
            </p>

            <p className="mb-4">
                <strong>Schriftarten</strong><br />
                Diese Website verwendet JetBrains Mono, eingebunden über lokale Dateien. Es findet keine Verbindung zu Servern Dritter (z. B. Google Fonts) statt.
            </p>

            <p className="mb-4">
                <strong>Kontakt</strong><br />
                Bei Fragen zum Datenschutz kontaktieren Sie uns bitte per E-Mail: <a href="mailto:niclas@chmill.net" className="text-blue-600 hover:underline">niclas@chmill.net</a>
            </p>

            <div className="mt-6 text-center">
                <Link to="/" className="text-blue-600 hover:underline">Zurück zur Startseite</Link>
            </div>
        </div>
    );
};

export default Datenschutz;
