import React, { FC, useCallback, useState } from 'react';
import { t } from 'i18next';
import {
  specialParseDate,
  todayCondition,
} from '../../models/helperFunctions/converTime';
import { OpenLink } from '../ManagerInfoCard';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { RoutesTypes } from '../../../utils/routes';
import { Description, Title } from '../UserCard';
import AnswerToUser from '../AnswerToUser';
import Modal from '../Modal';

export interface IOneNotification {
  id: string | undefined;
  type: string;
  created_at: Date;
  title: string;
  message?: string;
  user?: { id: string; name: string };
}

interface INotifications {
  notifications: IOneNotification[];
  showUserLink?: boolean;
}

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: inherit;
`;

const Subtitle = styled.h2`
  margin-top: ${dimensions.xl_2};
  margin-bottom: ${dimensions.base};
  font-weight: 600;
  font-size: ${dimensions.xl};
`;

interface INotificationsProps {
  message?: boolean;
  today?: boolean;
}

const NotificationWrapper = styled.div<INotificationsProps>`
  width: 100%;
  row-gap: ${dimensions.xs_2};
  background-color: ${({ message, today }) =>
    message && today ? '#FFFFFF' : '#EFF4FF'};
  padding: ${dimensions.base};
  display: flex;
  align-items: ${({ message }) => (message ? 'center' : null)};
  flex-direction: ${({ message }) => (message ? 'row' : 'column')};
  justify-content: ${({ message }) => (message ? 'space-between' : null)};
  border-radius: ${dimensions.xs_1};
  margin-bottom: ${dimensions.base};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

interface IRestyledOpenLinkProps {
  showuserlink: boolean;
}

const RestyledOpenLink = styled(OpenLink)<IRestyledOpenLinkProps>`
  display: ${(props) => (props.showuserlink ? 'inline' : 'none')};
  margin-right: ${dimensions.xs_2};
  color: black;
  text-decoration: none;
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

interface IDescriptionProps {
  titlee?: boolean;
  small?: boolean;
}

const NotificationDescription = styled.p<IDescriptionProps>`
  text-align: left;
  font-weight: ${({ small, titlee }) => (titlee ? 600 : small ? 300 : 400)};
  font-size: ${({ small }) =>
    small ? `${dimensions.xs}` : `${dimensions.base}`};
`;

const answers = [
  'You have missed the due date for your book. Return it as soon as possible or contact the manager in room 35',
  'We have accepted your donation to the library! Thank you!',
  "If you don't check out all expired items in the library within a week, you will be banned from the app",
];

const Notifications: FC<INotifications> = ({
  notifications,
  showUserLink = false,
}) => {
  const [isAnswerModal, setIsAnswerModal] = useState<boolean>(false);
  const [personId, setPersonId] = useState<string | null>(null);
  const sortedNotifications = notifications.sort(
    (a, b) =>
      new Date(b?.created_at).getTime() - new Date(a?.created_at).getTime()
  );
  const todayNotifications = sortedNotifications?.filter((notification) =>
    todayCondition(new Date(notification.created_at))
  );
  const earlierNotifications = sortedNotifications?.filter(
    (notification) => !todayCondition(new Date(notification.created_at))
  );

  const handleAnswerModal = useCallback(
    (id: string) => {
      console.log('123423');
      setPersonId(id);
      setIsAnswerModal(true);
    },
    [personId]
  );

  const handleClose = useCallback(() => {
    setIsAnswerModal(false);
  }, []);

  return (
    <>
      <Title>{t('Notifications.Managers.MainTitle')}</Title>
      <Description>{t('Notifications.Managers.MainDescription')}</Description>
      {!!todayNotifications?.length && (
        <>
          <Subtitle>{t('Notifications.Today')}</Subtitle>
          {todayNotifications?.map((notification) =>
            notification.type === 'message' ? (
              <NotificationWrapper message today key={notification?.user?.id}>
                <ColumnWrapper>
                  <NotificationDescription titlee>
                    {notification.title}
                  </NotificationDescription>
                  <NotificationDescription>
                    {notification.message}
                  </NotificationDescription>
                  <NotificationDescription small>
                    <RestyledOpenLink
                      to={`${RoutesTypes.READERS}/${notification.user?.id}`}
                      showuserlink={showUserLink}
                    >
                      {notification.user?.name}
                    </RestyledOpenLink>
                  </NotificationDescription>
                </ColumnWrapper>
                <ButtonAnswer
                  onClick={() => handleAnswerModal(notification.user!.id)}
                >
                  {t('ManagerInfoCard.Link.Answer')}
                </ButtonAnswer>
              </NotificationWrapper>
            ) : (
              <NotificationWrapper>
                <NotificationDescription>
                  {notification.title + ' '}
                  {notification.message &&
                    t('UserCard.BlockReason') + notification.message}
                </NotificationDescription>
              </NotificationWrapper>
            )
          )}
        </>
      )}
      {!!earlierNotifications?.length && (
        <>
          <Subtitle>{t('Notifications.Earlier')}</Subtitle>
          {earlierNotifications?.map((notification) =>
            notification.type === 'message' ? (
              <NotificationWrapper message key={notification.id}>
                <ColumnWrapper>
                  <NotificationDescription titlee>
                    {notification.title}
                  </NotificationDescription>
                  <NotificationDescription>
                    {notification.message}
                  </NotificationDescription>
                  <NotificationDescription small>
                    <RestyledOpenLink
                      to={`${RoutesTypes.READERS}/${notification.user?.id}`}
                      showuserlink={showUserLink}
                    >
                      {notification.user?.name}
                    </RestyledOpenLink>
                    {specialParseDate(new Date(notification.created_at))}
                  </NotificationDescription>
                </ColumnWrapper>
                <ButtonAnswer
                  onClick={() => handleAnswerModal(notification.user!.id)}
                >
                  {t('ManagerInfoCard.Link.Answer')}
                </ButtonAnswer>
              </NotificationWrapper>
            ) : (
              <NotificationWrapper>
                <NotificationDescription>
                  {notification.title + ' '}
                  {notification.message
                    ? t('UserCard.BlockReason') + notification.message
                    : null}
                </NotificationDescription>
                <NotificationDescription small>
                  {specialParseDate(new Date(notification.created_at))}
                </NotificationDescription>
              </NotificationWrapper>
            )
          )}
        </>
      )}
      <Modal active={isAnswerModal} setActive={setIsAnswerModal}>
        {isAnswerModal && (
          <AnswerToUser id={personId} answers={answers} close={handleClose} />
        )}
      </Modal>
    </>
  );
};

export default Notifications;
