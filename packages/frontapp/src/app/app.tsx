import React, { FC } from 'react';
import StartPage from './pages/StartPage';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useAuth } from './hooks/useAuth';
import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';
import { useRoutes } from './hooks/useRoutes';
import { useAppSelector } from './hooks/useTypedSelector';
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
  @media (max-width: 420px) {
    width: 100%;
  }
`;

const App: FC = () => {
  const { isAuth } = useAuth();
  const { userRole } = useAppSelector((state) => state.user);
  const routes = useRoutes(userRole);
  return (
    <>
      {isAuth ? (
        <>
          <WrapperPage>
            <Sidebar />
            <WrapperRoutes>
              <Routes>
                {routes}
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
