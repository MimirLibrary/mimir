import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ManagerCardTypes } from '../../../utils/managerCardTypes';
import { colors, dimensions } from '@mimir/ui-kit';

interface IManagerInfoCard {
  type: ManagerCardTypes;
  fields: [];
}

const WrapperCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  width: 100%;
  box-shadow: 0px 10px 70px rgba(26, 30, 214, 0.08);
  border-radius: 10px;
  padding: 24px;
  padding-bottom: 28px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
  line-height: ${dimensions.xl_3};
  color: ${colors.main_black};
`;

const Description = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
`;
const WrapperFooter = styled.div`
  display: flex;
  flex-direction: row;
  buttom: 10px;
  justify-content: space-between;
`;
const OpenLink = styled.a`
  cursor: pointer;
  font-weight: 500;
  color: ${colors.accent_color};
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  width: 94px;
  text-align: right;
  text-decoration: underline;
`;

function renderSwitch(type: ManagerCardTypes) {
  switch (type) {
    case ManagerCardTypes.OVERDUE:
      return 'The following users have not turned in their books';
    case ManagerCardTypes.DONATES:
      return 'New arrivals awaiting your confirmation';
    case ManagerCardTypes.NOTIFICATIONS:
      return 'Problems faced by users';
  }
}

const ManagerInfoCard: FC<IManagerInfoCard> = ({ type, fields = [] }) => {
  const [description, setDescription] = useState('');
  useEffect(() => {
    setDescription(renderSwitch(type));
  }, []);

  return (
    <WrapperCard style={{ gridArea: type }}>
      <Title>{type.split('_').join(' ') + ` — (${fields.length})`}</Title>
      <Description>{description}</Description>

      <WrapperFooter>
        <p>pictures will be here</p>
        <OpenLink>{`See all ${
          type === ManagerCardTypes.OVERDUE
            ? 'overdues'
            : type === ManagerCardTypes.DONATES
            ? 'donates'
            : 'notifications'
        }`}</OpenLink>
      </WrapperFooter>
    </WrapperCard>
  );
};

export default React.memo(ManagerInfoCard);
