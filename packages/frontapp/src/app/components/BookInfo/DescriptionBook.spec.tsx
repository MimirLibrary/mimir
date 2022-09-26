import { render } from '../../../helpers/customRender';
import DescriptionBook from './DescriptionBook';
import { screen } from '@testing-library/react';
import * as reactHooks from 'react-redux';
import { RolesTypes } from '@mimir/global-types';
import { MockedProvider } from '@apollo/client/testing';
import { GetAllLocationsDocument } from '@mimir/apollo-client';
import { Location } from './index';

jest.mock('react-redux');

const locationMock = {
  request: {
    query: GetAllLocationsDocument,
  },
  result: {
    data: {
      getAllLocations: [
        { id: '1', location: 'Gomel' },
        { id: '2', location: 'Minsk' },
      ],
    },
  },
};

describe('render DescriptionBook component', () => {
  beforeAll(() => {
    jest.spyOn(reactHooks, 'useSelector').mockReturnValue(RolesTypes.READER);
  });

  it('should be correct description of book', async () => {
    const handleChangeSomeData = jest.fn();
    jest.spyOn(reactHooks, 'useSelector').mockReturnValue(RolesTypes.READER);
    render(
      <MockedProvider mocks={[locationMock]} addTypename={false}>
        <DescriptionBook
          title="Dracula"
          author="Ivan Uglovets"
          editing={false}
          category="Fantasy"
          location={{ id: '2', location: 'Gomel' }}
          date={new Date('2022-09-21T08:29:24.221Z')}
          status="Free"
          src=""
          newTitleAndAuthor={{ newAuthor: 'Ivan', newTitle: 'Spider-Man' }}
          newDeadline={31}
          handleChangeAuthorAndTitle={handleChangeSomeData}
          handleChangeDeadline={handleChangeSomeData}
          handleChangeLocation={handleChangeSomeData}
          handleChangeNewGenre={handleChangeSomeData}
        />
      </MockedProvider>
    );
    expect(screen.getByText('Dracula')).toBeInTheDocument();
    expect(screen.getByText('Ivan Uglovets')).toBeInTheDocument();
    expect(screen.getByText('Gomel')).toBeInTheDocument();
  });

  it('render without some data', async () => {
    const handleChangeSomeData = jest.fn();

    render(
      <MockedProvider mocks={[locationMock]} addTypename={false}>
        <DescriptionBook
          title=""
          author=""
          editing={false}
          category=""
          location={{} as Location}
          date={new Date('2022-09-21T08:29:24.221Z')}
          status="Free"
          src=""
          newTitleAndAuthor={{ newAuthor: 'Ivan', newTitle: 'Spider-Man' }}
          newDeadline={31}
          handleChangeAuthorAndTitle={handleChangeSomeData}
          handleChangeDeadline={handleChangeSomeData}
          handleChangeLocation={handleChangeSomeData}
          handleChangeNewGenre={handleChangeSomeData}
        />
      </MockedProvider>
    );
    expect(screen.queryByText('Dracula')).toBeNull();
    expect(screen.queryByText('Ivan Uglovets')).toBeNull();
    expect(screen.queryByText('Gomel')).toBeNull();
  });
});
