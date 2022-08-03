import React, { FC } from 'react';
import Avatar from '../Avatar';
import { mockData } from './mockData';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useNavigate } from 'react-router-dom';
import { IClaimHistory } from '../../models/helperFunctions/claimHistory';
import ClaimHistory from '../ClaimHistory';

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${dimensions.base};
  row-gap: ${dimensions.xs_2};
  > p:first-child {
    margin-bottom: ${dimensions.xs_2};
  }
`;

const ClaimsWrapper = styled.div`
  font-size: ${dimensions.sm};
  row-gap: 4px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: ${colors.bg_secondary};
  width: 320px;
  margin: 0 0 ${dimensions.xl};
  height: 151px;
  padding: ${dimensions.xl_2};
  box-shadow: ${colors.shadow};
  border-radius: ${dimensions.xs_1};
`;
const AvatarWrapper = styled.div`
  height: 71px;
  width: 71px;
  border-radius: 50%;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
`;

export interface ISingleUser {
  avatar: string | null | undefined;
  id: string;
  name: string;
  statuses: IClaimHistory[];
}

const SingleUser: FC<ISingleUser> = ({
  id = '',
  statuses = [],
  name,
  avatar,
}) => {
  const navigate = useNavigate();
  const handleUserRedirect = () => {
    navigate(`/readers/${id}`);
  };

  return (
    <CardWrapper onClick={handleUserRedirect}>
      <AvatarWrapper>
        <Avatar src={avatar || mockData.avatar} />
      </AvatarWrapper>
      <InfoWrapper>
        <Description>{name}</Description>
        <ClaimsWrapper>
          <ClaimHistory statuses={statuses} />
        </ClaimsWrapper>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default SingleUser;
