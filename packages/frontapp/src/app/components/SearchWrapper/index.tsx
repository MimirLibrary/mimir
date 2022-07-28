import { Dispatch, FC, SetStateAction } from 'react';
import Search from '../Search';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import Burger from '../Burger';
import FiltersButton from '../FiltersButton';
import { RoutesTypes } from '../../../utils/routes';
import SearchByUserName from '../SearchByUserName';

interface IProps {
  setSidebarActive: Dispatch<SetStateAction<boolean>>;
}

const StyledSearch = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;

  @media (max-width: ${dimensions.tablet_width}) {
    justify-content: space-between;
  }
`;

const SearchWrapper: FC<IProps> = ({ setSidebarActive }) => {
  return (
    <StyledSearch>
      <Burger setSidebarActive={setSidebarActive} />
      {window.location.pathname.startsWith(RoutesTypes.READERS) ? (
        <SearchByUserName />
      ) : (
        <Search />
      )}

      <FiltersButton />
    </StyledSearch>
  );
};

export default SearchWrapper;
