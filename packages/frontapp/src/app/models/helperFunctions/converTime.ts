export const getDates = (date: Date) => {
  const currentDate = new Date();
  const startDate = new Date(date);
  const periodOfKeeping = 30;
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
