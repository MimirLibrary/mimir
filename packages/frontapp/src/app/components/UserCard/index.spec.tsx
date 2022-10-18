import { render } from '../../../helpers/customRender';
import { screen } from '@testing-library/react';
import UserCard from './index';
import { GetOnePersonDocument } from '@mimir/apollo-client';
import { MockedProvider } from '@apollo/client/testing';
import { nextTick } from '../../../helpers/tests/nextTick';

const personMock = {
  request: {
    query: GetOnePersonDocument,
  },
  result: {
    data: {
      getOnePerson: {
        avatar: '',
        email: 'pushking@gmail.com',
        id: '4',
        messages: [],
        position: 'JS Developer',
        states: [],
        statuses: [],
        type: 'Reader',
        username: 'Pete',
      },
    },
  },
};

jest.mock('i18next', () => ({
  t: (i: any) => i,
}));

describe('UserCard Component', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[personMock]} addTypename={false}>
        <UserCard />
      </MockedProvider>
    );
  });

  it('should render loading', async () => {
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should render result', async () => {
    await nextTick();

    expect(screen.getByTestId('user-card')).toBeInTheDocument();
    expect(screen.getByText('Pete')).toBeInTheDocument();
    expect(screen.getByText('JS Developer')).toBeInTheDocument();
    expect(screen.getByText('pushking@gmail.com')).toBeInTheDocument();
    expect(screen.getByTestId('notification-btn')).toBeInTheDocument();
  });

  it('should match snapshot', async () => {
    await nextTick();

    expect(screen.getByTestId('user-card')).toMatchSnapshot();
  });
});
