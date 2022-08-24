import { useState, useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { filterItems } from './filterItems';
import Button from '../Button';
import {
  AttributeWrapper,
  ButtonWrapper,
  Filters,
  OneCategory,
  StyledCheckBox,
  Title,
} from '../CategorySearch';
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
const UserSearch = ({ setActive }: any) => {
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
    navigate('/readers');
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
        pathname: '/readers',
        search: `?${createSearchParams(params)}`,
      });
      setActive(false);
    }
    setApplyFilters(false);
  }, [applyFilters]);
  return (
    <form>
      <Filters>Filters</Filters>
      {filterItems.map((item) => (
        <div key={item.id}>
          <Title>{item.title}</Title>
          <AttributeWrapper>
            {item.subAttributes.map((attribute) => (
              <OneCategory key={attribute.id}>
                {attribute.title}
                <StyledCheckBox
                  type={item.inputType}
                  name={item.title.toLowerCase()}
                  value={attribute.title}
                  onChange={(e) =>
                    radioBtnHandler(
                      item.subAttributes,
                      item.inputType,
                      e.target.value
                    )
                  }
                  onMouseDown={() => checkBoxHandler(attribute)}
                />
              </OneCategory>
            ))}
          </AttributeWrapper>
        </div>
      ))}
      <ButtonWrapper>
        <Button value="Apply filters" onClick={() => setApplyFilters(true)} />
        <Button
          type="reset"
          transparent
          value="Reset all filters"
          onClick={handleResetClick}
        />
      </ButtonWrapper>
    </form>
  );
};

export default UserSearch;
