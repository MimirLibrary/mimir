import { FC, memo } from 'react';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import Burger from '../Burger';
import FiltersButton from '../FiltersButton';
import { RoutesTypes } from '../../../utils/routes';
import SearchByUserName from '../SearchByUserName';
import SearchByBookOrAuthor from '../SearchByBookOrAuthor';
import { RolesTypes } from '@mimir/global-types';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useLocation } from 'react-router-dom';

interface IProps {
  showSidebar: () => void;
}

const StyledSearch = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  position: relative;

  @media (max-width: ${dimensions.tablet_width}) {
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    padding: ${dimensions.sm} ${dimensions.base};
    align-items: center;
    background: #ffffff;
    box-shadow: 0px -4px 64px rgba(24, 39, 75, 0.12);
    border-radius: 0px;
  }
`;

const SearchWrapper: FC<IProps> = ({ showSidebar }) => {
  const { userRole } = useAppSelector((state) => state.user);
  // added location to dynamically change the search component depending on the current url
  const location = useLocation();
  const isReadersPage = location.pathname.startsWith(RoutesTypes.READERS);
  return (
    <StyledSearch>
      <Burger showSidebar={showSidebar} />
      {isReadersPage ? (
        <SearchByUserName />
      ) : (
        <SearchByBookOrAuthor
          path={
            userRole === RolesTypes.READER
              ? `${RoutesTypes.SEARCH}_by_name_or_author`
              : RoutesTypes.BOOKS_STUFF
          }
        />
      )}
      <FiltersButton />
    </StyledSearch>
  );
};

export default memo(SearchWrapper);
