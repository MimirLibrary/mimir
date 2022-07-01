import React, { FC, ReactElement, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ManagerCardTypes } from '../../../utils/managerCardTypes';
import { colors, dimensions } from '@mimir/ui-kit';

export interface IField {
  title: string;
  description?: string;
  person_id: string;
  img: string;
}

interface IManagerInfoCard {
  type: ManagerCardTypes;
  fields: IField[];
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

const InlineFieldDescription = styled(FieldDescription)`
  width: 90%;
  order: 0;
  flex-grow: 0;
`;

const WrapperFooter = styled.div`
  order: 4;
  flex-grow: 0;
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

const InlineOpenLink = styled(OpenLink)`
  flex: none;
  position: absolute;
  right: 71px;
  order: 1;
  flex-grow: 0;
  text-align: center;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  order: 3;
  flex-grow: 0;
  height: auto;
  padding: 16px 0px 16px 16px;
  gap: 8px;
  background: ${colors.bg_fields};
  border-radius: 10px;
`;
const InlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

interface IFieldOpenLinkProps {
  secondary?: boolean;
}
const FieldOpenLink = styled(OpenLink)<IFieldOpenLinkProps>`
  font-weight: 400;
  color: ${({ secondary }) => (secondary ? colors.red_main : null)};
`;

const StyledIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${colors.bg_secondary};
  position: relative;
  :nth-child(2) {
    left: -16px;
  }
  :nth-child(3) {
    left: -32px;
  }
`;
const NotificationDescription = styled(FieldDescription)`
  position: relative;
  font-weight: 500;
  font-size: 14px;
  left: -16px;
  align-self: center;
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
              <FieldTitle>{field.title}</FieldTitle>
              <InlineWrapper>
                <InlineFieldDescription>
                  {field.description}
                </InlineFieldDescription>
                <InlineOpenLink>Answer</InlineOpenLink>
              </InlineWrapper>
              <FieldOpenLink>Ivan Ivanov</FieldOpenLink>
            </>
          ) : (
            <>
              <FieldTitle>{field.title}</FieldTitle>

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
        <>
          <InlineWrapper>
            {fields.slice(0, 3).map((field) => (
              <StyledIcon src={field.img}></StyledIcon>
            ))}
            {fields.length > 3 ? (
              <NotificationDescription>
                {`+ ${fields.length - 3} more`}
              </NotificationDescription>
            ) : null}
          </InlineWrapper>
        </>
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
