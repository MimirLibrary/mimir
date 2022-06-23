import { RolesTypes } from '../../utils/rolesTypes';
import { Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import HistoryOfClaimPage from '../pages/HistoryOfClaimPage';
import HistoryOfDonatePage from '../pages/HistoryOfDonatePage';
import SettingsPage from '../pages/SettingsPage';
import { RoutesTypes } from '../../utils/routes';
import Readers from '../pages/Readers';
import BooksStuff from '../pages/BooksStuff';
import DonatesFromUser from '../pages/DonatesFromUser';
import CreateNewItem from '../pages/CreateNewItem';
import SearchByNameOrAuthorPage from '../pages/SearchByName';

export const useRoutes = (role: string) => {
  if (role === RolesTypes.READER) {
    return (
      <>
        {}
        <Route path={RoutesTypes.HOME} element={<HomePage />} />
        <Route path={RoutesTypes.SEARCH} element={<SearchPage />} />
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
          path={`${RoutesTypes.SEARCH}_by_:search`}
          element={<SearchByNameOrAuthorPage />}
        />
      </>
    );
  } else {
    return (
      <>
        <Route path={RoutesTypes.HOME} element={<HomePage />} />
        <Route path={RoutesTypes.READERS} element={<Readers />} />
        <Route path={RoutesTypes.BOOKS_STUFF} element={<BooksStuff />} />
        <Route path={RoutesTypes.SETTINGS} element={<SettingsPage />} />
        <Route
          path={RoutesTypes.DONATES_FROM_USER}
          element={<DonatesFromUser />}
        />
        <Route path={RoutesTypes.CREATE_NEW_ITEM} element={<CreateNewItem />} />
      </>
    );
  }
};
