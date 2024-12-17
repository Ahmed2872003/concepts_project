import { matches } from "./arrayUtilities.js";

export default function remove(objectArray, filterObject) {
  const newArray = [];

  for (let i = 0; i < objectArray.length; i++) {
    if (!matches(objectArray[i], filterObject)) newArray.push(objectArray[i]);
  }

  return newArray;
}
