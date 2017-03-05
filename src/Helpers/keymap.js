function toKeys(arr) {
    var keys = {};
    arr.forEach(function (x, ix) {
        keys['index-' + ix] = x;
    });
    return keys;
}
function toArr(obj) {
    var arr = [];
    for (var prop in obj) {
        arr.push(obj[prop]);
    }
    return arr;
}
export { toArr, toKeys };