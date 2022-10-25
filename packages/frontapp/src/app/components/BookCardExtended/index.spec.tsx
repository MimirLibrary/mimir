import { render } from '../../../helpers/customRender';
import BookCardExtended from './index';
import { IMaterial } from '../../types';
import { StatusTypes } from '@mimir/global-types';
import { screen } from '@testing-library/react';

describe('render BookCardExtended', () => {
  it('correctly render with status is free', () => {
    const mockItem: IMaterial = {
      author: 'Ivan',
      category: 'Horror',
      title: 'Dracula',
      created_at: '2022-09-21T08:29:24.192Z',
      id: '1',
      picture: '',
      statuses: [
        {
          id: '1',
          created_at: '2022-09-21T08:29:24.192Z',
          status: StatusTypes.FREE,
          person: {
            id: '1',
            username: 'Dmitry',
          },
        },
      ],
    };
    render(<BookCardExtended item={mockItem} />);

    expect(screen.getByTestId('book-card-extended')).toBeInTheDocument();
    expect(screen.getByTestId('book-card-extended')).toMatchSnapshot();
    expect(screen.getByText('Dracula')).toBeInTheDocument();
    expect(screen.getByText('Horror')).toBeInTheDocument();
    expect(screen.getByText('on the shelf')).toBeInTheDocument();
    expect(screen.getByText('was claimed 0 times')).toBeInTheDocument();
  });

  it('correctly render with status is Busy', () => {
    const mockItem: IMaterial = {
      author: 'Ivan',
      category: 'Horror',
      title: 'Dracula',
      created_at: '2022-09-21T08:29:24.192Z',
      id: '1',
      picture: '',
      statuses: [
        {
          id: '1',
          created_at: '2022-10-21T08:29:24.192Z',
          status: StatusTypes.BUSY,
          person: {
            id: '1',
            username: 'Dmitry',
          },
        },
      ],
    };
    render(<BookCardExtended item={mockItem} />);

    expect(screen.getByTestId('book-card-extended')).toBeInTheDocument();
    expect(screen.getByText('Dracula')).toBeInTheDocument();
    expect(screen.getByText('Horror')).toBeInTheDocument();
    expect(screen.getByText('Claimed by')).toBeInTheDocument();
    expect(screen.getByText('Dmitry')).toBeInTheDocument();
    expect(screen.getByText('was claimed 1 times')).toBeInTheDocument();
  });

  it('correctly render result with item is null', () => {
    render(<BookCardExtended item={null} />);
    expect(screen.queryByTestId('book-card-extended')).toBeNull();
  });
});
