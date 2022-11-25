import styled from '@emotion/styled';
import { dimensions, colors } from '@mimir/ui-kit';
import { FC, useState } from 'react';
import Button from '../Button';
import { LabeledCheckboxGroup } from '../LabeledCheckbox';
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

const AttributeWrapper = styled.div<{ isTitleProvided?: boolean }>`
  display: flex;
  gap: ${dimensions.base};
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin-bottom: ${dimensions.xl_2};

  & > div {
    justify-content: ${({ isTitleProvided }) =>
      isTitleProvided ? 'center' : 'flex-start'};
  }

  @media (max-width: ${dimensions.phone_width}) {
    gap: ${dimensions.xs_2};
  }
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
  numberOfItems?: number;
};

interface IProps {
  title?: string;
  attributes: ItemsType[];
  defaultFilters?: Record<string, Array<string>>;
  onReset?: () => void;
  onFiltersApply?: (filters: Record<string, Array<string>>) => void;
  minimalNumberOfItems?: number;
}

const SearchFiltersForm: FC<IProps> = ({
  title,
  onReset,
  attributes,
  defaultFilters,
  onFiltersApply,
  minimalNumberOfItems = 7,
}) => {
  const [currentFilters, setCurrentFilters] = useState(defaultFilters!);

  const [showMore, setShowMore] = useState<Record<string, unknown>>({});
  const [shouldReset, setShouldReset] = useState<boolean>(false);
  const seeMoreHandler = (category: string) => {
    setShowMore((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };
  const handleSubmit = () => {
    setShouldReset(false);
    onFiltersApply && onFiltersApply(currentFilters);
  };

  const handleReset = () => {
    onReset && onReset();
    setCurrentFilters({});
    setShouldReset(true);
  };

  return (
    <form data-testid="search-filters-form">
      <Filters>{title || t('SearchFiltersForm.Title')}</Filters>
      {attributes.map((item: ItemsType) => (
        <div key={item.id}>
          {!title && <Title>{item.title}</Title>}
          <AttributeWrapper
            isTitleProvided={!!title}
            data-testid="wrapperOfElements"
          >
            {item.inputType === 'radio' ? (
              <RadioGroup
                options={item.subAttributes.map((attr) => ({
                  name: attr.title,
                  value: attr.title,
                }))}
                defaultValue={
                  currentFilters[item.paramName]
                    ? currentFilters[item.paramName][0]
                    : ''
                }
                name={item.paramName}
                onChange={(e) =>
                  setCurrentFilters((prev) => ({
                    ...prev,
                    [item.paramName]: [e],
                  }))
                }
                shouldReset={shouldReset}
              />
            ) : (
              <LabeledCheckboxGroup
                name={item.paramName}
                options={
                  showMore[item.paramName]
                    ? item.subAttributes.map((attr) => ({
                        name: attr.numberOfItems
                          ? `${attr.title} - ${attr.numberOfItems}`
                          : attr.title,
                        value: attr.title,
                      }))
                    : item.subAttributes
                        .slice(0, minimalNumberOfItems)
                        .map((attr) => ({
                          name: attr.numberOfItems
                            ? `${attr.title} - ${attr.numberOfItems}`
                            : attr.title,
                          value: attr.title,
                        }))
                }
                defaultValue={
                  currentFilters[item.paramName]
                    ? currentFilters[item.paramName]
                    : []
                }
                shouldReset={shouldReset}
                onChange={(e) =>
                  setCurrentFilters((prev) => {
                    return { ...prev, [item.paramName]: e };
                  })
                }
              />
            )}
            {item.subAttributes.length > minimalNumberOfItems && (
              <SeeMoreButton
                data-testid="seeMoreButton"
                onClick={() => seeMoreHandler(item.paramName)}
              >
                {showMore[item.paramName]
                  ? t('SearchFiltersForm.SeeLess')
                  : t('SearchFiltersForm.SeeAll')}
              </SeeMoreButton>
            )}
          </AttributeWrapper>
        </div>
      ))}
      <ButtonWrapper>
        <Button
          value={t('SearchFiltersForm.ShowResults')}
          onClick={handleSubmit}
        />
        <Button
          type="reset"
          transparent
          value={t('SearchFiltersForm.Reset')}
          onClick={handleReset}
        />
      </ButtonWrapper>
    </form>
  );
};

export default SearchFiltersForm;
