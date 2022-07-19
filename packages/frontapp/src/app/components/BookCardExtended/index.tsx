import React, { FC, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import src from '../../../assets/MOC-data/BookImage.png';
import { isOverdue } from '../../models/helperFunctions/converTime';

const Wrapper = styled.div`
  background: ${colors.bg_secondary};
  border-radius: ${dimensions.xs_1};
  padding: ${dimensions.xl_2};
  display: flex;
  max-width: 300px;
  width: 100%;
`;

const WrapperImg = styled.div`
  img {
    width: 72px;
    height: 115px;
  }
`;

const WrapperDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: ${dimensions.base};
`;

const Title = styled.h4`
  font-weight: 500;
  font-size: ${dimensions.base};
  color: ${colors.main_black};
  line-height: ${dimensions.xl};
  margin-bottom: ${dimensions.base};
`;

const TitleGenre = styled.p`
  font-weight: 300;
  font-size: ${dimensions.sm};
  color: ${colors.description_gray};
  line-height: ${dimensions.base};
  margin-bottom: 0.25rem;
`;

const TitleState = styled.p`
  font-weight: 500;
  font-size: ${dimensions.sm};
  color: ${colors.main_black};
  line-height: ${dimensions.base};
`;

const TitleStatus = styled.span`
  font-weight: 300;
  font-size: ${dimensions.sm};
  color: ${colors.main_black};
  line-height: ${dimensions.base};
  margin-bottom: 0.25rem;
  margin-right: 0.2rem;
`;

const StyledUserName = styled.span<{ type: string }>`
  text-decoration: underline;
  color: ${(props) =>
    props.type === 'Overdue' ? colors.problem_red : colors.accent_color};
`;

const TitleClaimHistory = styled.p`
  font-weight: 500;
  font-size: ${dimensions.sm};
  color: ${colors.main_black};
  line-height: ${dimensions.base};
  margin-top: ${dimensions.xs_2};
  margin-bottom: 0.25rem;
`;

const HistoryBook = styled.p`
  font-weight: 300;
  font-size: ${dimensions.sm};
  color: ${colors.main_black};
  line-height: ${dimensions.base};
`;

interface IPerson {
  __typename?: 'Person' | undefined;
  id: string;
  username: string;
}

interface IStatuses {
  __typename?: 'Status' | undefined;
  id: string;
  created_at: any;
  status: string;
  person: IPerson;
}

interface IItem {
  __typename?: 'Material' | undefined;
  id: string;
  title: string;
  category: string;
  picture?: string | null | undefined;
  statuses: Array<IStatuses | null>;
}

interface IPropsBookCardExtended {
  item: IItem | null;
}

function getCurrentStatus(currentStatus: IStatuses | null | undefined) {
  switch (currentStatus?.status) {
    case 'Free':
      return 'on the shelf';
    case 'Busy' || 'Prolong': {
      if (isOverdue(currentStatus.created_at)) {
        return {
          type: 'Overdue',
          body: currentStatus?.person.username,
        };
      }
      return {
        type: 'Busy',
        body: currentStatus?.person.username,
      };
    }
    case 'Pending':
      return 'Pending approval';
    default:
      return '-';
  }
}

const BookCardExtended: FC<IPropsBookCardExtended> = ({ item }) => {
  const countOfHistoryClaimed = item?.statuses.filter(
    (elem) => elem?.status === 'Busy'
  ).length;

  const currenStatusElement = item?.statuses[item?.statuses.length - 1];
  const currentStatus = useMemo(
    () => getCurrentStatus(currenStatusElement),
    [currenStatusElement]
  );

  return (
    <Wrapper>
      <WrapperImg>
        <img src={item?.picture || src} alt="book-img" />
      </WrapperImg>
      <WrapperDescription>
        <Title>{item?.title}</Title>
        <TitleGenre>{item?.category}</TitleGenre>
        <TitleState>State:</TitleState>
        <TitleStatus>
          {typeof currentStatus === 'string' ? (
            currentStatus
          ) : (
            <>
              <TitleStatus>
                {currentStatus.type === 'Overdue' ? 'Overdue by' : 'Claimed by'}
              </TitleStatus>
              <StyledUserName type={currentStatus.type}>
                {currentStatus.body}
              </StyledUserName>
            </>
          )}
        </TitleStatus>
        <TitleClaimHistory>Claim history:</TitleClaimHistory>
        <HistoryBook>
          was claimed {countOfHistoryClaimed || 0} times
        </HistoryBook>
      </WrapperDescription>
    </Wrapper>
  );
};

export default BookCardExtended;
