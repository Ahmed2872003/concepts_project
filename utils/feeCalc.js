export default function calculateFee(borrowDate, returnDate, duration, fee) {
  let requiredFee = 0;
  const nOfDays = Math.floor(
    (returnDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const extraDays = nOfDays - duration;

  if (extraDays > 0) requiredFee = fee * extraDays;

  return requiredFee;
}
