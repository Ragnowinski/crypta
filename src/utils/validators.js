export function validateSpecials(input, setErrorCallback) {
    const allowedSpecials = input.replace(/[^!"§$%&/()=?+*#.,:;'@\[\]{}<>\-]/g, '');
    const isOnlySpecials = allowedSpecials.length === input.length;
    const unique = [...new Set(allowedSpecials.split(''))].join('');

    if (!isOnlySpecials) {
        setErrorCallback('Nur Sonderzeichen erlaubt');
        setTimeout(() => setErrorCallback(''), 3000);
    } else if (unique.length !== input.length) {
        setErrorCallback('Jedes Zeichen darf nur einmal vorkommen');
        setTimeout(() => setErrorCallback(''), 3000);
    } else {
        setErrorCallback('');
    }

    return unique;
}