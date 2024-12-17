export default function remove(objArr, matchesCB, newArr = [], currInd = 0) {
  if (currInd >= objArr.length) return newArr;

  const currElemnet = objArr[currInd];

  if (!matchesCB(currElemnet))
    return remove(objArr, matchesCB, [...newArr, currElemnet], currInd + 1);

  return remove(objArr, matchesCB, newArr, currInd + 1);
}
