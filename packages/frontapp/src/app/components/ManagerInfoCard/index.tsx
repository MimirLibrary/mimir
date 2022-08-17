import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { ManagerCardTypes } from './managerCardTypes';
import { colors, dimensions } from '@mimir/ui-kit';
import { t } from 'i18next';
import { RoutesTypes } from '../../../utils/routes';
import { Link } from 'react-router-dom';
import { IField, IOverdueItem } from '../../types';
import { IMaterialDonate } from '../../types/donateList';

interface IManagerInfoCard {
  type: ManagerCardTypes;
  fieldsOverdue?: Array<IOverdueItem | null>;
  fieldsDonate?: Array<IMaterialDonate | null>;
}

export const WrapperCard = styled.div`
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

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${dimensions.xs_2};
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
  line-height: ${dimensions.xl_3};
  color: ${colors.main_black};
`;

export const FieldTitle = styled.p`
  font-weight: 600;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

export const Description = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
`;

export const FieldDescription = styled.p`
  display: flex;
  font-weight: 400;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

export const WrapperFooter = styled.div`
  order: 4;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  bottom: ${dimensions.xs_1};
  justify-content: space-between;
`;
export const OpenLink = styled(Link)`
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
  @media (max-width: ${dimensions.tablet_width}) {
    position: static;
    display: block;
    text-align: center;
  }
`;

export const FieldWrapper = styled.div`
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
export const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface IFieldOpenLinkProps {
  secondary?: string;
}
export const FieldOpenLink = styled.span<IFieldOpenLinkProps>`
  font-weight: 400;
  width: auto;
  margin-left: 4px;
  text-decoration: underline;
  color: ${({ secondary }) =>
    secondary ? colors.problem_red : colors.accent_color};
`;

export const StyledIcon = styled.img`
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
export const NotificationDescription = styled(FieldDescription)`
  position: relative;
  font-weight: 500;
  font-size: ${dimensions.sm};
  left: -16px;
  align-self: center;
`;

const ManagerInfoCard: FC<IManagerInfoCard> = ({
  type,
  fieldsOverdue,
  fieldsDonate,
}) => {
  const [isAnswerModal, setIsAnswerModal] = useState<boolean>(false);

  return (
    <>
      {fieldsOverdue && (
        <WrapperCard>
          <ColumnWrapper>
            <Title>
              {t(`ManagerInfoCard.Title.${type}`) +
                ` — (${fieldsOverdue?.length})`}
            </Title>
            <Description>
              {t(`ManagerInfoCard.Description.${type}`)}
            </Description>
            {!fieldsOverdue.length ? (
              <div>List is empty</div>
            ) : (
              fieldsOverdue?.slice(0, 3).map((field) => (
                <FieldWrapper key={field?.id}>
                  <>
                    <FieldTitle>{field?.material.title}</FieldTitle>
                    <InlineWrapper>
                      <FieldDescription>
                        {t(`ManagerInfoCard.FieldDescription.${type}`)}
                      </FieldDescription>
                      <FieldOpenLink secondary="true">
                        {field?.person.username}
                      </FieldOpenLink>
                    </InlineWrapper>
                  </>
                </FieldWrapper>
              ))
            )}
          </ColumnWrapper>
          <WrapperFooter>
            <>
              <InlineWrapper>
                {fieldsOverdue?.slice(0, 3).map((field) => (
                  <StyledIcon key={field?.id} src={field?.person.avatar} />
                ))}
                {fieldsOverdue!.length > 3 ? (
                  <NotificationDescription>
                    {`+${fieldsOverdue.length - 3}` +
                      t(`ManagerInfoCard.Description.More`)}
                  </NotificationDescription>
                ) : null}
              </InlineWrapper>
            </>
            <OpenLink to={`home/${type.toLowerCase()}`}>
              {t(`ManagerInfoCard.Link.${type}`)}
            </OpenLink>
          </WrapperFooter>
        </WrapperCard>
      )}
      {fieldsDonate && (
        <WrapperCard>
          <ColumnWrapper>
            <Title>
              {t(`ManagerInfoCard.Title.${type}`) +
                ` — (${fieldsDonate?.length})`}
            </Title>
            <Description>
              {t(`ManagerInfoCard.Description.${type}`)}
            </Description>
            {!fieldsDonate.length ? (
              <div>List is empty</div>
            ) : (
              fieldsDonate?.slice(0, 3).map((field) => (
                <FieldWrapper key={field?.id}>
                  <>
                    <FieldTitle>{field?.title}</FieldTitle>
                    <InlineWrapper>
                      <FieldDescription>
                        {t(`ManagerInfoCard.FieldDescription.${type}`)}
                      </FieldDescription>
                      <FieldOpenLink secondary="true">
                        {
                          field?.statuses[field?.statuses.length - 1]?.person
                            .username
                        }
                      </FieldOpenLink>
                    </InlineWrapper>
                  </>
                </FieldWrapper>
              ))
            )}
          </ColumnWrapper>
          <WrapperFooter>
            <>
              <InlineWrapper>
                {fieldsDonate?.slice(0, 3).map((field) => (
                  <StyledIcon
                    key={field?.id}
                    src={
                      field?.statuses[field?.statuses.length - 1]?.person.avatar
                    }
                  />
                ))}
                {fieldsDonate.length > 3 ? (
                  <NotificationDescription>
                    {`+${fieldsDonate.length - 3}` +
                      t(`ManagerInfoCard.Description.More`)}
                  </NotificationDescription>
                ) : null}
              </InlineWrapper>
            </>
            <OpenLink to={`${RoutesTypes.DONATES_FROM_USER}`}>
              {t(`ManagerInfoCard.Link.${type}`)}
            </OpenLink>
          </WrapperFooter>
        </WrapperCard>
      )}
    </>
  );
};

export default React.memo(ManagerInfoCard);
