import { MockedProvider } from '@apollo/client/testing';
import { GetAllMaterialsForManagerDocument } from '@mimir/apollo-client';
import { StatusTypes } from '@mimir/global-types';
import { render } from 'packages/frontapp/src/helpers/customRender';
import StatisticsModal from './index';
import { screen } from '@testing-library/react';
import { nextTick } from '../../../helpers/tests/nextTick';

const materialsMock = {
  request: {
    query: GetAllMaterialsForManagerDocument,
    variables: { input: { locations: [] } },
  },
  result: {
    data: {
      getAllMaterials: [
        {
          category: 'History',
          id: '1',
          picture: '',
          currentStatus: { id: '7', status: StatusTypes.FREE },
          title: 'Forrest Gump',
        },
        {
          category: 'Psychology',
          id: '2',
          picture: '',
          currentStatus: { id: '8', status: StatusTypes.FREE },
          title: 'New Patient',
        },
        {
          category: 'Psychology',
          id: '3',
          picture: '',
          currentStatus: { id: '10', status: StatusTypes.BUSY },
          title: 'Charity',
        },
        {
          category: 'History',
          id: '4',
          picture: '',
          currentStatus: { id: '9', status: StatusTypes.OVERDUE },
          title: 'Public History',
        },
      ],
    },
  },
};

jest.mock('i18next', () => ({
  t: (i: any) => i,
}));

describe('Statistics Modal Component', () => {
  beforeEach(() => {
    const handleCloseModal = jest.fn();
    render(
      <MockedProvider mocks={[materialsMock]} addTypename={false}>
        <StatisticsModal isActive={true} setIsActive={handleCloseModal} />
      </MockedProvider>
    );
  });

  it('should render correct statistics', async () => {
    await nextTick();

    expect(screen.getByTestId('statistics-chart')).toBeInTheDocument();
    expect(screen.getByTestId('statistics-free')).toHaveTextContent('2');
    expect(screen.getByTestId('statistics-claimed')).toHaveTextContent('1');
    expect(screen.getByTestId('statistics-overdue')).toHaveTextContent('1');
    expect(screen.getByTestId('statistics-pending')).toHaveTextContent('0');
  });

  it('should match snapshot', async () => {
    await nextTick();

    expect(screen.getByTestId('statistics-chart')).toMatchSnapshot();
    expect(screen.getByTestId('statistics-legend')).toMatchSnapshot();
  });
});
