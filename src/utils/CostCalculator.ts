export const getCostForParkingHours = (hours: number) => {
  if (hours <= BASE_RATE_DURATION_IN_HOURS) {
    return BASE_RATE;
  }
  const extraHours = hours - 0.5;
  return BASE_RATE + extraHours * PER_HOUR_RATE;
};
