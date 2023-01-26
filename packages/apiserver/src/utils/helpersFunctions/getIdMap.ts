export const getIdMap = <T extends { id: number }>(
  items: T[]
): Record<number, T> => {
  if (!items?.length) {
    return {};
  }
  return items.reduce((previous, current) => {
    previous[current.id] = current;
    return previous;
  }, {});
};
