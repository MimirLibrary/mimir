export type GroupRecord<T> = Record<number, T[]>;

export const groupByKey = <T>(items: T[], key: string): GroupRecord<T> => {
  if (!items?.length) {
    return {};
  }
  return items.reduce((previous, current) => {
    if (previous[current[key]]) {
      previous[current[key]].push(current);
    } else {
      previous[current[key]] = [current];
    }
    return previous;
  }, {});
};
