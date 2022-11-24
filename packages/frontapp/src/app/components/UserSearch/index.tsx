import { Dispatch, SetStateAction, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesTypes } from '../../../utils/routes';
import SearchFiltersForm from '../SearchFiltersForm';
import { t } from 'i18next';
import { useFilters } from '../../hooks/useFilters';
import { ParamsType } from '../../types/filterTypes';

interface IProps {
  setActive: Dispatch<SetStateAction<boolean>>;
}

const UserSearch: FC<IProps> = ({ setActive }) => {
  const filterItems = [
    {
      title: t('SearchFiltersForm.UsersFilter.TakenItems'),
      paramName: 'itemstaken',
      id: 1,
      inputType: 'checkBox',
      subAttributes: [
        {
          title: t('SearchFiltersForm.UsersFilter.Nothing'),
          id: 1,
          checked: false,
        },
        {
          title: t('SearchFiltersForm.UsersFilter.TenItems'),
          id: 2,
          checked: false,
        },
        {
          title: t('SearchFiltersForm.UsersFilter.MoreThanTen'),
          id: 3,
          checked: false,
        },
        {
          title: t('SearchFiltersForm.UsersFilter.All'),
          id: 4,
          checked: false,
        },
      ],
    },
    {
      title: t('SearchFiltersForm.UsersFilter.SortBy'),
      paramName: 'sortby',
      id: 2,
      inputType: 'radio',
      subAttributes: [
        {
          title: t('SearchFiltersForm.UsersFilter.Alphabetical'),
          id: 1,
          checked: false,
        },
        {
          title: t('SearchFiltersForm.UsersFilter.ThingsTaken'),
          id: 2,
          checked: false,
        },
        {
          title: t('SearchFiltersForm.UsersFilter.OverdueDeals'),
          id: 3,
          checked: false,
        },
      ],
    },
  ];

  const navigate = useNavigate();
  const params: ParamsType = {
    itemstaken: [],
    sortby: [],
  };

  const { filters, setFilters, setIsFiltersApplied } = useFilters(
    params,
    RoutesTypes.READERS
  );

  const handleResetClick = () => {
    setActive(false);
    navigate(RoutesTypes.READERS);
  };

  const handleApplyFilters = (e: Record<string, Array<string>>) => {
    setIsFiltersApplied(true);
    setFilters(e);
    setActive(false);
  };

  return (
    <SearchFiltersForm
      key={JSON.stringify(filters)}
      attributes={filterItems}
      onFiltersApply={handleApplyFilters}
      onReset={handleResetClick}
      defaultFilters={filters}
    />
  );
};

export default UserSearch;
