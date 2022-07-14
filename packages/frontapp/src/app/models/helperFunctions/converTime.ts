import { t } from 'i18next';

export const periodOfKeeping = 30;

export const getDates = (date: Date) => {
  const currentDate = new Date();
  const startDate = new Date(date);
  const returnDate = new Date(
    startDate.setDate(startDate.getDate() + periodOfKeeping)
  );
  return {
    currentDate,
    startDate,
    returnDate,
  };
};

export const isOverdue = (date: Date) =>
  getDates(date).currentDate <= getDates(date).returnDate;

export const getStatus = (status: string | undefined, date: any) => {
  if (!status) return null;
  if (status === 'Free') return 'Free';
  if (status === 'Prolong') return 'Prolong';
  if (isOverdue(date)) return 'Busy';
  return 'Overdue';
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

export const specialParseDate = (date: Date) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const dateYear = date.getFullYear();
  const dateMonthNum = date.getMonth() + 1;
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
  console.log(currentDate.getTime() - date.getTime());
  if (currentDate.getTime() - date.getTime() < 86400000) {
    return `${Math.trunc(
      (currentDate.getTime() - date.getTime()) / 3600000
    )}${t('UserCard.hAgo')}`;
  } else if (currentDay - dateDayNum <= 7) {
    return `${currentDay - dateDayNum}${t('UserCard.dAgo')}`;
  } else if (currentYear === dateYear) {
    return `${dateMonth}.${dateDay}`;

    return `${dateMonth}.${dateDay}.${dateYear}`;
  }

  return returnDate;
};

export const parseDate = (date: Date) => {
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
