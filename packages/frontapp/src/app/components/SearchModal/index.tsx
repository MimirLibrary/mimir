import styled from '@emotion/styled';
import { dimensions, colors } from '@mimir/ui-kit';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import Button from '../Button';
import CheckBox from '../CheckBox';
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
  line-height: 1.5;
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

export type ItemsType = {
  title: string;
  inputType: string;
  id: number;
  subAttributes: SubItemType[];
  paramName?: string;
};

export type SubItemType = {
  title: string;
  id: number;
  checked: boolean;
  numberOfItems?: number;
};

interface IProps {
  attributes: ItemsType[];
  radioBtnHandler: (
    attributes: SubItemType[],
    type: string,
    value: string
  ) => void;
  checkBoxHandler: (attribute: SubItemType) => boolean;
  setApplyFilters: Dispatch<SetStateAction<boolean>>;
  handleResetClick?: () => void;
}

interface showMoreStats {
  authors: boolean;
  categories: boolean;
}

const SearchModal: FC<IProps> = ({
  handleResetClick,
  setApplyFilters,
  attributes,
  radioBtnHandler,
  checkBoxHandler,
}) => {
  const numberOfInitialItems = 7; // number of items to show before clicked ShowMore
  const [showMore, setShowMore] = useState<showMoreStats>({
    authors: false,
    categories: false,
  });
  const seeMoreHandler = (category: string) => {
    setShowMore((prev) => ({
      ...prev,
      [category]: !prev[category.toLowerCase() as keyof showMoreStats],
    }));
  };
  return (
    <form>
      <Filters>Filters</Filters>
      {attributes.map((item: ItemsType) => (
        <div key={item.id}>
          <Title>{item.title}</Title>
          <AttributeWrapper>
            {item.subAttributes.slice(0, 7).map((attribute: SubItemType) => (
              <OneCategory key={attribute.id}>
                {attribute.title}
                {attribute.numberOfItems && <> - {attribute.numberOfItems}</>}
                <CheckBox
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
            {showMore[item.title.toLowerCase() as keyof showMoreStats] &&
              item.subAttributes
                .slice(numberOfInitialItems, item.subAttributes.length)
                .map((attribute: SubItemType) => (
                  <OneCategory key={attribute.id}>
                    {attribute.title}{' '}
                    {attribute.numberOfItems && `- ${attribute.numberOfItems}`}
                    <CheckBox
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
            {item.subAttributes.length > numberOfInitialItems && (
              <SeeMoreButton onClick={() => seeMoreHandler(item.title)}>
                {showMore[item.title.toLowerCase() as keyof showMoreStats]
                  ? 'see less'
                  : 'see more'}
              </SeeMoreButton>
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
export default SearchModal;
