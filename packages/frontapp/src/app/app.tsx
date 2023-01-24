import { FC, useCallback, useState } from 'react';
import StartPage from './pages/StartPage';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withTranslation } from 'react-i18next';
import MainComponent from './components/MainComponent';
import SilentSignInRedirectPage from './pages/SilentSignInRedirectPage';
import { SignInRedirectPage } from './pages/SignInRedirectPage';

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
          <Route
            path="/auth/signin_redirect"
            element={<SignInRedirectPage />}
          />
          <Route path="*" element={<StartPage />} />
        </Routes>
      )}
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route
          path="/auth/silent_redirect"
          element={<SilentSignInRedirectPage />}
        />
      </Routes>
    </>
  );
};

export default withTranslation()(App);
