import React, { FC, useState } from 'react';
import {
  countClaimHistory,
  IClaimHistory,
} from '../../models/helperFunctions/claimHistory';
import { InputSearch, StyledSearchIcon, WrapperInput } from '../Search';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import emptyList from '../../../assets/EmptyList.svg';
import InlineWrapper from './InlineWrapper';
import { t } from 'i18next';
import Item from './Item';

const CardWrapper = styled.div`
  display: flex;
  height: 744px;
  background-color: ${colors.bg_secondary};
  box-shadow: ${colors.shadow};
  margin-top: ${dimensions.lg};
  border-radius: ${dimensions.xs_1};
  padding: ${dimensions.base_2};
`;

const EmptyShelfWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & img {
    height: 170px;
  }

  & p {
    font-weight: 700;
    font-size: ${dimensions.xl};
    margin-top: ${dimensions.base_2};
  }
`;

const StyledScroll = styled.div`
  width: 100%;
  display: flex;
  flex-flow: wrap row;
  max-height: 744px;
  overflow: auto;
  padding-right: ${dimensions.xl_2};
`;

const StyledTable = styled.table`
  display: table;
  border-collapse: collapse;
  width: 100%;
  height: fit-content;
  th:nth-of-type(1) {
    border-radius: 10px 0 0 0;
  }
  th:nth-of-type(2) {
  }
  th:nth-of-type(3) {
    border-radius: 0 10px 0 0;
  }
  th {
    position: sticky;
    top: 0;
    text-align: left;
    background-color: ${colors.accent_color};
    padding: ${dimensions.base};
    color: ${colors.bg_secondary};
    font-size: ${dimensions.base};
    font-weight: 600;
    height: 52px;
  }

  tr:nth-of-type(even) {
    background-color: ${colors.bg_primary};
  }

  td {
    height: 157px;
    color: ${colors.accent_color};
    padding: ${dimensions.base};
    vertical-align: top;

    img {
      margin-right: ${dimensions.xs};
      height: 125px;
      width: 90px;
    }
  }
`;

interface ISortTextProps {
  active?: boolean;
}

const SortText = styled.div<ISortTextProps>`
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? `3px solid` : null)};
  font-size: ${dimensions.base};
  font-weight: 400;
  text-align: center;
  width: 135px;
  color: ${({ active }) => (active ? colors.accent_color : null)};
  border-bottom-color: ${({ active }) => (active ? colors.accent_color : null)};

  :active {
    color: ${colors.accent_color};
    border-bottom: 3px solid;
    border-bottom-color: ${colors.accent_color};
  }
`;

const HeadWrapper = styled.div`
  margin-top: ${dimensions.xl_2};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface IClaimTable {
  statuses: IClaimHistory[];
  name: string;
}

const ClaimTable: FC<IClaimTable> = ({ statuses, name }) => {
  const sortedStatuses = countClaimHistory(statuses).claimHistoryItems;
  const [allItemsActive, setAllItemsActive] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [shownItems, setShownItems] = useState<IClaimHistory[]>(sortedStatuses);
  const [activeItems, setActiveItems] =
    useState<IClaimHistory[]>(sortedStatuses);
  const changeList = (all: boolean) => {
    if (all !== allItemsActive)
      if (all) {
        setAllItemsActive(true);
        setActiveItems(sortedStatuses);
        setShownItems(sortedStatuses);
      } else {
        setAllItemsActive(false);
        setActiveItems(
          sortedStatuses.filter((item) => item.status === 'Overdue')
        );
        setShownItems(
          sortedStatuses.filter((item) => item.status === 'Overdue')
        );
      }
  };
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value) {
      setShownItems(
        activeItems.filter((item) => {
          return (
            item.material?.author
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            item.material?.title
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          );
        })
      );
    } else setShownItems(activeItems);
  };
  return (
    <div>
      <HeadWrapper>
        {allItemsActive ? (
          <InlineWrapper>
            <SortText onClick={() => changeList(true)} active>
              {t('UserCard.Table.AllItems')}
            </SortText>
            <SortText onClick={() => changeList(false)}>
              {t('UserCard.Table.Overdue')}
            </SortText>
          </InlineWrapper>
        ) : (
          <InlineWrapper>
            <SortText onClick={() => changeList(true)}>
              {t('UserCard.Table.AllItems')}
            </SortText>{' '}
            <SortText onClick={() => changeList(false)} active>
              {t('UserCard.Table.Overdue')}
            </SortText>
          </InlineWrapper>
        )}
        <WrapperInput>
          <StyledSearchIcon
            fill={colors.dropdown_gray}
            width="20"
            height="20"
          />
          <InputSearch
            type="text"
            value={search}
            onChange={handleChangeSearch}
            placeholder={t('Search.Placeholder')}
          />
        </WrapperInput>
      </HeadWrapper>
      <CardWrapper>
        {statuses?.length ? (
          <StyledScroll>
            <StyledTable>
              <tbody>
                <tr>
                  <th>{t('UserCard.Table.ItemName')}</th>
                  <th>{t('UserCard.Table.Deadline')}</th>
                  <th>{t('UserCard.Table.State')}</th>
                </tr>
                {shownItems?.map((d) => <Item key={d.material_id} item={d} />)}
              </tbody>
            </StyledTable>
          </StyledScroll>
        ) : (
          <EmptyShelfWrapper>
            <img src={emptyList} alt="no items" />
            <p>
              {t('UserCard.Table.ShelfOf') +
                name?.split(' ')[0] +
                t('UserCard.Table.BooksAndItems')}
            </p>
          </EmptyShelfWrapper>
        )}
      </CardWrapper>
    </div>
  );
};

export default ClaimTable;
