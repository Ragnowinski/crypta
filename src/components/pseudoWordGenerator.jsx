export function generatePseudoWord(length = 8, options = {}) {
    const consonants = 'bcdfghjklmnprstvwxz';
    const vowels = 'aeiou';
    const digits = '0123456789';
    const specials = '!@#$%&*?';

    const {
        uppercase = 1,
        digitsCount = 1,
        specialCount = 1
    } = options;

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

    for (let i = 0; i < uppercase; i++) {
        const pos = Math.floor(Math.random() * result.length);
        result = result.substring(0, pos) + result[pos].toUpperCase() + result.substring(pos + 1);
    }

    insertRandom(digits, digitsCount);
    insertRandom(specials, specialCount);

    return result;
}
