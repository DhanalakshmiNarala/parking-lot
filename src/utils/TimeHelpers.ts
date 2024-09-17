export const getTimeDifferenceInHours = (
  startTime: Date,
  endTime: Date
): number => {
  const timeDifference = endTime.getTime() - startTime.getTime();
  return Math.floor(timeDifference / (1000 * 60 * 60));
};
