import {
  useGetAllMessagesQuery,
  useGetNotificationsByPersonQuery,
} from '@mimir/apollo-client';
import { useEffect, useState } from 'react';
import Notifications, { IOneNotification } from '../components/Notifications';
import { useAppSelector } from '../hooks/useTypedSelector';
import { toast } from 'react-toastify';
import { RolesTypes } from '@mimir/global-types';
import Item from '../components/ClaimTable/Item';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<IOneNotification[]>([]);
  const { locations, userRole, id } = useAppSelector((state) => state.user);
  const {
    data: managerNotificationsData,
    loading: managerNotificationsLoading,
    error: managerNotificationsError,
  } = useGetAllMessagesQuery({
    variables: {
      location_id: parseInt(locations[0].id),
    },
    skip: userRole === RolesTypes.READER,
  });

  const {
    data: readerNotificationsData,
    loading: readerNotificationsLoading,
    error: readerNotificationsError,
  } = useGetNotificationsByPersonQuery({
    variables: {
      person_id: id,
    },
    skip: userRole === RolesTypes.MANAGER,
  });

  // TODO: handle READER notifications

  useEffect(() => {
    if (managerNotificationsError) {
      toast.error(managerNotificationsError);
    }
    if (readerNotificationsError) {
      toast.error(readerNotificationsError);
    }
  }, [managerNotificationsError, readerNotificationsError]);

  useEffect(() => {
    if (!managerNotificationsData && !readerNotificationsData) return;
    if (managerNotificationsData) {
      setNotifications(
        managerNotificationsData.getAllMessages!.map((item) => {
          return {
            id: item.id,
            created_at: item.created_at,
            message: item.message,
            user: { id: item.person.id, name: item.person.username },
            title: item.title,
            type: 'message',
          } as IOneNotification;
        })
      );
    } else if (readerNotificationsData) {
      setNotifications(
        readerNotificationsData.getNotificationsByPerson!.map((item) => {
          return {
            id: item!.id,
            created_at: item!.created_at,
            message: item?.message || '',
            type: 'message',
          };
        })
      );
    }
  }, [managerNotificationsLoading, readerNotificationsLoading]);

  return <Notifications notifications={notifications} showUserLink />;
};

export default NotificationPage;
