export function ArrayToString(array:string[],sep:string=" "){
    let result = "";
    for (let index = 0; index < array.length; index++) {
        result = result + array[index] + sep
    }
    return result;
}