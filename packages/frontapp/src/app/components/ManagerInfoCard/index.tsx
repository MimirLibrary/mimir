import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ManagerCardTypes } from '../../../utils/managerCardTypes';
import { colors, dimensions } from '@mimir/ui-kit';

interface IManagerInfoCard {
  type: ManagerCardTypes;
  fields: string[];
}

const WrapperCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${colors.bg_secondary};
  width: 100%;
  box-shadow: 0px 10px 70px rgba(26, 30, 214, 0.08);
  border-radius: 10px;
  padding: 24px 24px 28px 24px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
  line-height: ${dimensions.xl_3};
  color: ${colors.main_black};
`;

const FieldTitle = styled.p`
  font-weight: 600;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

const Description = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
`;

const FieldDescription = styled.p`
  display: flex;

  font-weight: 400;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
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

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  padding: 16px 0px 16px 16px;
  gap: 8px;
  background: ${colors.bg_fields};
  border-radius: 10px;
`;

interface IFieldOpenLinkProps {
  secondary?: boolean;
}
const FieldOpenLink = styled(OpenLink)<IFieldOpenLinkProps>`
  font-weight: 400;
  color: ${({ secondary }) => (secondary ? colors.red_main : null)};
`;

const InlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
  console.log(fields);
  return (
    <WrapperCard style={{ gridArea: type }}>
      <Title>{type.split('_').join(' ') + ` — (${fields.length})`}</Title>
      <Description>{description}</Description>
      {fields.slice(0, 3).map((field, key) => (
        <FieldWrapper>
          {type === ManagerCardTypes.NOTIFICATIONS ? (
            <>
              <FieldTitle>Problem with iban</FieldTitle>
              <FieldDescription>
                Cant scan book
                clnflwmfmd;lwmd;md;m;ewm;wme;wme;wf;wef;ewmewwewerwewwwewewrw
                clnflwmfmd;l clnflwmfmd;lwmd;md;m;ewm;wme;wf;wef;ewmf;ew
                clnflwmfmd;lwmd;md;m;ewm;wme
              </FieldDescription>
              <OpenLink>Answer</OpenLink>

              <FieldOpenLink>Ivan Ivanov</FieldOpenLink>
            </>
          ) : (
            <>
              <FieldTitle>Alice in Wonderland</FieldTitle>

              {type === ManagerCardTypes.OVERDUE ? (
                <InlineWrapper>
                  <FieldDescription>Was overdue by</FieldDescription>
                  <FieldOpenLink secondary>Ivan Ivanov</FieldOpenLink>
                </InlineWrapper>
              ) : (
                <InlineWrapper>
                  <FieldDescription>Was donated by</FieldDescription>
                  <FieldOpenLink>Ivan Ivanov</FieldOpenLink>
                </InlineWrapper>
              )}
            </>
          )}
        </FieldWrapper>
      ))}
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
