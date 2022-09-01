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

interface IProps {
  showSidebar: () => void;
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

const SearchWrapper: FC<IProps> = ({ showSidebar }) => {
  const { userRole } = useAppSelector((state) => state.user);
  return (
    <StyledSearch>
      <Burger showSidebar={showSidebar} />
      {!window.location.pathname.startsWith(RoutesTypes.READERS) ? (
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
