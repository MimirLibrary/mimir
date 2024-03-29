import { t } from 'i18next';
import { StatusTypes } from '@mimir/global-types';
import { OWNCLAIMED_STATUS } from '../../const/statuses';

export const isOverdue = (returnDate?: string) =>
  returnDate && new Date().getTime() >= new Date(returnDate).getTime();

export const getStatus = (
  status: string | undefined | null,
  returnDate?: string,
  isClaimedByCurrentUser?: boolean
) => {
  if (!status) {
    return null;
  }
  if (status === StatusTypes.BUSY) {
    if (isOverdue(returnDate)) {
      return StatusTypes.OVERDUE;
    }
    return isClaimedByCurrentUser ? OWNCLAIMED_STATUS : StatusTypes.BUSY;
  }
  return status;
};

export const todayCondition = (date: Date) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const dateYear = date.getFullYear();
  const dateMonthNum = date.getMonth() + 1;
  const dateDayNum = date.getDate();
  if (
    currentYear === dateYear &&
    currentMonth === dateMonthNum &&
    currentDay === dateDayNum
  )
    return true;
  else return false;
};

export const parseTodayDate = (date: Date): string => {
  const currentDate = new Date();
  const diff = currentDate.getTime() - date.getTime();

  function getNumberOfHours(diff: number) {
    return diff / 1000 / 3600;
  }

  function getNumberOfMinutes(diff: number) {
    return diff / 1000 / 60;
  }
  if (getNumberOfHours(diff) >= 1) {
    return `${Math.trunc(getNumberOfHours(diff))}${t('UserCard.hAgo')}`;
  } else if (getNumberOfHours(diff) && getNumberOfMinutes(diff) >= 1) {
    return `${Math.trunc(getNumberOfMinutes(diff))}${t('UserCard.mAgo')}`;
  } else {
    return `{t('UserCard.now')}`;
  }
};

export const specialParseDate = (date: Date) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  const dateYear = date.getFullYear();
  const dateDayNum = date.getDate();
  let dateMonth: number | string = date.getMonth() + 1;
  let dateDay: number | string = date.getDate();

  if (dateMonth < 10) {
    dateMonth = `0${dateMonth.toString()}`;
  }

  if (dateDay < 10) {
    dateDay = `0${dateDay.toString()}`;
  }
  let returnDate;
  if (currentDate.getTime() - date.getTime() < 86400000) {
    return `${Math.trunc(
      (currentDate.getTime() - date.getTime()) / 3600000
    )}${t('UserCard.hAgo')}`;
  } else if (currentDay - dateDayNum <= 7) {
    return `${currentDay - dateDayNum}${t('UserCard.dAgo')}`;
  } else if (currentYear === dateYear) {
    return `${dateMonth}.${dateDay}`;
  }

  return returnDate;
};

export const parseDate = (date?: Date) => {
  if (!date) {
    return '';
  }
  const dateYear = date.getFullYear();
  let dateMonth: number | string = date.getMonth() + 1;
  let dateDay: number | string = date.getDate();

  if (dateMonth < 10) {
    dateMonth = `0${dateMonth.toString()}`;
  }

  if (dateDay < 10) {
    dateDay = `0${dateDay.toString()}`;
  }

  return `${dateMonth}.${dateDay}.${dateYear}`;
};

export const isOverdueToday = (returnDate?: string): boolean => {
  if (!returnDate) {
    return false;
  }
  const overdueDay = new Date(returnDate).getTime();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentTimestamp = new Date(
    `${currentYear}, ${currentMonth}, ${currentDay}`
  ).getTime();
  const nextTimestamp = new Date(
    `${currentYear}, ${currentMonth}, ${currentDay + 1}`
  ).getTime();
  if (overdueDay > currentTimestamp && overdueDay < nextTimestamp) return true;
  return false;
};

export const getDateOfEarlier = (returnDate?: string): string | null => {
  if (!returnDate || !isOverdue(returnDate)) {
    return null;
  }
  const oneDay = 1000 * 60 * 60 * 24;
  const overdueDate = new Date(returnDate).getTime();
  const currentDate = Date.now();
  const difference = currentDate - overdueDate;
  const pastDay = Math.floor(difference / oneDay);
  if (pastDay < 7) return pastDay + ' day ago';
  const conditionOfDay =
    new Date(overdueDate).getDate() < 10
      ? `0${new Date(overdueDate).getDate()}`
      : new Date(overdueDate).getDate();
  const conditionOfMonth =
    new Date(overdueDate).getMonth() + 1 < 10
      ? `0${new Date(overdueDate).getMonth() + 1}`
      : new Date(overdueDate).getMonth() + 1;
  return `${conditionOfDay}.${conditionOfMonth}`;
};
