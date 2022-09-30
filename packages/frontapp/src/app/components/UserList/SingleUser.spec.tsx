import { render } from '../../../helpers/customRender';
import SingleUser from './SingleUser';
import { StatusTypes } from '@mimir/global-types';
import { screen } from '@testing-library/react';
import Avatar from '../../../assets/avatar.jpg';

describe('render SingleUserCard component', () => {
  it('should be correctly render', () => {
    render(
      <SingleUser
        avatar=""
        id="1"
        statuses={[
          {
            status: StatusTypes.FREE,
            material_id: 13,
            created_at: new Date('2022-09-21T08:33:02.239Z'),
          },
        ]}
        name="Test"
      />
    );

    expect(screen.getByTestId('single-user')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', Avatar);
  });

  it('should be correctly render without name', () => {
    render(
      <SingleUser
        avatar=""
        id="1"
        statuses={[
          {
            status: StatusTypes.FREE,
            material_id: 13,
            created_at: new Date('2022-09-21T08:33:02.239Z'),
          },
        ]}
        name=""
      />
    );

    expect(screen.getByTestId('single-user')).toBeInTheDocument();
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', Avatar);
  });

  it('renders correctly, with snapshots', () => {
    render(
      <SingleUser
        avatar={Avatar}
        id="1"
        statuses={[
          {
            status: StatusTypes.FREE,
            material_id: 13,
            created_at: new Date('2022-09-21T08:33:02.239Z'),
          },
        ]}
        name="Test"
      />
    );
    expect(screen.getByTestId('single-user')).toMatchSnapshot();
  });
});
