import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { dimensions, colors } from '@mimir/ui-kit';
import { attributes } from '../FilterAttributes';
import Button from '../Button';
import { createSearchParams, useNavigate } from 'react-router-dom';

export const Filters = styled.div`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
  margin-bottom: ${dimensions.base_2};
`;
export const Title = styled.h3`
  font-weight: 700;
  font-size: ${dimensions.base};
  margin-bottom: ${dimensions.lg};
`;
export const AttributeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  row-gap: ${dimensions.xs_2};
  column-gap: 5rem;
  width: 100%;
  height: 100%;
  margin-bottom: ${dimensions.xl_2};
`;

export const OneCategory = styled.div`
  display: flex;
  gap: ${dimensions.xs_2};
  cursor: pointer;
  justify-content: space-between;
  font-size: ${dimensions.base};
  font-weight: 400;
`;

const SeeMoreButton = styled.p`
  color: ${colors.accent_color};
  text-decoration: underline;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: ${dimensions.base};
`;

export const StyledCheckBox = styled.input`
  width: ${dimensions.lg};
  height: ${dimensions.lg};
`;
type paramsType = {
  [key: string]: string[];
};
type subItemType = {
  title: string;
  id: number;
  checked: boolean;
};
type itemsType = {
  title: string;
  inputType: string;
  id: number;
  subAttributes: subItemType[];
};
const CategorySearch = ({ setActive }: any) => {
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
    attributes?.map((item: itemsType) =>
      item?.subAttributes.forEach(
        (subItem: subItemType) => (subItem.checked = false)
      )
    );

    setActive(false);
    navigate('/search');
  };
  const radioBtnHandler = (
    attributes: subItemType[],
    type: string,
    value: string
  ) => {
    if (type === 'radio') {
      attributes[0].title === value
        ? (attributes[1].checked = false)
        : (attributes[0].checked = false);
    }
  };
  const checkBoxHandler = (attribute: subItemType) =>
    (attribute.checked = !attribute.checked);

  useEffect(() => {
    attributes?.map((item: itemsType) =>
      item?.subAttributes.map(
        (subItem: subItemType) =>
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
    <form>
      <Filters>Filters</Filters>
      {attributes.map((item) => (
        <div key={item.id}>
          <Title>{item.title}</Title>
          <AttributeWrapper>
            {item.subAttributes.slice(0, 7).map((attribute) => (
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
            {item.subAttributes.length > 7 && (
              <SeeMoreButton>SEE MORE </SeeMoreButton>
            )}
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

export default CategorySearch;
