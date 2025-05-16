import React from 'react';
import PasswordItem from './PasswordItem';

const PasswordOutput = ({ passwords, copiedIndex, copyToClipboard, darkMode, onShare }) => {
    return (
        <div className={`rounded p-4 space-y-2 text-sm font-mono ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`} style={{ fontFamily: '"JetBrains Mono", monospace' }}>
            {passwords.map((pw, i) => (
                <PasswordItem
                    key={i}
                    password={pw}
                    copied={copiedIndex === i}
                    copy={() => copyToClipboard(pw)}
                    darkMode={darkMode}
                    onShare={onShare}
                />
            ))}
        </div>
    );
};

export default PasswordOutput;
