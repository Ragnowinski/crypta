import React from 'react';
import {
    Ruler, List, CaseUpper, Asterisk, Hash, Key, Type, EyeOff, Ban
} from 'lucide-react';

const PasswordSettings = ({
    length, setLength,
    count, setCount,
    uppercase, setUppercase,
    specialCount, setSpecialCount,
    digitsCount, setDigitsCount,
    specials, setSpecials,
    mode, setMode,
    excludeSimilar, setExcludeSimilar,
    customExcludes, setCustomExcludes,
    specialsError, customExcludesError,
    setCustomExcludesError,
    validateSpecials,
    darkMode
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col md:col-span-3 md:flex-row gap-4">
            <label className="flex-1 flex flex-col">
                <span className="flex items-center gap-2"><Ruler size={16} />Länge:</span>
                <input type="number" className={`rounded px-2 py-1 ${darkMode ? 'text-black bg-white' : 'text-black bg-gray-100'} border`} value={length} min={8} max={32} onChange={e => setLength(+e.target.value)} />
            </label>

            <label className="flex-1 flex flex-col">
                <span className="flex items-center gap-2"><List size={16} />Anzahl:</span>
                <input type="number" className={`rounded px-2 py-1 ${darkMode ? 'text-black bg-white' : 'text-black bg-gray-100'} border`} value={count} min={1} max={50} onChange={e => setCount(+e.target.value)} />
            </label>
        </div>

        <div className="flex flex-col md:col-span-3 md:flex-row gap-4">
            <label className="flex-1 flex flex-col">
                <span className="flex items-center gap-2"><CaseUpper size={16} />Großbuchstaben:</span>
                <input type="number" className={`rounded px-2 py-1 ${darkMode ? 'text-black bg-white' : 'text-black bg-gray-100'} border`} value={uppercase} min={0} max={length - 1} onChange={e => setUppercase(+e.target.value)} />
            </label>

            <label className="flex-1 flex flex-col">
                <span className="flex items-center gap-2"><Asterisk size={16} />Sonderzeichen:</span>
                <input type="number" className={`rounded px-2 py-1 ${darkMode ? 'text-black bg-white' : 'text-black bg-gray-100'} border`} value={specialCount} min={0} max={length - 1} onChange={e => setSpecialCount(+e.target.value)} />
            </label>

            <label className="flex-1 flex flex-col">
                <span className="flex items-center gap-2"><Hash size={16} />Ziffern:</span>
                <input type="number" className={`rounded px-2 py-1 ${darkMode ? 'text-black bg-white' : 'text-black bg-gray-100'} border`} value={digitsCount} min={0} max={length - 1} onChange={e => setDigitsCount(+e.target.value)} />
            </label>
        </div>

        <label className="flex flex-col col-span-full">
            <span className="flex items-center gap-2"><Key size={16} />Erlaubte Sonderzeichen:</span>
            <input type="text" className={`rounded px-2 py-1 border ${darkMode ? 'text-black bg-white' : 'text-black bg-gray-100'}`} value={specials} onChange={(e) => setSpecials(validateSpecials(e.target.value))} />
            {specialsError && <div className="text-red-500 text-xs animate-pulse mt-1">{specialsError}</div>}
        </label>

        <label className="flex flex-col col-span-full">
            <span className="flex items-center gap-2"><Type size={16} />Modus:</span>
            <select className={`rounded px-2 py-1 ${darkMode ? 'text-black bg-white' : 'text-black bg-gray-100'} border`} value={mode} onChange={e => setMode(e.target.value)}>
                <option value="pseudo">Wortähnlich</option>
                <option value="random">Zufällig</option>
            </select>
        </label>

        <label className="flex items-center gap-2 col-span-full">
            <input type="checkbox" checked={excludeSimilar} onChange={e => setExcludeSimilar(e.target.checked)} />
            <span><EyeOff size={16} className="inline mr-1" />Ähnliche Zeichen vermeiden <span className="font-mono">(z. B. O, 0, I, l, 1)</span></span>
        </label>

        {!excludeSimilar && (
            <label className="flex flex-col col-span-full">
                <span className="flex items-center gap-2"><Ban size={16} />Zusätzliche auszuschließende Zeichen:</span>
                <input
                    type="text"
                    className={`rounded px-2 py-1 ${darkMode ? 'text-black bg-white' : 'text-black bg-gray-100'} border`}
                    value={customExcludes}
                    onChange={e => {
                        const input = e.target.value;
                        const cleaned = [...new Set(input.toLowerCase())].join('');
                        if (cleaned.length !== input.length) {
                            setCustomExcludesError('Doppelte Zeichen wurden automatisch entfernt (Groß-/Kleinschreibung wird ignoriert)');
                        } else {
                            setCustomExcludesError('');
                        }
                        setCustomExcludes(cleaned);
                    }}
                />
                {customExcludesError && <div className="mt-1 text-xs text-red-500 animate-pulse">{customExcludesError}</div>}
            </label>
        )}
    </div>
);

export default PasswordSettings;
