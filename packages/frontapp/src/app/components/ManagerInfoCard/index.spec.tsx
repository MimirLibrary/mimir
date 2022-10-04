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
});
