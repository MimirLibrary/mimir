import React from 'react';
import styled from '@emotion/styled';
import { dimensions, colors } from '@mimir/ui-kit';
import { AttributesList } from '../FilterAttributes';
import Button from '../Button';
const Filters = styled.div`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
  margin-bottom: ${dimensions.base_2};
`;
const Title = styled.h3`
  font-weight: 700;
  font-size: ${dimensions.base};
  margin-bottom: ${dimensions.lg};
`;
const AttributeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  row-gap: ${dimensions.xs_2};
  column-gap: 5rem;
  width: 100%;
  height: 100%;
  margin-bottom: ${dimensions.xl_2};
`;

const OneCategory = styled.div`
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: ${dimensions.base};
`;

const StyledCheckBox = styled.input`
  width: ${dimensions.lg};
  height: ${dimensions.lg};
`;

export const checkedFilters: string[] = [];

const CategorySearch = ({ setActive }: any) => {
  const handleClick = (filters: string[]) => {
    checkedFilters.push(...filters);
  };
  const [filters, setFilters] = React.useState<string[]>([]);
  return (
    <>
      <Filters>Filters</Filters>
      {AttributesList.map((item) => (
        <>
          <Title>{item.title}</Title>
          <AttributeWrapper key={item.title}>
            {item.attributes.slice(0, 7).map((attribute) => (
              <OneCategory>
                {attribute}
                <StyledCheckBox
                  type={item.inputType}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters(() => [...filters, attribute]);
                    } else {
                      setFilters(() =>
                        filters.filter((item) => item !== attribute)
                      );
                    }
                  }}
                />
              </OneCategory>
            ))}
            {item.attributes.length > 7 && (
              <SeeMoreButton>SEE MORE</SeeMoreButton>
            )}
          </AttributeWrapper>
        </>
      ))}
      <ButtonWrapper>
        <Button
          value="Apply filters"
          onClick={() => {
            handleClick(filters);
            setActive(false);
          }}
        />
        <Button
          transparent
          value="Reset all filters"
          onClick={() => setActive(false)}
        />
      </ButtonWrapper>
    </>
  );
};

export default CategorySearch;
