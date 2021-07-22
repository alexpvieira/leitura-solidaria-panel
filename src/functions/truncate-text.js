export default function truncateText(text) {
    var separator = '...'
    var strLen = 20

    if (text.length <= strLen) return text

    var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2)

    return text.substr(0, frontChars) +
        separator +
        text.substr(text.length - backChars)
}