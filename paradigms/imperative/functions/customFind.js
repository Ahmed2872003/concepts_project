function customFind(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
            return array[i];
        }
    }
    return undefined;
}
export default customFind