import { matches } from "./arrayUtilities.js";

export default function find(objectArray, filterObject) {
  const matchElements = [];

  for (let i = 0; i < objectArray.length; i++) {
    if (matches(objectArray[i], filterObject))
      matchElements.push(objectArray[i]);
  }

  return matchElements;
}
