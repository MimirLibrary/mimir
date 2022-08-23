import { useGetAllMessagesQuery } from '@mimir/apollo-client';
import { useEffect, useState } from 'react';
import Notifications, { IOneNotification } from '../components/Notifications';
import { useAppSelector } from '../hooks/useTypedSelector';
import { locationIds } from '../store/slices/userSlice';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<IOneNotification[]>([]);
  const locations = useAppSelector(locationIds);
  const { data, loading } = useGetAllMessagesQuery({
    variables: { locations },
  });

  useEffect(() => {
    if (!data) return;
    setNotifications(
      data.getAllMessages!.map((item) => {
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
  }, [loading]);

  return <Notifications notifications={notifications} showUserLink />;
};

export default NotificationPage;
