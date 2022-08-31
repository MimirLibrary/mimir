import { useState, useEffect, Dispatch, SetStateAction, FC } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { filterItems } from './filterItems';
import { RoutesTypes } from '../../../utils/routes';
import SearchModal from '../SeachModal';

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
  const radioBtnHandler = (
    attributes: Attribute[],
    type: string,
    value: string
  ) => {
    if (type === 'radio') {
      if (attributes[0].title === value) {
        attributes[1].checked = false;
        attributes[2].checked = false;
      } else if (attributes[1].title === value) {
        attributes[0].checked = false;
        attributes[2].checked = false;
      } else {
        attributes[0].checked = false;
        attributes[1].checked = false;
      }
    }
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
    <SearchModal
      attributes={filterItems}
      radioBtnHandler={radioBtnHandler}
      checkBoxHandler={checkBoxHandler}
      setApplyFilters={setApplyFilters}
      handleResetClick={handleResetClick}
    />
  );
};

export default UserSearch;
