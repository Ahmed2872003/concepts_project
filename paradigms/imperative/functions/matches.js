export default function matches(object, filterObject) {
  for (let filterKey in filterObject) {
    if (object[filterKey] === undefined) continue;

    if (object[filterKey] !== filterObject[filterKey]) return false;
  }

  return true;
}
