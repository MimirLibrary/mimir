import { StatusTypes } from '@mimir/global-types';
import { screen } from '@testing-library/react';
import { render } from '../../../helpers/customRender';
import SearchSuggestions from './index';
import { SearchOfMaterialsQuery } from '@mimir/apollo-client';
import '@testing-library/jest-dom';

const mockListOfMaterials: SearchOfMaterialsQuery['getAllMaterials'] = [
  {
    __typename: 'Material',
    id: '1',
    author: 'Robert Stevenson',
    category: 'Horror',
    created_at: '2022-09-14T04:22:47.953Z',
    title: 'Dracula',
    picture: '',
    currentStatus: {
      __typename: 'Status',
      id: '1',
      status: StatusTypes.FREE,
      created_at: '2022-09-14T04:22:48.078Z',
      person: {
        __typename: 'Person',
        id: '3',
        username: 'Ivan Uglovec',
      },
    },
    claimCount: 0,
  },
];

describe('SearchSuggestionsComponent', () => {
  it('render with data', () => {
    render(
      <SearchSuggestions
        materials={mockListOfMaterials}
        removeSuggestionSearchWindow={() => {}}
      />
    );
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    expect(screen.getByText('Dracula')).toBeInTheDocument();
    expect(screen.getByText(/Horror/)).toBeInTheDocument();
  });

  it('render without data', () => {
    render(
      <SearchSuggestions
        materials={[]}
        removeSuggestionSearchWindow={() => {}}
      />
    );
    expect(screen.queryByTestId('wrapper')).toBeNull();
  });

  it('render when data is null', () => {
    render(
      <SearchSuggestions
        materials={[]}
        removeSuggestionSearchWindow={() => {}}
      />
    );
    expect(screen.queryByTestId('wrapper')).toBeNull();
  });
});
