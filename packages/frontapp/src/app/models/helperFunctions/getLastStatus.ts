export const getLastStatus = (
  listOfStatuses: Array<any>,
  person_id: number
) => {
  if (listOfStatuses) {
    const lastStatus = listOfStatuses
      .filter((item) => item?.person_id === person_id)
      .slice(-1)[0];
    return lastStatus;
  }
  return;
};
