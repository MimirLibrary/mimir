import React, { FC, useCallback, useState } from 'react';
import StartPage from './pages/StartPage';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withTranslation } from 'react-i18next';
import MainComponent from './components/MainComponent';

const WrapperPage = styled.main`
  display: flex;
  justify-content: flex-start;
  min-height: 100vh;
  height: 100%;
`;

const App: FC = () => {
  const { isAuth } = useAuth();
  const [isSidebarActive, setSidebarActive] = useState<boolean>(false);

  const showSidebar = useCallback(() => {
    setSidebarActive(true);
  }, []);

  const hideSidebar = useCallback(() => {
    setSidebarActive(false);
  }, []);

  return (
    <>
      {isAuth ? (
        <WrapperPage>
          <Sidebar
            isSidebarActive={isSidebarActive}
            hideSidebar={hideSidebar}
          />
          <MainComponent showSidebar={showSidebar} />
        </WrapperPage>
      ) : (
        <Routes>
          <Route path="/login" element={<StartPage />} />
          <Route path="*" element={<StartPage />} />
        </Routes>
      )}
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default withTranslation()(App);
