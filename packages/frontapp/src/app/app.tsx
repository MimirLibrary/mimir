import React, { FC } from 'react';
import StartPage from './pages/StartPage';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HistoryOfClaimPage from './pages/HistoryOfClaimPage';
import HistoryOfDonatePage from './pages/HistoryOfDonatePage';
import SettingsPage from './pages/SettingsPage';
import SearchPage from './pages/SearchPage';
import { useAuth } from './hooks/useAuth';
import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';
import NotificationPage from './pages/NotificationPage';

const WrapperPage = styled.main`
  display: flex;
  justify-content: flex-start;
  min-height: 100vh;
  height: 100%;
`;

const WrapperRoutes = styled.div`
  width: calc(100% - 22rem);
  background-color: ${colors.bg_primary};
  padding: 2.5rem 2.5rem 2.5rem 2.3rem;
`;

const App: FC = () => {
  const { isAuth } = useAuth();
  return (
    <>
      {isAuth ? (
        <>
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
                <Route path="/notifications" element={<NotificationPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </WrapperRoutes>
          </WrapperPage>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<StartPage />} />
          <Route path="*" element={<StartPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
