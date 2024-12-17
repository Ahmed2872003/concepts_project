export default function update(objArr, newData, matchesCB, newArr = [], currInd = 0)
{
  if (currInd >= objArr.length) return newArr;

  const currElemnet = objArr[currInd];

  if (matchesCB(currElemnet)) {
    const updatedObj = { ...currElemnet, ...newData };

    return update(objArr, newData, matchesCB, [...newArr, updatedObj], currInd + 1);
  }

  return update(objArr, newData, matchesCB, [...newArr, currElemnet], currInd + 1);
}