export function generatePseudoWord(length = 8, options = {}) {
    const SIMILAR = 'iloILO01';

    const fullConsonants = 'bcdfghjklmnprstvwxzILO'; // absichtlich mit ähnlichen Zeichen
    const fullVowels = 'aeiou';
    const fullDigits = '0123456789';
    const fullSpecials = '!@#$%&*?';

    const {
        uppercase = 1,
        digitsCount = 1,
        specialCount = 1,
        excludeSimilar = false,
        customExcludes = ''
    } = options;

    let consonants = fullConsonants;
    let vowels = fullVowels;
    let digits = fullDigits;
    let specials = fullSpecials;

    // Ähnliche Zeichen entfernen
    if (excludeSimilar) {
        const similarRegex = new RegExp(`[${SIMILAR}]`, 'g');
        consonants = consonants.replace(similarRegex, '');
        vowels = vowels.replace(similarRegex, '');
        digits = digits.replace(similarRegex, '');
        specials = specials.replace(similarRegex, '');
    }

    // Benutzerdefinierte Zeichen entfernen (nur wenn excludeSimilar aus)
    if (!excludeSimilar && customExcludes) {
        const esc = customExcludes.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const customRegex = new RegExp(`[${esc}]`, 'g');
        consonants = consonants.replace(customRegex, '');
        vowels = vowels.replace(customRegex, '');
        digits = digits.replace(customRegex, '');
        specials = specials.replace(customRegex, '');
        console.log('Custom excludes applied:', esc);
    }

    // Fallback bei leerem Zeichensatz
    if (!consonants.length) consonants = 'bcdfghjkmnprstvwxz';
    if (!vowels.length) vowels = 'aeiou';
    if (!digits.length) digits = '123456789';
    if (!specials.length) specials = '!@#$%&*?';

    let result = '';
    let useConsonant = true;

    while (result.length < length - (uppercase + digitsCount + specialCount)) {
        const chars = useConsonant ? consonants : vowels;
        result += chars[Math.floor(Math.random() * chars.length)];
        useConsonant = !useConsonant;
    }

    const insertRandom = (source, count) => {
        for (let i = 0; i < count; i++) {
            const char = source[Math.floor(Math.random() * source.length)];
            const pos = Math.floor(Math.random() * (result.length + 1));
            result = result.slice(0, pos) + char + result.slice(pos);
        }
    };

    // Großbuchstaben einbauen (zufällig)
    for (let i = 0; i < uppercase; i++) {
        const pos = Math.floor(Math.random() * result.length);
        result = result.substring(0, pos) + result[pos].toUpperCase() + result.substring(pos + 1);
    }

    insertRandom(digits, digitsCount);
    insertRandom(specials, specialCount);

    return result;
}
