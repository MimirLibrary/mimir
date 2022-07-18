import { FC } from 'react';
import { t } from 'i18next';
import {
  specialParseDate,
  todayCondition,
} from '../../models/helperFunctions/converTime';
import { OpenLink } from '../ManagerInfoCard';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { RoutesTypes } from '../../../utils/routes';
import { Description, Title } from '../UserCard';

export interface IOneNotification {
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
  showUserLink: boolean;
}

const RestyledOpenLink = styled(OpenLink)<IRestyledOpenLinkProps>`
  display: ${(props) => (props.showUserLink ? 'inline' : 'none')};
  margin-right: ${dimensions.xs_2};
  color: black;
  text-decoration: none;
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

const Notifications: FC<INotifications> = ({
  notifications,
  showUserLink = false,
}) => {
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

  return (
    <>
      <Title>{t('Notifications.Managers.MainTitle')}</Title>
      <Description>{t('Notifications.Managers.MainDescription')}</Description>
      {!!todayNotifications?.length && (
        <>
          <Subtitle>{t('Notifications.Today')}</Subtitle>
          {todayNotifications?.map((notification) =>
            notification.type === 'message' ? (
              <NotificationWrapper message today>
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
                      showUserLink={showUserLink}
                    >
                      {notification.user?.name}
                    </RestyledOpenLink>
                  </NotificationDescription>
                </ColumnWrapper>
                <OpenLink to="#">{t('ManagerInfoCard.Link.Answer')}</OpenLink>
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
              <NotificationWrapper message>
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
                      showUserLink={showUserLink}
                    >
                      {notification.user?.name}
                    </RestyledOpenLink>
                    {specialParseDate(new Date(notification.created_at))}
                  </NotificationDescription>
                </ColumnWrapper>
                <OpenLink to="#">{t('ManagerInfoCard.Link.Answer')}</OpenLink>
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
    </>
  );
};

export default Notifications;
