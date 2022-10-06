import BookList from './bookList';
import { screen } from '@testing-library/react';
import { render } from '../../../helpers/customRender';
import { mockMaterial } from '../../../helpers/mockData';
import Tags from './tags';

const params = ['searchParams'];
const searchParams = new URLSearchParams(params[0]);

describe('BooksByCategory', () => {
  it(' bookList should render correctly', () => {
    render(<BookList allData={mockMaterial} searchParams={searchParams} />);
    expect(screen.getByTestId('bookList')).toBeInTheDocument();
  });

  it('tags should render correctly', () => {
    render(<Tags chosenTags={params} numOfResults={1} />);
    expect(screen.getAllByTestId('tags')[0]).toBeInTheDocument();
  });
});
