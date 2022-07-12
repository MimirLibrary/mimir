import React, { FC, useEffect, useState } from 'react';
import {
  countClaimHistory,
  IClaimHistory,
} from '../../models/helperFunctions/claimHistory';
import Search from '../Search';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import emptyList from '../../../assets/EmptyList.svg';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import { StatusTypes } from '../../../../../apiserver/src/utils/types/statusTypes';
import { getDates } from '../../models/helperFunctions/converTime';

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
  th:nth-child(1) {
    border-radius: 10px 0 0 0;
  }
  th:nth-child(2) {
  }
  th:nth-child(3) {
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

  tr:nth-child(even) {
    background-color: ${colors.bg_primary};
  }

  td {
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
const InlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IFieldsTextProps {
  overdue?: boolean;
  returned?: boolean;
  titlee?: boolean;
  secondary?: boolean;
}

const FieldsText = styled.p<IFieldsTextProps>`
  font-weight: ${({ secondary }) => (secondary ? 300 : 500)};
  font-size: ${({ titlee }) => (titlee ? dimensions.base : dimensions.sm)};
  color: ${({ overdue, returned, titlee, secondary }) =>
    titlee || secondary
      ? colors.main_black
      : overdue
      ? colors.problem_red
      : returned
      ? colors.free_book
      : null};
  margin-bottom: ${dimensions.xs_2};
`;

interface ISortTextProps {
  active?: boolean;
}

const SortText = styled.div<ISortTextProps>`
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
  const [shownItems, setShownItems] = useState<IClaimHistory[]>(sortedStatuses);
  useEffect(() => {
    allItemsActive
      ? setShownItems(sortedStatuses)
      : setShownItems(
          sortedStatuses.filter((item) => item.status === 'Overdue')
        );
  }, [sortedStatuses]);
  const changeList = (all: boolean) => {
    if (all !== allItemsActive)
      if (all) {
        setAllItemsActive(true);
        setShownItems(sortedStatuses);
      } else {
        setAllItemsActive(false);
        setShownItems(
          sortedStatuses.filter((item) => item.status === 'Overdue')
        );
      }
  };
  const countReturnDate = (created_at: Date) => {
    const day = `${getDates(created_at).returnDate.getDate()}`.padStart(2, '0');
    const month = `${getDates(created_at).returnDate.getMonth() + 1}`.padStart(
      2,
      '0'
    );
    return `Return till: ${day}.${month}`;
  };
  const countReturnedDate = (created_at: Date) => {
    const day = `${getDates(created_at).startDate.getDate()}`.padStart(2, '0');
    const month = `${getDates(created_at).returnDate.getMonth() + 1}`.padStart(
      2,
      '0'
    );
    return `Returned at: ${day}.${month}`;
  };
  return (
    <div>
      <HeadWrapper>
        {allItemsActive ? (
          <InlineWrapper>
            <SortText onClick={() => changeList(true)} active>
              All Items
            </SortText>
            <SortText onClick={() => changeList(false)}>Overdue</SortText>
          </InlineWrapper>
        ) : (
          <InlineWrapper>
            <SortText onClick={() => changeList(true)}>All Items</SortText>{' '}
            <SortText onClick={() => changeList(false)} active>
              Overdue
            </SortText>
          </InlineWrapper>
        )}
        <Search></Search>
      </HeadWrapper>
      <CardWrapper>
        {statuses?.length ? (
          <StyledScroll>
            <StyledTable>
              <tr>
                <th>Item name</th>
                <th>Deadline</th>
                <th>State</th>
              </tr>
              {shownItems?.map((status) => (
                <tr>
                  <td>
                    <InlineWrapper>
                      <img
                        src={
                          (status.material?.picture &&
                            `${process.env['NX_API_ROOT_URL']}/${status.material?.picture}`) ||
                          bookImage
                        }
                      />
                      <ColumnWrapper>
                        <FieldsText titlee>{status.material?.title}</FieldsText>
                        <FieldsText
                          secondary
                        >{`${status.material?.category} / ${status.material?.author}`}</FieldsText>
                      </ColumnWrapper>
                    </InlineWrapper>
                  </td>
                  <td>
                    {status.status !== StatusTypes.FREE ? (
                      <FieldsText>
                        {countReturnDate(status.created_at)}
                      </FieldsText>
                    ) : (
                      <FieldsText returned>
                        {countReturnedDate(status.created_at)}
                      </FieldsText>
                    )}
                  </td>
                  <td>
                    {status.status === StatusTypes.FREE ? (
                      <FieldsText returned>Returned</FieldsText>
                    ) : status.status === 'Overdue' ? (
                      <FieldsText overdue>Overdue</FieldsText>
                    ) : (
                      <FieldsText>
                        {status.status === StatusTypes.BUSY
                          ? 'Claim'
                          : status.status}
                      </FieldsText>
                    )}
                  </td>
                </tr>
              ))}
            </StyledTable>
          </StyledScroll>
        ) : (
          <EmptyShelfWrapper>
            <img src={emptyList} alt="no items" />
            <p>
              {'Shelf of ' + name?.split(' ')[0] + "'s books and other items"}
            </p>
          </EmptyShelfWrapper>
        )}
      </CardWrapper>
    </div>
  );
};

export default ClaimTable;
