import { Route } from 'react-router-dom';
import { RolesTypes } from '@mimir/global-types';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import HistoryOfClaimPage from '../pages/HistoryOfClaimPage';
import HistoryOfDonatePage from '../pages/HistoryOfDonatePage';
import SettingsPage from '../pages/SettingsPage';
import { RoutesTypes } from '../../utils/routes';
import Readers from '../pages/Readers';
import AllBooksPage from '../pages/AllBooksPage';
import DonatesFromUser from '../pages/DonatesFromUser';
import CreateNewItem from '../pages/CreateNewItem';
import SearchByNameOrAuthorPage from '../pages/SearchByName';
import DonateToLibrary from '../pages/DonateToLibrary';
import BookPreview from '../pages/BookPreview';
import BooksByCategory from '../components/BooksByCategory';
import OverduePage from '../pages/OverduePage';
import UserCard from '../components/UserCard';

export const useRoutes = (role: string) => {
  if (role === RolesTypes.READER) {
    return (
      <>
        <Route path={RoutesTypes.HOME} element={<HomePage />} />
        <Route path={RoutesTypes.SEARCH} element={<SearchPage />} />
        <Route
          path={RoutesTypes.DONATE_TO_LIBRARY}
          element={<DonateToLibrary />}
        />
        <Route
          path={RoutesTypes.HISTORY_OF_CLAIM}
          element={<HistoryOfClaimPage />}
        />
        <Route
          path={RoutesTypes.HISTORY_OF_DONATE}
          element={<HistoryOfDonatePage />}
        />
        <Route path={RoutesTypes.SETTINGS} element={<SettingsPage />} />
        <Route
          path={`${RoutesTypes.SEARCH}_by_name_or_author`}
          element={<SearchByNameOrAuthorPage />}
        />
        <Route
          path={`${RoutesTypes.BOOK_PREVIEW}/:item_id`}
          element={<BookPreview donate={false} />}
        />
        <Route
          path={`${RoutesTypes.CATEGORY}/:category`}
          element={<BooksByCategory />}
        />
        <Route path={RoutesTypes.CATEGORY} element={<BooksByCategory />} />
      </>
    );
  } else {
    return (
      <>
        <Route path={RoutesTypes.HOME} element={<HomePage />} />
        <Route path={RoutesTypes.READERS} element={<Readers />} />
        <Route path={RoutesTypes.READERS + '/:id'} element={<UserCard />} />
        <Route path={RoutesTypes.BOOKS_STUFF} element={<AllBooksPage />} />
        <Route path={RoutesTypes.SETTINGS} element={<SettingsPage />} />
        <Route
          path={RoutesTypes.DONATES_FROM_USER}
          element={<DonatesFromUser />}
        />
        <Route
          path={`${RoutesTypes.BOOK_PREVIEW}/:item_id`}
          element={<BookPreview donate={false} />}
        />
        <Route
          path={`${RoutesTypes.DONATE_PREVIEW}/:item_id`}
          element={<BookPreview donate={true} />}
        />
        <Route path={RoutesTypes.CREATE_NEW_ITEM} element={<CreateNewItem />} />
        <Route path={RoutesTypes.HOME + '/overdue'} element={<OverduePage />} />
      </>
    );
  }
};
