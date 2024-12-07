const getDays = (startDate, endDate) =>
  (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

export { getDays };
