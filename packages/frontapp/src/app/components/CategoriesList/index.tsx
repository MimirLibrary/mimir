import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useNavigate } from 'react-router-dom';

interface IStyledContainerProps {
  flex: string | null;
}

interface ICategoriesListProps {
  allCategories: { [category: string]: number } | undefined;
}
const CategoriesWrapper = styled.div`
  display: flex;
  gap: ${dimensions.xl_2};
  margin-bottom: 3.5rem;
`;
const Categories = styled.div<IStyledContainerProps>`
  padding: ${dimensions.base_2};
  flex: ${(props) => props.flex};
  width: 42rem;
  height: 16rem;
  background-color: ${colors.bg_secondary};
  border-radius: ${dimensions.xs_1};
  top: 13rem;
`;
const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${dimensions.xs_2};
`;
const Header = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: ${dimensions.xs_2};
`;

const Category = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.accent_color};
  display: flex;
  gap: ${dimensions.base};
  cursor: pointer;
`;
const Count = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.main_gray};
`;

const CategoriesList: FC<ICategoriesListProps> = ({ allCategories }) => {
  const navigate = useNavigate();
  const handleItemRedirect = (category: string) => {
    navigate(`/category/${category}`);
  };
  return (
    <CategoriesWrapper>
      <Categories flex="2">
        <Header>Books</Header>
        <List>
          {allCategories &&
            Object.keys(allCategories).map((category) => (
              <Category
                key={category}
                onClick={() => handleItemRedirect(category)}
              >
                {category}
                <Count> {allCategories[category]}</Count>
              </Category>
            ))}
        </List>
      </Categories>
      <Categories flex="1">
        <Header>Else</Header>
      </Categories>
    </CategoriesWrapper>
  );
};

export default CategoriesList;
