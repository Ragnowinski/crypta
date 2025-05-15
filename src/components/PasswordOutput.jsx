import React from 'react';
import { ClipboardCopy } from 'lucide-react';

const PasswordOutput = ({ passwords, copiedIndex, copyToClipboard, darkMode }) => (
    <div className={`rounded p-4 space-y-2 text-sm font-mono ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`} style={{ fontFamily: '"JetBrains Mono", monospace' }}>
        {passwords.map((pw, i) => (
            <div key={i} className={`flex justify-between items-center rounded px-4 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className="break-all w-full">{pw}</span>
                <button className="ml-4 p-1 rounded" onClick={() => copyToClipboard(pw, i)}>
                    <ClipboardCopy size={16} />
                </button>
                {copiedIndex === i && <span className="text-green-400 text-xs animate-pulse ml-2">Kopiert!</span>}
            </div>
        ))}
    </div>
);

export default PasswordOutput;
