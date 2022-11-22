import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { RoutesTypes } from '../../utils/routes';
import { fromSearchParamsToFilters } from '../models/helperFunctions/filters';
import { ParamsType } from '../types/filterTypes';

export const useFilters = (
  initParams: ParamsType,
  to: RoutesTypes
): {
  filters: Record<string, Array<string>>;
  setFilters: Dispatch<SetStateAction<Record<string, string[]>>>;
  setIsFiltersApplied: Dispatch<SetStateAction<boolean>>;
} => {
  const [searchParams] = useSearchParams();
  const filtersParams = fromSearchParamsToFilters(searchParams);
  const [filters, setFilters] = useState(filtersParams);
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);
  const navigate = useNavigate();

  const params = { ...initParams };

  useEffect(() => {
    if (isFiltersApplied) {
      Object.entries(filters)?.map(
        ([key, value]) =>
          value &&
          (Array.isArray(value)
            ? value.forEach((el) => el && params[key].push(el))
            : params[key].push(value!))
      );
      navigate({
        pathname: to,
        search: `?${createSearchParams(params)}`,
      });
    }
    setIsFiltersApplied(false);
  }, [isFiltersApplied]);

  useEffect(() => {
    const filtersParams = fromSearchParamsToFilters(searchParams);
    !isFiltersApplied && setFilters(filtersParams);
  }, [searchParams]);

  return { filters, setFilters, setIsFiltersApplied };
};
