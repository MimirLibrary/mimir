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

const CategorySearch: FC<IProps> = ({ setActive }) => {
  const [attributes, setAttributes] = useState<ItemsType[]>([]);
  const locations = useAppSelector(locationIds);
  const [availableMaterial, setAvailableMaterial] = useState<
    GetAllMaterialsQuery['getAllMaterials']
  >([]);
  const { data, error } = useGetAllMaterialsQuery({
    variables: { input: { locations } },
    fetchPolicy: 'no-cache',
  });

  const allCategories = useMaterialFilter(availableMaterial, 'category');

  const initAttributes = [
    {
      title: t('SearchFiltersForm.ItemFilter.Categories'),
      paramName: 'categories',
      inputType: 'checkbox',
      id: 3,
      subAttributes: adaptFiltersToAttrs(allCategories),
    },
  ];

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    const available = data?.getAllMaterials.filter((material) => {
      const currentStatus = getStatus(
        material?.currentStatus?.status,
        material?.currentStatus?.returnDate
      );
      return currentStatus !== 'Rejected' && currentStatus !== 'Pending';
    });
    available && setAvailableMaterial(available);
  }, [data]);

  useEffect(() => {
    if (allCategories) {
      setAttributes(initAttributes);
    }
  }, [availableMaterial]);

  const navigate = useNavigate();
  const params: ParamsType = {
    categories: [],
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
      title={t('SearchFiltersForm.ItemFilter.Categories')}
      key={JSON.stringify(filters)}
      attributes={attributes}
      onFiltersApply={handleApplyFilters}
      onReset={handleResetClick}
      defaultFilters={filters}
    />
  );
};

export default CategorySearch;
