import BookList from './bookList';
import { screen } from '@testing-library/react';
import { render } from '../../../helpers/customRender';
import Tags from './tags';
import { StatusTypes } from '@mimir/global-types';

const mockStatus = {
  person_id: 1,
  status: StatusTypes.FREE,
  created_at: '2022-09-08T03:58:39.228Z',
  id: 1,
  material_id: 1,
};

const mockMaterial = [
  {
    __typename: 'Material',
    author: 'test Author',
    category: 'test Category',
    created_at: '2022-09-08T03:58:39.228Z',
    description: 'Test Description',
    id: '1',
    id_type: 'Test Id_Type',
    identifier: '1111111111',
    is_donated: false,
    notification: [],
    picture: '',
    currentStatusValue: mockStatus.status,
    currentStatus: mockStatus,
    title: 'test',
    type: 'Book',
    updated_at: '2022-09-08T03:58:39.228Z',
  },
];

const params = ['searchParams'];
const searchParams = new URLSearchParams(params[0]);

describe('BooksByCategory', () => {
  it(' bookList should render correctly', () => {
    render(<BookList allData={mockMaterial} searchParams={searchParams} />);
    expect(screen.getByTestId('bookList')).toBeInTheDocument();
  });

  it('tags should render correctly', () => {
    render(<Tags chosenTags={params} />);
    expect(screen.getAllByTestId('tags')[0]).toBeInTheDocument();
  });
});
