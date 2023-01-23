import React, { FC, useMemo } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import src from '../../../assets/MOC-data/BookImage.png';
import { getCurrentStatus } from '../../models/helperFunctions/getCurrentStatus';
import { IMaterial } from '../../types';
import { useNavigate } from 'react-router-dom';
import { OpenLink } from '../ManagerInfoCard';
import { RoutesTypes } from '../../../utils/routes';
import { StatusTypes } from '@mimir/global-types';

const Wrapper = styled.div`
  background: ${colors.bg_secondary};
  border-radius: ${dimensions.xs_1};
  transition: box-shadow 0.3s;
  padding: ${dimensions.xl_2};
  display: flex;
  flex: 1;
  min-width: 300px;
  cursor: pointer;

  :hover {
    box-shadow: 0 6px 14px -6px rgba(24, 39, 75, 0.08),
      0px 10px 32px -4px rgba(24, 39, 75, 0.08);
  }

  @media (max-width: ${dimensions.phone_width}) {
    max-width: 100%;
  }
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

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

const StyledUserName = styled(OpenLink)<{ type: string }>`
  text-decoration: underline;
  font-weight: 300;
  font-size: ${dimensions.sm};
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

interface IPropsBookCardExtended {
  item: IMaterial | null;
}

const BookCardExtended: FC<IPropsBookCardExtended> = ({ item }) => {
  const countOfHistoryClaimed = item?.statuses.filter(
    (elem) => elem?.status === StatusTypes.BUSY
  ).length;
  const navigate = useNavigate();
  const currenStatusElement = item?.statuses[item?.statuses.length - 1];
  const currentStatus = useMemo(
    () => getCurrentStatus(currenStatusElement),
    [currenStatusElement]
  );

  const handleItemRedirect = () => {
    navigate(`/item/${item?.id}`);
  };

  return (
    item && (
      <Wrapper onClick={handleItemRedirect} data-testid="book-card-extended">
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
                  {currentStatus.type === 'Overdue'
                    ? 'Overdue by'
                    : 'Claimed by'}
                </TitleStatus>
                <StyledUserName
                  type={currentStatus.type}
                  to={`${RoutesTypes.READERS}/${currentStatus.person_id}`}
                >
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
    )
  );
};

export default BookCardExtended;
