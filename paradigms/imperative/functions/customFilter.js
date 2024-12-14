function customFilter(array, callback) {
    const result = []; // Step 1: Initialize an empty array for filtered results

    for (let i = 0; i < array.length; i++) { // Step 2: Loop through the original array
        if (callback(array[i], i, array)) { // Step 3: Apply the callback to each element
            result.push(array[i]); // Step 4: If the condition is true, add to the result array
        }
    }

    return result; // Step 5: Return the filtered array
}
export default customFilter