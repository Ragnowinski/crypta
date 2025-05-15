import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
            <div className="text-center">
                <AlertTriangle size={64} className="text-yellow-400 mb-4 inline" />
                <h1 className="text-6xl font-bold mb-2">404</h1>
                <p className="text-xl mb-4">Oops... Hier gibt's nichts zu sehen 🕳️</p>
                <p className="text-md text-gray-400 mb-8">Entweder hast du dich vertippt oder diese Seite existiert einfach nicht.</p>
                <Link to="/" className="text-blue-400 hover:underline">Zurück zur Startseite</Link>
            </div>
        </div>
    );
};

export default NotFound;