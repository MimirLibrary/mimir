import { useState, useEffect, Dispatch, SetStateAction, FC } from 'react';
import { attributes } from '../FilterAttributes';
import SearchModal, { ItemsType, SubItemType } from '../SeachModal';
import { createSearchParams, useNavigate } from 'react-router-dom';

type paramsType = {
  [key: string]: string[];
};
interface IProps {
  setActive: Dispatch<SetStateAction<boolean>>;
}
const CategorySearch: FC<IProps> = ({ setActive }) => {
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
    attributes?.map((item: ItemsType) =>
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
    attributes?.map((item: ItemsType) =>
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
      attributes={attributes}
      radioBtnHandler={radioBtnHandler}
      checkBoxHandler={checkBoxHandler}
      setApplyFilters={setApplyFilters}
      handleResetClick={handleResetClick}
    />
  );
};

export default CategorySearch;
