import React, { FC, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { WrapperLoader } from '../DonateBookFlow';
import OverdueCard from '../OverdueCard';
import { useGetAllStatusesIsOverdueQuery } from '@mimir/apollo-client';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import {
  isOverdue,
  isOverdueToday,
} from '../../models/helperFunctions/converTime';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { locationIds } from '../../store/slices/userSlice';
import BackButton from '../BackButton';

const Wrapper = styled.main``;

const WrapperOverdueInstructions = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: ${dimensions.xl_6};
`;

const Title = styled.h1`
  font-weight: 700;
  line-height: ${dimensions.xl_3};
  font-size: ${dimensions.xl_2};
  color: ${colors.main_black};
  margin: ${dimensions.xl_3} 0 ${dimensions.base} 0;
`;

const SubTitle = styled.h4`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
`;

const TitleList = styled.h2`
  font-weight: 600;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.black};
  margin-bottom: ${dimensions.xl_2};
  margin-top: ${dimensions.xs_2};
`;

const OverdueList: FC = () => {
  const locations = useAppSelector(locationIds);
  const { data, loading, error } = useGetAllStatusesIsOverdueQuery({
    variables: { locations },
  });

  const todayOverdueList = useMemo(
    () =>
      data?.getAllStatusesIsOverdue.filter(
        (item) =>
          isOverdueToday(item?.returnDate) && isOverdue(item?.returnDate)
      ),
    [data]
  );

  const earlierOverdueList = useMemo(
    () =>
      data?.getAllStatusesIsOverdue.filter(
        (item) =>
          !isOverdueToday(item?.returnDate) && isOverdue(item?.returnDate)
      ),
    [data]
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    return;
  }, [error]);

  return (
    <Wrapper>
      {loading ? (
        <WrapperLoader>
          <Oval
            ariaLabel="loading-indicator"
            height={100}
            width={100}
            strokeWidth={5}
            strokeWidthSecondary={1}
            color="blue"
            secondaryColor="white"
          />
        </WrapperLoader>
      ) : (
        <>
          <WrapperOverdueInstructions>
            <BackButton />
            <Title>Overdues</Title>
            <SubTitle>
              The following users have not turned in their books
            </SubTitle>
          </WrapperOverdueInstructions>
          <TitleList>Today</TitleList>
          {todayOverdueList?.length ? (
            todayOverdueList.map((item) => (
              <OverdueCard
                key={item?.id}
                item={item}
                backgroundColor={`${colors.bg_secondary}`}
              />
            ))
          ) : (
            <SubTitle>List is empty</SubTitle>
          )}
          <TitleList>Earlier</TitleList>
          {earlierOverdueList?.length ? (
            earlierOverdueList?.map((item) => (
              <OverdueCard
                key={item?.id}
                item={item}
                backgroundColor={`${colors.bg_fields}`}
              />
            ))
          ) : (
            <SubTitle>List is empty</SubTitle>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default OverdueList;
