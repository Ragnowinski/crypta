export function generatePassword({
    length,
    uppercase,
    digitsCount,
    specialCount,
    specials,
    excludeSimilar,
    customExcludes,
    mode,
    generatePseudoWord
}) {
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
}
