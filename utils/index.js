export function isDuplicate(array, newItem, key) {
    return array.some(item => item[key] === newItem[key]);
}
export function flatErrorArray(array){
    return array?.flatMap(obj => Object.values(obj))
}