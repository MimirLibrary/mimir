import { useState, useEffect, Dispatch, SetStateAction, FC } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { RoutesTypes } from '../../../utils/routes';
import SearchFiltersForm from '../SearchFiltersForm';
import { t } from 'i18next';

type FilterType = {
  title: string;
  inputType: string;
  paramName: string;
  id: number;
  subAttributes: Attribute[];
};

type Attribute = {
  title: string;
  id: number;
  checked: boolean;
};
interface IProps {
  setActive: Dispatch<SetStateAction<boolean>>;
}

const UserSearch: FC<IProps> = ({ setActive }) => {
  const filterItems = [
    {
      title: t('SearchFiltersForm.UsersFilter.TakenItems'),
      paramName: 'itemsTaken',
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
      paramName: 'SortBy',
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

  const [applyFilters, setApplyFilters] = useState(false);
  const navigate = useNavigate();
  const params: { [key: string]: string[] } = {
    itemstaken: [],
    sortby: [],
  };

  const handleResetClick = () => {
    filterItems?.map((item) =>
      item?.subAttributes.forEach((subItem) => (subItem.checked = false))
    );
    setActive(false);
    navigate(RoutesTypes.READERS);
  };

  const radioBtnHandler = (attributes: Attribute[], value: string) => {
    attributes.forEach((item) => {
      item.title === value ? (item.checked = true) : (item.checked = false);
    });
  };

  const checkBoxHandler = (attribute: Attribute) =>
    (attribute.checked = !attribute.checked);

  useEffect(() => {
    filterItems?.map((item: FilterType) =>
      item?.subAttributes.map(
        (subItem) =>
          subItem.checked &&
          params[item.paramName.toLowerCase()].push(subItem.title)
      )
    );
  });

  useEffect(() => {
    if (applyFilters) {
      navigate({
        pathname: RoutesTypes.READERS,
        search: `?${createSearchParams(params)}`,
      });
      setActive(false);
    }
    setApplyFilters(false);
  }, [applyFilters]);

  return (
    <SearchFiltersForm
      attributes={filterItems}
      radioBtnHandler={radioBtnHandler}
      checkBoxHandler={checkBoxHandler}
      setApplyFilters={setApplyFilters}
      handleResetClick={handleResetClick}
    />
  );
};

export default UserSearch;
