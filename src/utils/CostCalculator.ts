const baseRate = 50;
const baseRateDurationInHours = 0.5; // 30 mins
const perHourRate = 100; // Rate for after initial 30 mins

export const getCostForParkingHours = (hours: number) => {
  if (hours <= baseRateDurationInHours) {
    return baseRate;
  }
  const extraHours = hours - 0.5;
  return baseRate + extraHours * perHourRate;
};
