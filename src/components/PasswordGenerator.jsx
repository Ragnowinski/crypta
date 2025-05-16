import React, { useState } from 'react';
import { KeyRound, Sun, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import PasswordSettings from './PasswordSettings';
import PasswordOutput from './PasswordOutput';
import { generatePseudoWord } from './pseudoWordGenerator';
import { validateSpecials } from '../utils/validators';

const PasswordGenerator = ({ darkMode, setDarkMode }) => {
  const [length, setLength] = useState(14);
  const [count, setCount] = useState(10);
  const [uppercase, setUppercase] = useState(2);
  const [specialCount, setSpecialCount] = useState(2);
  const [digitsCount, setDigitsCount] = useState(1);
  const [specials, setSpecials] = useState('!@#$%&*?');
  const [mode, setMode] = useState('pseudo');
  const [excludeSimilar, setExcludeSimilar] = useState(true);
  const [customExcludes, setCustomExcludes] = useState('');
  const [specialsError, setSpecialsError] = useState('');
  const [customExcludesError, setCustomExcludesError] = useState('');
  const [passwords, setPasswords] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [lengthError, setLengthError] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  const generate = () => {
    const required = uppercase + specialCount + digitsCount;
    if (required > length) {
      setLengthError(
        'Summe aus Großbuchstaben, Ziffern und Sonderzeichen darf die Passwortlänge nicht übersteigen.'
      );
      setPasswords([]);
      return;
    }
    setLengthError('');
    const arr = Array.from({ length: count }, () => generatePassword());
    setPasswords(arr);
  };

  const generatePassword = () => {
    if (mode === 'pseudo') {
      return generatePseudoWord(length, {
        uppercase,
        digitsCount,
        specialCount,
      });
    }

    let base = 'abcdefghijklmnopqrstuvwxyz';
    let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let digits = '0123456789';
    let specialSet = specials;

    const similar = 'iloILO01';
    if (excludeSimilar) {
      upper = upper.replace(new RegExp('[' + similar + ']', 'g'), '');
      digits = digits.replace(new RegExp('[' + similar + ']', 'g'), '');
      specialSet = specialSet.replace(new RegExp('[' + similar + ']', 'g'), '');
    }

    if (!excludeSimilar && customExcludes) {
      const esc = customExcludes.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      base = base.replace(new RegExp('[' + esc + ']', 'g'), '');
      upper = upper.replace(new RegExp('[' + esc + ']', 'g'), '');
      digits = digits.replace(new RegExp('[' + esc + ']', 'g'), '');
      specialSet = specialSet.replace(new RegExp('[' + esc + ']', 'g'), '');
    }

    const arr = [];
    for (let i = 0; i < uppercase; i++) {
      if (upper.length)
        arr.push(upper[Math.floor(Math.random() * upper.length)]);
    }
    for (let i = 0; i < digitsCount; i++) {
      if (digits.length) arr.push(digits[Math.floor(Math.random() * digits.length)]);
    }
    for (let i = 0; i < specialCount; i++) {
      if (specialSet.length)
        arr.push(specialSet[Math.floor(Math.random() * specialSet.length)]);
    }
    while (arr.length < length) {
      arr.push(base[Math.floor(Math.random() * base.length)]);
    }
    return arr.sort(() => 0.5 - Math.random()).join('');
  };

  const copyToClipboard = (pw) => {
    navigator.clipboard.writeText(pw);
    setCopiedIndex(passwords.findIndex((p) => p === pw));
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // sharePassword kannst du hier integrieren, wenn Secret Share Funktion vorhanden ist
  // Beispiel-Callback:
  const sharePassword = async (pw) => {
    try {
      const response = await fetch(
        'https://crypta-secret-share.chmill-net.workers.dev/secret',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret: pw }),
        }
      );
      if (!response.ok) throw new Error('Fehler beim Teilen');
      const data = await response.json();

      setShareMessage('Link in Zwischenablage kopiert!');
      setTimeout(() => setShareMessage(''), 3000);
      navigator.clipboard.writeText(data.shareUrl);
      return data.shareUrl;
    } catch (error) {
      console.error(error);
      setShareMessage('Fehler beim Teilen des Passworts');
      setTimeout(() => setShareMessage(''), 3000);
      return null;
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 py-8 transition-colors ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
    >
      <div className="max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <KeyRound size={28} className="text-blue-400" />
            Crypta Passwortgenerator
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Dark/Light umschalten"
            className="p-2"
          >
            <Sun size={20} />
          </button>
        </div>

        {lengthError && (
          <div
            className={`mb-4 p-3 rounded text-sm font-medium animate-pulse ${darkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800'
              }`}
          >
            {lengthError}
          </div>
        )}

        <PasswordSettings
          length={length}
          setLength={setLength}
          count={count}
          setCount={setCount}
          uppercase={uppercase}
          setUppercase={setUppercase}
          specialCount={specialCount}
          setSpecialCount={setSpecialCount}
          digitsCount={digitsCount}
          setDigitsCount={setDigitsCount}
          specials={specials}
          setSpecials={setSpecials}
          mode={mode}
          setMode={setMode}
          excludeSimilar={excludeSimilar}
          setExcludeSimilar={setExcludeSimilar}
          customExcludes={customExcludes}
          setCustomExcludes={setCustomExcludes}
          specialsError={specialsError}
          customExcludesError={customExcludesError}
          setCustomExcludesError={setCustomExcludesError}
          validateSpecials={(input) => validateSpecials(input, setSpecialsError)}
          darkMode={darkMode}
        />

        <div className="text-center mb-4">
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={generate}
          >
            <RefreshCcw size={18} />
            Generieren
          </button>
        </div>

        <PasswordOutput
          passwords={passwords}
          copiedIndex={copiedIndex}
          copyToClipboard={copyToClipboard}
          darkMode={darkMode}
          onShare={sharePassword}
        />

        {shareMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-4 py-2 rounded shadow-lg text-sm z-50 select-none">
            {shareMessage}
          </div>
        )}

        <footer className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <div>
            Made with Love – Ragnowinski – {new Date().getFullYear()}
            <br />
            <Link
              to="/impressum"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Impressum
            </Link>
            <span className="mx-2">|</span>
            <Link
              to="/datenschutz"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Datenschutz
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PasswordGenerator;
