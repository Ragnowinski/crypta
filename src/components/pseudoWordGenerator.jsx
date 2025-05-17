export function generatePseudoWord(length = 8, options = {}) {
    const SIMILAR = 'iloILO01';

    const fullConsonants = 'bcdfghjklmnprstvwxzILO';
    const fullVowels = 'aeiou';
    const fullDigits = '0123456789';
    const fullSpecials = '!@#$%&*?';

    const {
        uppercase = 1,
        digitsCount = 1,
        specialCount = 1,
        excludeSimilar = false,
        customExcludes = '',
        specials = fullSpecials
    } = options;

    let consonants = fullConsonants;
    let vowels = fullVowels;
    let digits = fullDigits;
    let finalSpecials = specials || fullSpecials;

    if (excludeSimilar) {
        const similarRegex = new RegExp(`[${SIMILAR}]`, 'g');
        consonants = consonants.replace(similarRegex, '');
        vowels = vowels.replace(similarRegex, '');
        digits = digits.replace(similarRegex, '');
        finalSpecials = finalSpecials.replace(similarRegex, '');
    }

    if (!excludeSimilar && customExcludes) {
        const esc = customExcludes.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const customRegex = new RegExp(`[${esc}]`, 'g');
        consonants = consonants.replace(customRegex, '');
        vowels = vowels.replace(customRegex, '');
        digits = digits.replace(customRegex, '');
        finalSpecials = finalSpecials.replace(customRegex, '');
    }

    const getRandom = (chars) => chars.charAt(Math.floor(Math.random() * chars.length));

    let result = '';
    for (let i = 0; i < Math.max(length - uppercase - digitsCount - specialCount, 0); i++) {
        result += i % 2 === 0 ? getRandom(consonants) : getRandom(vowels);
    }

    for (let i = 0; i < uppercase; i++) {
        const pos = Math.floor(Math.random() * (result.length + 1));
        result = result.slice(0, pos) + getRandom(consonants.toUpperCase()) + result.slice(pos);
    }

    for (let i = 0; i < digitsCount; i++) {
        const pos = Math.floor(Math.random() * (result.length + 1));
        result = result.slice(0, pos) + getRandom(digits) + result.slice(pos);
    }

    for (let i = 0; i < specialCount; i++) {
        const pos = Math.floor(Math.random() * (result.length + 1));
        result = result.slice(0, pos) + getRandom(finalSpecials) + result.slice(pos);
    }

    while (result.length < length) {
        result += getRandom(consonants + vowels);
    }

    return result;
}

export default generatePseudoWord;
