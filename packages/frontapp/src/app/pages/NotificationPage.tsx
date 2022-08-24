import { useGetAllMessagesQuery } from '@mimir/apollo-client';
import { useEffect, useState } from 'react';
import Notifications, { IOneNotification } from '../components/Notifications';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<IOneNotification[]>([]);
  const { data, loading } = useGetAllMessagesQuery();

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
