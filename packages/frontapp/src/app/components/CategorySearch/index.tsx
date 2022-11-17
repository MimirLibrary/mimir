import { useState, useEffect, Dispatch, SetStateAction, FC } from 'react';
import SearchFiltersForm, {
  ItemsType,
  SubItemType,
} from '../SearchFiltersForm';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useAppSelector } from '../../hooks/useTypedSelector';
import useMaterialFilter from '../../hooks/useMaterialFilter';
import { getStatus } from '../../models/helperFunctions/converTime';
import { GetAllMaterialsQuery } from '@mimir/apollo-client';
import { locationIds } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';
import { RoutesTypes } from '../../../utils/routes';
import { t } from 'i18next';

type ParamsType = {
  [key: string]: string[];
};

interface IProps {
  setActive: Dispatch<SetStateAction<boolean>>;
}

const CategorySearch: FC<IProps> = ({ setActive }) => {
  let idOfItems = 0;
  const [allFilters, setAllFilters] = useState<ItemsType[]>([]);
  const locations = useAppSelector(locationIds);
  const [availableMaterial, setAvailableMaterial] = useState<
    GetAllMaterialsQuery['getAllMaterials']
  >([]);
  const { data, error } = useGetAllMaterialsQuery({
    variables: { locations },
    fetchPolicy: 'no-cache',
  });

  const allCategories = useMaterialFilter(availableMaterial, 'category');
  const allAuthors = useMaterialFilter(availableMaterial, 'author');
  const allTypes = useMaterialFilter(availableMaterial, 'type');
  const allAvailability = useMaterialFilter(availableMaterial, 'availability');
  const allSortBy = {
    'By date added': undefined,
    'By date of writing': undefined,
  };

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const customObjectFilter = (filterName: {
    [author: string]: number | undefined;
  }) =>
    Object.keys(filterName).map((key) => ({
      title: key,
      numberOfItems: filterName[key],
      id: idOfItems++,
      checked: false,
    }));

  const FilteringObjects = () => {
    setAllFilters([
      {
        title: t('SearchFiltersForm.ItemFilter.SortBy'),
        paramName: 'sortby',
        inputType: 'radio',
        id: 5,
        subAttributes: customObjectFilter(allSortBy),
      },
      {
        title: t('SearchFiltersForm.ItemFilter.Items'),
        paramName: 'items',
        inputType: 'radio',
        id: 2,
        subAttributes: customObjectFilter(allTypes),
      },
      {
        title: t('SearchFiltersForm.ItemFilter.Availability'),
        paramName: 'availability',
        inputType: 'checkbox',
        id: 1,
        subAttributes: customObjectFilter(allAvailability),
      },
      {
        title: t('SearchFiltersForm.ItemFilter.Categories'),
        paramName: 'categories',
        inputType: 'checkbox',
        id: 3,
        subAttributes: customObjectFilter(allCategories),
      },
      {
        title: t('SearchFiltersForm.ItemFilter.Authors'),
        paramName: 'authors',
        inputType: 'checkbox',
        id: 4,
        subAttributes: customObjectFilter(allAuthors),
      },
    ]);
  };

  useEffect(() => {
    const available = data?.getAllMaterials.filter((material) => {
      const lastStatus = material!.statuses.slice(-1)[0];
      const currentStatus = getStatus(lastStatus?.status, material?.created_at);
      return currentStatus !== 'Rejected' && currentStatus !== 'Pending';
    });
    available && setAvailableMaterial(available);
  }, [data]);

  useEffect(() => {
    if (allAuthors && allCategories && allTypes && allAvailability) {
      FilteringObjects();
    }
  }, [availableMaterial]);

  const [applyFilters, setApplyFilters] = useState(false);
  const navigate = useNavigate();
  const params: ParamsType = {
    availability: [],
    items: [],
    categories: [],
    authors: [],
    sortby: [],
  };

  const handleResetClick = () => {
    allFilters?.map((item: ItemsType) =>
      item?.subAttributes.forEach(
        (subItem: SubItemType) => (subItem.checked = false)
      )
    );

    setActive(false);
    navigate(RoutesTypes.SEARCH);
  };
  const radioBtnHandler = (attributes: SubItemType[], value: string) => {
    attributes.forEach((item) => {
      item.title === value ? (item.checked = true) : (item.checked = false);
    });
  };
  const checkBoxHandler = (attribute: SubItemType) =>
    (attribute.checked = !attribute.checked);

  useEffect(() => {
    allFilters?.map((item: ItemsType) =>
      item?.subAttributes.map(
        (subItem: SubItemType) =>
          subItem.checked && params[item.paramName].push(subItem.title)
      )
    );
  });
  useEffect(() => {
    if (applyFilters) {
      navigate({
        pathname: RoutesTypes.CATEGORY,
        search: `?${createSearchParams(params)}`,
      });
      setActive(false);
    }
    setApplyFilters(false);
  }, [applyFilters]);

  return (
    <SearchFiltersForm
      attributes={allFilters}
      radioBtnHandler={radioBtnHandler}
      checkBoxHandler={checkBoxHandler}
      setApplyFilters={setApplyFilters}
      handleResetClick={handleResetClick}
    />
  );
};

export default CategorySearch;
