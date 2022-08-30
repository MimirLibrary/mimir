import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { dimensions, colors } from '@mimir/ui-kit';
import Button from '../Button';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useGetAllMaterialsQuery } from '@mimir/apollo-client';
import { useAppSelector } from '../../hooks/useTypedSelector';
import useMaterialFilter from '../../hooks/useMaterialFilter';
import { getStatus } from '../../models/helperFunctions/converTime';

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

type paramsType = {
  [key: string]: string[];
};

type subItemType = {
  title: string;
  id: number;
  checked: boolean;
  numberOfItems?: number;
};

type itemsType = {
  title: string;
  inputType: string;
  id: number;
  subAttributes: subItemType[];
};

const CategorySearch = ({ setActive }: any) => {
  let idOfItems = 0;
  const numberOfInitialItems = 7; // number of items to show before clicked ShowMore
  const [showMore, setShowMore] = useState(false);
  const [allFilters, setAllFilters] = useState<itemsType[]>([]);
  const { location } = useAppSelector((state) => state.user);
  const [availableMaterial, setAvailableMaterial] = useState<any>([]);
  const { data } = useGetAllMaterialsQuery({
    variables: { location_id: location.id },
    fetchPolicy: 'no-cache',
  });

  const allCategories = useMaterialFilter(availableMaterial, 'category');
  const allAuthors = useMaterialFilter(availableMaterial, 'author');
  const allTypes = useMaterialFilter(availableMaterial, 'type');
  const allAvailability = useMaterialFilter(availableMaterial, 'availability');
  const allSortBy = {
    'By date added': undefined,
    'By date of writing': undefined,
  };

  const customObjectFilter = (filterName: {
    [author: string]: number | undefined;
  }) =>
    Object.keys(filterName).map((key) => ({
      title: key,
      numberOfItems: filterName[key],
      id: idOfItems++,
      checked: false,
    }));

  const FilteringObjects = () => {
    setAllFilters([
      {
        title: 'Availability',
        inputType: 'checkbox',
        id: 1,
        subAttributes: customObjectFilter(allAvailability),
      },
      {
        title: 'Items',
        inputType: 'radio',
        id: 2,
        subAttributes: customObjectFilter(allTypes),
      },
      {
        title: 'Categories',
        inputType: 'checkbox',
        id: 3,
        subAttributes: customObjectFilter(allCategories),
      },
      {
        title: 'Authors',
        inputType: 'checkbox',
        id: 4,
        subAttributes: customObjectFilter(allAuthors),
      },
      {
        title: 'SortBy',
        inputType: 'radio',
        id: 5,
        subAttributes: customObjectFilter(allSortBy),
      },
    ]);
  };

  useEffect(() => {
    const available = data?.getAllMaterials.filter((material: any) => {
      const lastStatus = material.statuses.slice(-1)[0];
      const currentStatus = getStatus(lastStatus?.status, material?.created_at);
      return currentStatus !== 'Rejected' && currentStatus !== 'Pending';
    });
    setAvailableMaterial(available);
  }, [data]);

  useEffect(() => {
    if (allAuthors && allCategories && allTypes && allAvailability) {
      FilteringObjects();
    }
  }, [availableMaterial]);

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
    allFilters?.map((item: itemsType) =>
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
    allFilters?.map((item: itemsType) =>
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
      {allFilters?.map((item) => (
        <div key={item.id}>
          <Title>{item.title}</Title>
          <AttributeWrapper>
            {item.subAttributes
              .slice(0, numberOfInitialItems)
              .map((attribute) => (
                <OneCategory key={attribute.id}>
                  {attribute.title}{' '}
                  {attribute.numberOfItems && `- ${attribute.numberOfItems}`}
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
            {showMore &&
              item.subAttributes
                .slice(numberOfInitialItems, item.subAttributes.length)
                .map((attribute) => (
                  <OneCategory key={attribute.id}>
                    {attribute.title}{' '}
                    {attribute.numberOfItems && `- ${attribute.numberOfItems}`}
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
            {item.subAttributes.length > numberOfInitialItems && (
              <SeeMoreButton onClick={() => setShowMore(!showMore)}>
                {showMore ? 'see less' : 'see more'}
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

export default CategorySearch;
