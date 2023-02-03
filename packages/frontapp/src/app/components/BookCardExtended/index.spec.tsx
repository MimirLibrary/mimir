import { render } from '../../../helpers/customRender';
import BookCardExtended from './index';
import { IMaterial } from '../../types';
import { StatusTypes } from '@mimir/global-types';
import { screen } from '@testing-library/react';

jest.mock('i18next', () => ({
  t: (str: any) => str,
}));

describe('render BookCardExtended', () => {
  it('correctly render with status is free', () => {
    const mockItem: IMaterial = {
      author: 'Ivan',
      category: 'Horror',
      title: 'Dracula',
      created_at: '2022-09-21T08:29:24.192Z',
      id: '1',
      picture: '',
      currentStatus: {
        id: '1',
        created_at: '2022-09-21T08:29:24.192Z',
        status: StatusTypes.FREE,
        person: {
          id: '1',
          username: 'Dmitry',
        },
      },
      claimCount: 0,
      identifier: '1',
      description: '',
    };
    render(<BookCardExtended item={mockItem} />);

    expect(screen.getByTestId('book-card-extended')).toBeInTheDocument();
    expect(screen.getByTestId('book-card-extended')).toMatchSnapshot();
    expect(screen.getByText('Dracula')).toBeInTheDocument();
    expect(screen.getByText('Horror')).toBeInTheDocument();
    expect(screen.getByText('on the shelf')).toBeInTheDocument();
    expect(screen.getByText('BookCardExtended.ClaimCount')).toBeInTheDocument();
  });

  it('correctly render with status is Busy', () => {
    const mockItem: IMaterial = {
      author: 'Ivan',
      category: 'Horror',
      title: 'Dracula',
      created_at: new Date().toDateString(),
      id: '1',
      picture: '',
      currentStatus: {
        id: '1',
        created_at: new Date().toDateString(),
        status: StatusTypes.BUSY,
        person: {
          id: '1',
          username: 'Dmitry',
        },
      },
      claimCount: 1,
      identifier: '1',
      description: '',
    };
    render(<BookCardExtended item={mockItem} />);

    expect(screen.getByTestId('book-card-extended')).toBeInTheDocument();
    expect(screen.getByText('Dracula')).toBeInTheDocument();
    expect(screen.getByText('Horror')).toBeInTheDocument();
    expect(
      screen.getByText('BookCardExtended.ClaimedByStatusLabel')
    ).toBeInTheDocument();
    expect(screen.getByText('Dmitry')).toBeInTheDocument();
    expect(screen.getByText('BookCardExtended.ClaimCount')).toBeInTheDocument();
  });

  it('correctly render result with item is null', () => {
    render(<BookCardExtended item={null} />);
    expect(screen.queryByTestId('book-card-extended')).toBeNull();
  });
});
