import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ManagerCardTypes } from './managerCardTypes';
import { colors, dimensions } from '@mimir/ui-kit';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { RoutesTypes } from '../../../utils/routes';

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
  height: inherit;
  width: 100%;
  box-shadow: ${colors.shadow};
  border-radius: ${dimensions.xs_1};
  padding: ${dimensions.xl_2} ${dimensions.xl_2} ${dimensions.xl_3}
    ${dimensions.xl_2};
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
  bottom: ${dimensions.xs_1};
  justify-content: space-between;
`;
const OpenLink = styled.a`
  cursor: pointer;
  font-weight: 500;
  color: ${colors.accent_color};
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  width: 120px;
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
  padding: ${dimensions.base} 0px ${dimensions.base} ${dimensions.base};
  gap: ${dimensions.xs_2};
  background: ${colors.bg_fields};
  border-radius: ${dimensions.xs_1};
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
  width: auto;
  margin-left: 4px;
  color: ${({ secondary }) => (secondary ? colors.problem_red : null)};
`;

const StyledIcon = styled.img`
  width: ${dimensions.base_3};
  height: ${dimensions.base_3};
  border-radius: 50%;
  border: 2px solid ${colors.bg_secondary};
  position: relative;
  :nth-of-type(2) {
    left: -16px;
  }
  :nth-of-type(3) {
    left: -32px;
  }
`;
const NotificationDescription = styled(FieldDescription)`
  position: relative;
  font-weight: 500;
  font-size: ${dimensions.sm};
  left: -16px;
  align-self: center;
`;

const ManagerInfoCard: FC<IManagerInfoCard> = ({ type, fields = [] }) => {
  const navigate = useNavigate();

  const navigateToList = () => {
    navigate(RoutesTypes.HOME + '/' + type.toLowerCase());
  };

  return (
    <WrapperCard>
      <Title>
        {t(`ManagerInfoCard.Title.${type}`) + ` — (${fields.length})`}
      </Title>
      <Description>{t(`ManagerInfoCard.Description.${type}`)}</Description>
      {fields.slice(0, 3).map((field, key) => (
        <FieldWrapper key={key + Math.random()}>
          {type === ManagerCardTypes.NOTIFICATIONS ? (
            <>
              <FieldTitle>{field.title}</FieldTitle>
              <InlineWrapper>
                <InlineFieldDescription>
                  {field.description}
                </InlineFieldDescription>
                <InlineOpenLink>
                  {t('ManagerInfoCard.Link.Answer')}
                </InlineOpenLink>
              </InlineWrapper>
              <FieldOpenLink>Ivan Ivanov</FieldOpenLink>
            </>
          ) : (
            <>
              <FieldTitle>{field.title}</FieldTitle>
              <InlineWrapper>
                <FieldDescription>
                  {t(`ManagerInfoCard.FieldDescription.${type}`)}
                </FieldDescription>
                <FieldOpenLink secondary>Ivan Ivanov</FieldOpenLink>
              </InlineWrapper>
            </>
          )}
        </FieldWrapper>
      ))}
      <WrapperFooter>
        <>
          <InlineWrapper>
            {fields.slice(0, 3).map((field, index) => (
              <StyledIcon key={index + Math.random()} src={field.img} />
            ))}
            {fields.length > 3 ? (
              <NotificationDescription>
                {`+${fields.length - 3} ` +
                  t(`ManagerInfoCard.Description.More`)}
              </NotificationDescription>
            ) : null}
          </InlineWrapper>
        </>
        <OpenLink onClick={navigateToList}>
          {t(`ManagerInfoCard.Link.${type}`)}
        </OpenLink>
      </WrapperFooter>
    </WrapperCard>
  );
};

export default React.memo(ManagerInfoCard);
