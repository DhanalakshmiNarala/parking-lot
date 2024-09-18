export const getTimeDifferenceInHours = (
  startTime: Date,
  endTime: Date
): number => {
  const timeDifference = endTime.getTime() - startTime.getTime();
  return Math.floor(timeDifference / (1000 * 60 * 60));
};

export const isISOFormatDateString = (dateString: string): boolean => {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;
  return isoRegex.test(dateString);
};
