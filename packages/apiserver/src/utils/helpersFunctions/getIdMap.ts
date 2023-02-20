export type IdRecord<T> = Record<number, T>;

export const getIdMap = <T extends { id: number }>(items: T[]): IdRecord<T> => {
  if (!items?.length) {
    return {};
  }
  return items.reduce((previous, current) => {
    previous[current.id] = current;
    return previous;
  }, {});
};
