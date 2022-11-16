import styled from '@emotion/styled';
import { dimensions, colors } from '@mimir/ui-kit';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import Button from '../Button';
import LabeledCheckbox from '../LabeledCheckbox';
import { RadioGroup } from '../RadioButton';
import { t } from 'i18next';

const Filters = styled.div`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
  margin-bottom: ${dimensions.base_2};
  @media (max-width: ${dimensions.phone_width}) {
    text-align: center;
  }
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: ${dimensions.base};
  margin-bottom: ${dimensions.lg};
`;

const AttributeWrapper = styled.div`
  display: flex;
  gap: ${dimensions.base};
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin-bottom: ${dimensions.xl_2};
  @media (max-width: ${dimensions.phone_width}) {
    gap: ${dimensions.xs_2};
  }
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
  cursor: pointer;
  align-self: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: ${dimensions.base};
  @media (max-width: ${dimensions.phone_width}) {
    justify-content: center;
    flex-direction: column;
    gap: ${dimensions.xs_1};
    position: sticky;
    bottom: 0;
    background-color: ${colors.bg_secondary};
    padding: ${dimensions.xs_2};
  }
`;

export type ItemsType = {
  title: string;
  inputType: string;
  id: number;
  subAttributes: SubItemType[];
  paramName: string;
};

export type SubItemType = {
  title: string;
  id: number;
  checked: boolean;
  numberOfItems?: number;
};

interface IProps {
  attributes: ItemsType[];
  radioBtnHandler: (attributes: SubItemType[], value: string) => void;
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
  const [shouldReset, setShouldReset] = useState<boolean>(false);
  const seeMoreHandler = (category: string) => {
    setShowMore((prev) => ({
      ...prev,
      [category]: !prev[category as keyof showMoreStats],
    }));
  };
  return (
    <form data-testid="searchModal">
      <Filters>{t('SearchModal.Title')}</Filters>
      {attributes.map((item: ItemsType) => (
        <div key={item.id}>
          <Title>{item.title}</Title>
          <AttributeWrapper data-testid="wrapperOfElements">
            {item.inputType === 'radio' ? (
              <RadioGroup
                options={item.subAttributes.map((attr) => ({
                  name: attr.title,
                  value: attr.title,
                }))}
                name={item.title}
                onChange={(e) => radioBtnHandler(item.subAttributes, e)}
                shouldReset={shouldReset}
              />
            ) : (
              <>
                {item.subAttributes
                  .slice(0, 7)
                  .map((attribute: SubItemType) => (
                    <OneCategory key={attribute.id}>
                      <LabeledCheckbox
                        id={attribute.title}
                        value={
                          attribute.numberOfItems
                            ? `${attribute.title} - ${attribute.numberOfItems}`
                            : attribute.title
                        }
                        onChange={() => {
                          checkBoxHandler(attribute);
                        }}
                      />
                    </OneCategory>
                  ))}
              </>
            )}

            {showMore[item.paramName as keyof showMoreStats] &&
              item.subAttributes
                .slice(numberOfInitialItems, item.subAttributes.length)
                .map((attribute: SubItemType) => (
                  <OneCategory key={attribute.id}>
                    <LabeledCheckbox
                      id={attribute.title}
                      value={`${attribute.title} - ${attribute.numberOfItems}`}
                      onMouseDown={() => {
                        checkBoxHandler(attribute);
                      }}
                    />
                  </OneCategory>
                ))}
            {item.subAttributes.length > numberOfInitialItems && (
              <SeeMoreButton
                data-testid="seeMoreButton"
                onClick={() => seeMoreHandler(item.paramName)}
              >
                {showMore[item.paramName as keyof showMoreStats]
                  ? t('SearchModal.SeeLess')
                  : t('SearchModal.SeeAll')}
              </SeeMoreButton>
            )}
          </AttributeWrapper>
        </div>
      ))}
      <ButtonWrapper>
        <Button
          value={t('SearchModal.ShowResults')}
          onClick={() => {
            setApplyFilters(true);
            setShouldReset(false);
          }}
        />
        <Button
          type="reset"
          transparent
          value={t('SearchModal.Reset')}
          onClick={() => {
            handleResetClick!();
            setShouldReset(true);
          }}
        />
      </ButtonWrapper>
    </form>
  );
};
export default SearchModal;
