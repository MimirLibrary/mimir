import { useState, useEffect, Dispatch, SetStateAction, FC } from 'react';
import SearchFiltersForm, { ItemsType } from '../SearchFiltersForm';
import { useNavigate } from 'react-router-dom';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useAppSelector } from '../../hooks/useTypedSelector';
import useMaterialFilter from '../../hooks/useMaterialFilter';
import { getStatus } from '../../models/helperFunctions/converTime';
import { GetAllMaterialsQuery } from '@mimir/apollo-client';
import { locationIds } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';
import { RoutesTypes } from '../../../utils/routes';
import { t } from 'i18next';
import { adaptFiltersToAttrs } from '../../models/helperFunctions/filters';
import { useFilters } from '../../hooks/useFilters';
import { ParamsType } from '../../types/filterTypes';

interface IProps {
  setActive: Dispatch<SetStateAction<boolean>>;
}

const MaterialSearch: FC<IProps> = ({ setActive }) => {
  const [attributes, setAttributes] = useState<ItemsType[]>([]);
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
  };

  const initAttributes = [
    {
      title: t('SearchFiltersForm.ItemFilter.SortBy'),
      paramName: 'sortby',
      inputType: 'radio',
      id: 5,
      subAttributes: adaptFiltersToAttrs(allSortBy),
    },
    {
      title: t('SearchFiltersForm.ItemFilter.Items'),
      paramName: 'items',
      inputType: 'radio',
      id: 2,
      subAttributes: adaptFiltersToAttrs(allTypes),
    },
    {
      title: t('SearchFiltersForm.ItemFilter.Availability'),
      paramName: 'availability',
      inputType: 'checkbox',
      id: 1,
      subAttributes: adaptFiltersToAttrs(allAvailability),
    },
    {
      title: t('SearchFiltersForm.ItemFilter.Categories'),
      paramName: 'categories',
      inputType: 'checkbox',
      id: 3,
      subAttributes: adaptFiltersToAttrs(allCategories),
    },
    {
      title: t('SearchFiltersForm.ItemFilter.Authors'),
      paramName: 'authors',
      inputType: 'checkbox',
      id: 4,
      subAttributes: adaptFiltersToAttrs(allAuthors),
    },
  ];

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    const available = data?.getAllMaterials.filter((material) => {
      const currentStatus = getStatus(
        material?.currentStatus?.status,
        material?.created_at
      );
      return currentStatus !== 'Rejected' && currentStatus !== 'Pending';
    });
    available && setAvailableMaterial(available);
  }, [data]);

  useEffect(() => {
    if (allAuthors && allCategories && allTypes && allAvailability) {
      setAttributes(initAttributes);
    }
  }, [availableMaterial]);

  const navigate = useNavigate();
  const params: ParamsType = {
    availability: [],
    items: [],
    categories: [],
    authors: [],
    sortby: [],
  };

  const { filters, setFilters, setIsFiltersApplied } = useFilters(
    params,
    RoutesTypes.CATEGORY
  );

  const handleResetClick = () => {
    setActive(false);
    navigate(RoutesTypes.SEARCH);
  };

  const handleApplyFilters = (e: Record<string, Array<string>>) => {
    setIsFiltersApplied(true);
    setFilters(e);
    setActive(false);
  };

  return (
    <SearchFiltersForm
      key={JSON.stringify(filters)}
      attributes={attributes}
      onFiltersApply={handleApplyFilters}
      onReset={handleResetClick}
      defaultFilters={filters}
    />
  );
};

export default MaterialSearch;
