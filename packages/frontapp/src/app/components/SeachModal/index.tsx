import styled from '@emotion/styled';
import { dimensions, colors } from '@mimir/ui-kit';
import { Dispatch, FC, SetStateAction } from 'react';
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

const SearchModal: FC<IProps> = ({
  handleResetClick,
  setApplyFilters,
  attributes,
  radioBtnHandler,
  checkBoxHandler,
}) => {
  return (
    <form>
      <Filters>Filters</Filters>
      {attributes.map((item: any) => (
        <div key={item.id}>
          <Title>{item.title}</Title>
          <AttributeWrapper>
            {item.subAttributes.slice(0, 7).map((attribute: any) => (
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
export default SearchModal;
