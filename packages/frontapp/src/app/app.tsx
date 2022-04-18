import React, { FC } from 'react';
import StartPage from './pages/StartPage';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HistoryOfClaimPage from './pages/HistoryOfClaimPage';
import HistoryOfDonatePage from './pages/HistoryOfDonatePage';
import SettingsPage from './pages/SettingsPage';
import SearchPage from './pages/SearchPage';
import { useAuth } from './hooks/useAuth';
import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';

const WrapperPage = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100vh;
`;

const WrapperRoutes = styled.div`
  width: calc(100% - 22rem);
  background-color: ${colors.bg_primary};
`;

const App: FC = () => {
  const { isAuth } = useAuth();
  return (
    <>
      {isAuth ? (
        <WrapperPage>
          <Sidebar />
          <WrapperRoutes>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route
                path="/history-of-claim"
                element={<HistoryOfClaimPage />}
              />
              <Route
                path="/history-of-donate"
                element={<HistoryOfDonatePage />}
              />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<HomePage />}></Route>
            </Routes>
          </WrapperRoutes>
        </WrapperPage>
      ) : (
        <Routes>
          <Route path="/login" element={<StartPage />} />
          <Route path="*" element={<StartPage />}></Route>
        </Routes>
      )}
    </>
  );
};

export default App;
