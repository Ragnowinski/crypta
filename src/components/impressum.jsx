import React from 'react';
import { Link } from 'react-router-dom';

const Impressum = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 text-sm text-gray-200 dark:text-gray-300">
            <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Impressum</h1>

            <p className="mb-2">
                Angaben gemäß § 5 TMG:
            </p>

            <p className="mb-4">
                Niclas Chmill<br />
                Alemannenstr. 30<br />
                44579 Castrop-Rauxel<br />
                Deutschland
            </p>

            <p className="mb-4">
                Kontakt:<br />
                E-Mail: <a href="mailto:niclas@chmill.net" className="text-blue-400 hover:underline">niclas@chmill.net</a>
            </p>

            <p className="mb-4">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br />
                Niclas Chmill<br />
                Adresse wie oben
            </p>

            <p className="mt-8 text-xs text-gray-400">
                Dieses Impressum gilt auch für folgende Domains und Subdomains: crypta.chmill.net
            </p>

            <div className="mt-6 text-center">
                <Link to="/" className="text-blue-400 hover:underline">Zurück zur Startseite</Link>
            </div>
        </div>
    );
};

export default Impressum;