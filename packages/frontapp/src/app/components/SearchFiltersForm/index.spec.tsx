import { render } from 'packages/frontapp/src/helpers/customRender';
import { fireEvent, screen } from '@testing-library/react';
import SearchFiltersForm from './index';

const handleResetClick = jest.fn();
const setApplyFilters = jest.fn();
const radioBtnHandler = jest.fn();
const checkBoxHandler = jest.fn();
const attributes = [
  {
    title: 'SortBy',
    paramName: 'sortby',
    inputType: 'checkbox',
    id: 5,
    subAttributes: [
      {
        title: 'key',
        numberOfItems: 4,
        id: 5,
        checked: false,
      },
      {
        title: 'key2',
        numberOfItems: 5,
        id: 6,
        checked: false,
      },
      {
        title: 'key3',
        numberOfItems: 6,
        id: 7,
        checked: false,
      },
      {
        title: 'key4',
        numberOfItems: 4,
        id: 8,
        checked: false,
      },
      {
        title: 'key5',
        numberOfItems: 7,
        id: 9,
        checked: false,
      },
      {
        title: 'key6',
        numberOfItems: 4,
        id: 10,
        checked: false,
      },
      {
        title: 'key7',
        numberOfItems: 4,
        id: 11,
        checked: false,
      },
      {
        title: 'key8',
        numberOfItems: 4,
        id: 12,
        checked: false,
      },
    ],
  },
];

const attributesLessSeven = [
  {
    title: 'SortBy',
    inputType: 'radio',
    paramName: 'sortby',
    id: 5,
    subAttributes: [
      {
        title: 'key',
        numberOfItems: 4,
        id: 5,
        checked: false,
      },
    ],
  },
  {
    title: 'Items2',
    inputType: 'checkbox',
    paramName: 'items',
    id: 2,
    subAttributes: [
      {
        title: 'key9',
        numberOfItems: 3,
        id: 13,
        checked: false,
      },
    ],
  },
];

describe('Search Modal', () => {
  it('should render properly', () => {
    render(
      <SearchFiltersForm
        attributes={attributes}
        checkBoxHandler={checkBoxHandler}
        radioBtnHandler={radioBtnHandler}
        setApplyFilters={setApplyFilters}
        handleResetClick={handleResetClick}
      />
    );
    expect(screen.getAllByTestId('search-filters-form')[0]).toBeInTheDocument();
  });
  it('should show seeMore button if there is more than 7 elements', () => {
    render(
      <SearchFiltersForm
        attributes={attributes}
        checkBoxHandler={checkBoxHandler}
        radioBtnHandler={radioBtnHandler}
        setApplyFilters={setApplyFilters}
        handleResetClick={handleResetClick}
      />
    );
    expect(screen.queryByTestId('seeMoreButton')).toBeInTheDocument();
  });
  it('should not show seeMore button if there is less than 7 elements', () => {
    render(
      <SearchFiltersForm
        attributes={attributesLessSeven}
        checkBoxHandler={checkBoxHandler}
        radioBtnHandler={radioBtnHandler}
        setApplyFilters={setApplyFilters}
        handleResetClick={handleResetClick}
      />
    );
    expect(screen.queryByTestId('seeMoreButton')).not.toBeInTheDocument();
  });
  it('should show all elements if seeMore button is clicked', () => {
    render(
      <SearchFiltersForm
        attributes={attributes}
        checkBoxHandler={checkBoxHandler}
        radioBtnHandler={radioBtnHandler}
        setApplyFilters={setApplyFilters}
        handleResetClick={handleResetClick}
      />
    );
    fireEvent.click(screen.getByTestId('seeMoreButton'));
    const wrapper = screen.getByTestId('wrapperOfElements');
    expect(wrapper.children.length).toBeGreaterThan(7);
  });
});
