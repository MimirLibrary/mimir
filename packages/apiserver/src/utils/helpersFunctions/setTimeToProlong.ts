export const setTimeToProlong = (
  currentDate: Date,
  amountOfDays: number
): Date => {
  const currentlyDate = new Date(currentDate);
  const changeDate = currentlyDate.setDate(
    currentlyDate.getDate() + amountOfDays
  );
  return new Date(changeDate);
};
