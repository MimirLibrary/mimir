import { render } from '../../../helpers/customRender';
import ManagerInfoCard from './index';
import { ManagerCardTypes } from './managerCardTypes';
import { IMaterialDonate } from '../../types/donateList';
import { screen } from '@testing-library/react';
import donate_placeholder from '../../../assets/donate_placeholder.png';

describe('render ManagerInfo Card', () => {
  it('render with correct data with donate items', () => {
    const data: Array<IMaterialDonate> = [
      {
        id: '18',
        title: 'test',
        statuses: [
          {
            status: 'Pending',
            id: '1',
            person: {
              id: '11',
              username: 'Ivan Uglovets',
              avatar: '',
            },
          },
        ],
      },
    ];

    render(
      <ManagerInfoCard type={ManagerCardTypes.DONATES} fieldsDonate={data} />
    );

    expect(screen.getByTestId('items-list')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('Ivan Uglovets')).toBeInTheDocument();
  });

  it('render component with empty list', () => {
    render(
      <ManagerInfoCard type={ManagerCardTypes.DONATES} fieldsDonate={[]} />
    );

    expect(screen.getByTestId('donate-placeholder')).toHaveAttribute(
      'src',
      donate_placeholder
    );
  });

  it('render component when data is undefined', () => {
    render(
      <ManagerInfoCard
        type={ManagerCardTypes.DONATES}
        fieldsDonate={undefined}
      />
    );
    expect(screen.queryByTestId('items-list')).toBeNull();
    expect(screen.queryByTestId('donate-placeholder')).toBeNull();
  });
  it('snapshot testing of manager NOTIFICATIONS card', () => {
    render(
      <ManagerInfoCard
        type={ManagerCardTypes.NOTIFICATIONS}
        fieldsNotification={[]}
      />
    );
    expect(screen.getByTestId('notificationCard')).toMatchSnapshot();
  });
  it('snapshot testing of manager Overdue card', () => {
    render(
      <ManagerInfoCard type={ManagerCardTypes.OVERDUE} fieldsOverdue={[]} />
    );
    expect(screen.getByTestId('overdueCard')).toMatchSnapshot();
  });
  it('snapshot testing of manager DONATES card', () => {
    render(
      <ManagerInfoCard type={ManagerCardTypes.DONATES} fieldsDonate={[]} />
    );
    expect(screen.getByTestId('donateCard')).toMatchSnapshot();
  });
  it('show image when there is no data NOTIFICATION', () => {
    render(
      <ManagerInfoCard
        type={ManagerCardTypes.NOTIFICATIONS}
        fieldsNotification={[]}
      />
    );
    expect(screen.getByTestId('notification-placeholder')).toBeInTheDocument();
  });
  it('show all notifs when there is data', () => {
    const data = [
      {
        id: '1',
        title: 'test',
        message: 'test',
        description: 'test',
        person_id: 1,
        person: {
          id: '1',
          username: 'test',
          avatar: 'test',
        },
        created_at: '2022-10-20T12:00:00.000Z',
      },
    ];
    render(
      <ManagerInfoCard
        type={ManagerCardTypes.NOTIFICATIONS}
        fieldsNotification={data}
      />
    );
    expect(screen.getByTestId('newNotif')).toBeInTheDocument();
  });
});
