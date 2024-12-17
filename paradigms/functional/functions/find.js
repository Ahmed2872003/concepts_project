export default function find(objArr, matchesCB, matchedArr = [], currInd = 0) {
  if (currInd >= objArr.length) return matchedArr;

  const currElemnet = objArr[currInd];

  if (matchesCB(currElemnet))
    return find(objArr, matchesCB, [...matchedArr, currElemnet], currInd + 1);

  return find(objArr, matchesCB, matchedArr, currInd + 1);
}
