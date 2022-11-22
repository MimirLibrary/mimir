export const adaptFiltersToAttrs = (
  filterName: Record<string, number | undefined>
) =>
  Object.keys(filterName).map((key) => ({
    title: key,
    numberOfItems: filterName[key],
  }));

export const fromSearchParamsToFilters = (params: URLSearchParams) => {
  const result: Record<string, Array<string>> = {};
  params.forEach((value, key) => {
    result[key] = result[key] ? [...result[key], value] : [value];
  });
  return result;
};
