import { useState, useEffect, Dispatch, SetStateAction, FC } from 'react';
import SearchModal, { ItemsType, SubItemType } from '../SearchModal';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useAppSelector } from '../../hooks/useTypedSelector';
import useMaterialFilter from '../../hooks/useMaterialFilter';
import { getStatus } from '../../models/helperFunctions/converTime';
import { GetAllMaterialsQuery } from '@mimir/apollo-client';

type paramsType = {
  [key: string]: string[];
};

type subItemType = {
  title: string;
  id: number;
  checked: boolean;
  numberOfItems?: number;
};

type itemsType = {
  title: string;
  inputType: string;
  id: number;
  subAttributes: subItemType[];
};

interface IProps {
  setActive: Dispatch<SetStateAction<boolean>>;
}

const CategorySearch: FC<IProps> = ({ setActive }) => {
  let idOfItems = 0;
  const [allFilters, setAllFilters] = useState<itemsType[]>([]);
  const { location } = useAppSelector((state) => state.user);
  const [availableMaterial, setAvailableMaterial] = useState<
    GetAllMaterialsQuery['getAllMaterials']
  >([]);
  const { data } = useGetAllMaterialsQuery({
    variables: { location_id: location.id },
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
        title: 'Availability',
        inputType: 'checkbox',
        id: 1,
        subAttributes: customObjectFilter(allAvailability),
      },
      {
        title: 'Items',
        inputType: 'radio',
        id: 2,
        subAttributes: customObjectFilter(allTypes),
      },
      {
        title: 'Categories',
        inputType: 'checkbox',
        id: 3,
        subAttributes: customObjectFilter(allCategories),
      },
      {
        title: 'Authors',
        inputType: 'checkbox',
        id: 4,
        subAttributes: customObjectFilter(allAuthors),
      },
      {
        title: 'SortBy',
        inputType: 'radio',
        id: 5,
        subAttributes: customObjectFilter(allSortBy),
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
  const params: paramsType = {
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
    navigate('/search');
  };
  const radioBtnHandler = (
    attributes: SubItemType[],
    type: string,
    value: string
  ) => {
    if (type === 'radio') {
      attributes[0].title === value
        ? (attributes[1].checked = false)
        : (attributes[0].checked = false);
    }
  };
  const checkBoxHandler = (attribute: SubItemType) =>
    (attribute.checked = !attribute.checked);

  useEffect(() => {
    allFilters?.map((item: ItemsType) =>
      item?.subAttributes.map(
        (subItem: SubItemType) =>
          subItem.checked &&
          params[item.title.toLowerCase()].push(subItem.title)
      )
    );
  });
  useEffect(() => {
    if (applyFilters) {
      navigate({
        pathname: '/category',
        search: `?${createSearchParams(params)}`,
      });
      setActive(false);
    }
    setApplyFilters(false);
  }, [applyFilters]);

  return (
    <SearchModal
      attributes={allFilters}
      radioBtnHandler={radioBtnHandler}
      checkBoxHandler={checkBoxHandler}
      setApplyFilters={setApplyFilters}
      handleResetClick={handleResetClick}
    />
  );
};

export default CategorySearch;
