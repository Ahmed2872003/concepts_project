export default function every(arrObj, cb, currInd = 0) {
  if (currInd >= arrObj.length) return true;

  if (!cb(arrObj[currInd], currInd, arrObj)) return false;

  return every(arrObj, cb, currInd + 1);
}
