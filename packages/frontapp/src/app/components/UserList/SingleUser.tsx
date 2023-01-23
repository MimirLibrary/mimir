import React, { FC } from 'react';
import Avatar from '../Avatar';
import { mockData } from './mockData';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useNavigate } from 'react-router-dom';
import { IClaimHistory } from '../../models/helperFunctions/claimHistory';
import ClaimHistory from '../ClaimHistory';
import { RoutesTypes } from '../../../utils/routes';

interface IInfoWrapper {
  underlined?: boolean;
}

const InfoWrapper = styled.div<IInfoWrapper>`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: ${dimensions.base};
  padding-bottom: ${(props) => (props.underlined ? '0.5rem' : null)};
  border-bottom: ${(props) => (props.underlined ? '1px solid #333333' : null)}};

  > p:first-of-type {
    margin-bottom: ${dimensions.xs_2};
  }
  @media (max-width: ${dimensions.tablet_width}) {
    width: 100%;
    //border-bottom: 1px solid #bdbdbd;
    padding-bottom: ${dimensions.sm};
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
  min-width: 320px;
  height: 151px;
  padding: ${dimensions.xl_2};
  border-radius: ${dimensions.xs_1};
  transition: box-shadow 0.3s;
  cursor: pointer;
  flex: 1;
  :hover {
    box-shadow: 0 6px 14px -6px rgba(24, 39, 75, 0.08),
      0 10px 32px -4px rgba(24, 39, 75, 0.08);
  }

  @media (max-width: ${dimensions.phone_width}) {
    flex: 1;
  }
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
  className?: string;
  underlined?: boolean;
  hoverable?: boolean;
}

const SingleUser: FC<ISingleUser> = ({
  id = '',
  statuses = [],
  name,
  avatar,
  className,
  underlined = false,
}) => {
  const navigate = useNavigate();
  const handleUserRedirect = () => {
    navigate(`${RoutesTypes.READERS}/${id}`);
  };

  return (
    <CardWrapper
      className={className}
      onClick={handleUserRedirect}
      data-testid="single-user"
    >
      <AvatarWrapper>
        <Avatar src={avatar || mockData.avatar} />
      </AvatarWrapper>
      <InfoWrapper underlined={underlined}>
        <Description style={{ marginBottom: '0.5rem' }}>{name}</Description>
        <ClaimsWrapper>
          <ClaimHistory statuses={statuses} />
        </ClaimsWrapper>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default SingleUser;
