import { IStatus } from '../../types';

export const getLastStatus = (
  listOfStatuses: Array<IStatus>,
  person_id: number
) => {
  if (listOfStatuses) {
    const lastStatus = listOfStatuses
      .filter((item) => parseInt(item?.person?.id as string) === person_id)
      .slice(-1)[0];
    return lastStatus;
  }
  return;
};
