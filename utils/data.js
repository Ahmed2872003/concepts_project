function placeGivenData(data) {
  for (let prop in data) {
    if (data[prop] === "" || data[prop] === null || data[prop] === undefined)
      delete data[prop];
  }

  return data;
}

export { placeGivenData };
