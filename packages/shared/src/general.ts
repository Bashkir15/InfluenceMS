// Small test hueristic to see if a string is possibly a json string
export function isSerializedJSON(str: string) {
    return str[0] === '{' && str[str.length - 1] === '}'
}