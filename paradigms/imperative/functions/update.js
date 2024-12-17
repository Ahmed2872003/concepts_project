export default function update(objectArray, newData) {
  for (let i = 0; i < objectArray.length; i++) {
    for (let key in newData) {
      if (objectArray[i][key] === undefined) continue;

      objectArray[i][key] = newData[key];
    }
  }
}
