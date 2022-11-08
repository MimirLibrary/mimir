import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { ManagerCardTypes } from './managerCardTypes';
import { colors, dimensions } from '@mimir/ui-kit';
import { t } from 'i18next';
import { RoutesTypes } from '../../../utils/routes';
import { Link } from 'react-router-dom';
import { IField, IOverdueItem } from '../../types';
import { IMaterialDonate } from '../../types/donateList';
import overdue_placeholder from '../../../assets/overdue_placeholder.png';
import donate_placeholder from '../../../assets/donate_placeholder.png';
import notification_placeholder from '../../../assets/notification_placeholder.png';
import Modal from '../Modal';
import AnswerToUser from '../AnswerToUser';
import { ReactComponent as AddBookBluePlus } from '../../../assets/AddBookBluePlus.svg';
import useScanner from '../../hooks/useScanner';
import Scanner from '../Scanner';
interface IManagerInfoCard {
  type: ManagerCardTypes;
  fieldsOverdue?: Array<IOverdueItem | null>;
  fieldsDonate?: Array<IMaterialDonate | null>;
  fieldsNotification?: IField[] | null | undefined;
}

interface IDataOfMessage {
  id: string;
  person_id: string;
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
  position: relative;
  padding: ${dimensions.xl_2} ${dimensions.xl_2} ${dimensions.xl_3}
    ${dimensions.xl_2};
  @media (max-width: ${dimensions.tablet_width}) {
    box-shadow: none;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 300px;
    border-radius: 0;
    :first-of-type {
      margin-bottom: ${dimensions.xl_3};
    }
  }
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
  line-height: ${dimensions.xl_3};
  color: ${colors.main_black};
  @media (max-width: ${dimensions.tablet_width}) {
    font-size: ${dimensions.xl};
  }
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
  @media (max-width: ${dimensions.tablet_width}) {
    display: none;
  }
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
  margin-top: ${dimensions.xs_2};
  :first-of-type {
    margin-top: 0;
  }
`;
export const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${dimensions.tablet_width}) {
    display: block;
  }
`;

interface IFieldOpenLinkProps {
  secondary?: string;
}
export const FieldOpenLink = styled(OpenLink)<IFieldOpenLinkProps>`
  font-weight: 400;
  width: auto;
  margin-left: 4px;
  text-decoration: underline;
  color: ${({ secondary }) =>
    secondary ? colors.problem_red : colors.accent_color};
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${dimensions.xs_2};
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

const WrapperForEmptyBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  img {
    position: relative;
    z-index: 1;
    @media (max-width: ${dimensions.tablet_width}) {
      height: 100px;
    }
  }
`;

const WrapperCircle = styled.div`
  border-radius: 50%;
  height: 270px;
  max-width: 270px;
  width: 100%;
  background-color: #f2f6ff;
  position: absolute;
  @media (max-width: ${dimensions.tablet_width}) {
    height: 170px;
    max-width: 170px;
  }
`;

const TitleEmpty = styled.h3<{ top: string }>`
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  position: relative;
  top: ${(props) => props.top};
  z-index: 1;
  text-align: center;
  @media (max-width: ${dimensions.tablet_width}) {
    display: none;
  }
`;

const WrapperList = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  height: 100%;
  flex-direction: column;
  margin-top: ${dimensions.base};
`;

const InlineFieldDescription = styled(FieldDescription)`
  max-width: 80%;
  order: 0;
  flex-grow: 0;
`;

const ButtonAnswer = styled.button`
  flex: none;
  outline: none;
  border: none;
  background: transparent;
  text-decoration: underline;
  color: ${colors.accent_color};
  font-size: ${dimensions.base};
  position: absolute;
  right: 71px;
  order: 1;
  flex-grow: 0;
  text-align: center;
  cursor: pointer;
  @media (max-width: ${dimensions.tablet_width}) {
    position: static;
    display: block;
    text-align: center;
  }
`;
const AddWrapper = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: ${dimensions.tablet_width}) {
    display: block;
    position: absolute;
    right: 20px;
    top: 70px;
  }
`;

const answers = [
  'You have missed the due date for your book. Return it as soon as possible or contact the manager in room 35',
  'We have accepted your donation to the library! Thank you!',
  "If you don't check out all expired items in the library within a week, you will be banned from the app",
];

const ManagerInfoCard: FC<IManagerInfoCard> = ({
  type,
  fieldsOverdue,
  fieldsDonate,
  fieldsNotification,
}) => {
  const [isAnswerModal, setIsAnswerModal] = useState<boolean>(false);
  const [dataOfMessage, setDataOfMessage] = useState<IDataOfMessage | null>(
    null
  );
  const handleAnswerModal = useCallback(
    (dataOfMessage: IDataOfMessage) => {
      setDataOfMessage(dataOfMessage);
      setIsAnswerModal(true);
    },
    [dataOfMessage]
  );
  const {
    isShowScanner,
    setIsShowScanner,
    handleOnDetectedScannerRoute,
    handleOnCloseScanner,
  } = useScanner();
  const handleClose = useCallback(() => {
    setIsAnswerModal(false);
  }, []);
  const handleClickOnOpenScanner = useCallback(() => {
    setIsShowScanner(true);
  }, [setIsShowScanner]);
  return (
    <>
      {fieldsOverdue && (
        <WrapperCard data-testid="overdueCard">
          <div>
            <Title>
              {t(`ManagerInfoCard.Title.${type}`) +
                ` — (${fieldsOverdue?.length})`}
            </Title>
            <Description>
              {t(`ManagerInfoCard.Description.${type}`)}
            </Description>
          </div>
          {!fieldsOverdue.length ? (
            <WrapperForEmptyBlock>
              <WrapperCircle />
              <img
                src={overdue_placeholder}
                alt="overdue_placeholder"
                data-testid="overdue-placeholder"
              />
              <TitleEmpty top="45px">
                {t('PlaceholderTitle.Overdue')}
              </TitleEmpty>
            </WrapperForEmptyBlock>
          ) : (
            <WrapperList>
              {fieldsOverdue?.slice(0, 3).map((field) => (
                <FieldWrapper key={field?.id}>
                  <FieldTitle>{field?.material.title}</FieldTitle>
                  <InlineWrapper>
                    <FieldDescription>
                      {t(`ManagerInfoCard.FieldDescription.${type}`)}
                    </FieldDescription>
                    <FieldOpenLink
                      secondary="true"
                      to={`${RoutesTypes.READERS}/${field?.person.id}`}
                    >
                      {field?.person.username}
                    </FieldOpenLink>
                  </InlineWrapper>
                </FieldWrapper>
              ))}
            </WrapperList>
          )}
          <WrapperFooter>
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

            {!!fieldsOverdue.length && (
              <OpenLink to={`home/${type.toLowerCase()}`}>
                {t(`ManagerInfoCard.Link.${type}`)}
              </OpenLink>
            )}
          </WrapperFooter>
        </WrapperCard>
      )}
      {fieldsDonate && (
        <WrapperCard data-testid="donateCard">
          <div>
            <Title>
              {t(`ManagerInfoCard.Title.${type}`) +
                ` — (${fieldsDonate?.length})`}
            </Title>
            <Description>
              {t(`ManagerInfoCard.Description.${type}`)}
            </Description>
          </div>
          {!fieldsDonate.length ? (
            <WrapperForEmptyBlock>
              <WrapperCircle />
              <img
                src={donate_placeholder}
                alt="donate_placeholder"
                data-testid="donate-placeholder"
              />
              <TitleEmpty top="20px">{t('PlaceholderTitle.Donate')}</TitleEmpty>
            </WrapperForEmptyBlock>
          ) : (
            <WrapperList data-testid="items-list">
              {fieldsDonate?.slice(0, 3).map((field) => (
                <FieldWrapper key={field?.id}>
                  <FieldTitle>{field?.title}</FieldTitle>
                  <InlineWrapper>
                    <FieldDescription>
                      {t(`ManagerInfoCard.FieldDescription.${type}`)}
                    </FieldDescription>
                    <FieldOpenLink
                      secondary="true"
                      to={`${RoutesTypes.READERS}/${
                        field?.statuses[field?.statuses.length - 1]?.person.id
                      }`}
                    >
                      {
                        field?.statuses[field?.statuses.length - 1]?.person
                          .username
                      }
                    </FieldOpenLink>
                  </InlineWrapper>
                </FieldWrapper>
              ))}
            </WrapperList>
          )}
          <WrapperFooter>
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

            {!!fieldsDonate.length && (
              <OpenLink to={`${RoutesTypes.DONATES_FROM_USER}`}>
                {t(`ManagerInfoCard.Link.${type}`)}
              </OpenLink>
            )}
          </WrapperFooter>
        </WrapperCard>
      )}
      {fieldsNotification && (
        <WrapperCard data-testid="notificationCard">
          <div>
            <Title>
              {t(`ManagerInfoCard.Title.Notifications`) +
                ` — (${fieldsNotification?.length})`}
            </Title>
            <AddWrapper onClick={handleClickOnOpenScanner}>
              <AddBookBluePlus />
            </AddWrapper>
            <Description>
              {t(`ManagerInfoCard.Description.Notifications`)}
            </Description>
          </div>
          {!fieldsNotification.length ? (
            <WrapperForEmptyBlock>
              <WrapperCircle />
              <img
                src={notification_placeholder}
                alt="notification_placeholder"
                data-testid="notification-placeholder"
              />
              <TitleEmpty top="20px">
                {t('PlaceholderTitle.Notifications')}
              </TitleEmpty>
            </WrapperForEmptyBlock>
          ) : (
            fieldsNotification?.slice(0, 3).map((field) => (
              <FieldWrapper key={field.id} data-testid="newNotif">
                <>
                  <FieldTitle>{field.title}</FieldTitle>
                  <InlineWrapper>
                    <InlineFieldDescription>
                      {field.message}
                    </InlineFieldDescription>
                    <ButtonAnswer
                      onClick={() =>
                        handleAnswerModal({
                          id: field.id,
                          person_id: field.person.id,
                        })
                      }
                    >
                      {t('ManagerInfoCard.Link.Answer')}
                    </ButtonAnswer>
                  </InlineWrapper>
                  <FieldOpenLink
                    to={`${RoutesTypes.READERS}/${field.person.id}`}
                  >
                    {field.person.username}
                  </FieldOpenLink>
                </>
              </FieldWrapper>
            ))
          )}
          <WrapperFooter>
            <InlineWrapper>
              {fieldsNotification?.slice(0, 3).map((field) => (
                <StyledIcon key={field.id} src={field.person.avatar} />
              ))}
              {fieldsNotification!.length > 3 ? (
                <NotificationDescription>
                  {`+${fieldsNotification!.length - 3} ` +
                    t(`ManagerInfoCard.Description.More`)}
                </NotificationDescription>
              ) : null}
            </InlineWrapper>
            {!!fieldsNotification.length && (
              <OpenLink to="/notifications">
                {t(`ManagerInfoCard.Link.Notifications`)}
              </OpenLink>
            )}
          </WrapperFooter>
        </WrapperCard>
      )}
      {isShowScanner && (
        <Scanner
          onDetected={handleOnDetectedScannerRoute}
          onClose={handleOnCloseScanner}
        />
      )}
      <Modal active={isAnswerModal} setActive={setIsAnswerModal}>
        {isAnswerModal && (
          <AnswerToUser
            id={dataOfMessage?.id}
            person_id={dataOfMessage?.person_id}
            answers={answers}
            close={handleClose}
          />
        )}
      </Modal>
    </>
  );
};

export default React.memo(ManagerInfoCard);
