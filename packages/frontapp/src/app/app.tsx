import { FC, useState } from 'react';
import StartPage from './pages/StartPage';
import Sidebar from './components/Sidebar';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useAuth } from './hooks/useAuth';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useRoutes } from './hooks/useRoutes';
import { useAppSelector } from './hooks/useTypedSelector';
import NotificationPage from './pages/NotificationPage';
import SearchWrapper from './components/SearchWrapper';
import BookPreview from './pages/BookPreview';
import { RolesTypes } from '../utils/rolesTypes';
import Button from './components/Button';

const WrapperPage = styled.main`
  display: flex;
  justify-content: flex-start;
  min-height: 100vh;
  height: 100%;
`;

const WrapperSearchString = styled.div`
  display: flex;
  flex-direction: row;
`;
const WrapperButtons = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: right;
  max-width: 276px;
  width: 100%;
`;
const WrapperRoutes = styled.div`
  width: calc(100% - 22rem);
  background-color: ${colors.bg_primary};
  padding: 2.5rem 2.5rem 2.5rem 2.3rem;

  @media (max-width: ${dimensions.tablet_width}) {
    width: 100%;
    padding: ${dimensions.xs_1};
  }
`;

const App: FC = () => {
  const { isAuth } = useAuth();
  const { userRole } = useAppSelector((state) => state.user);
  const routes = useRoutes(userRole);
  const [isSidebarActive, setSidebarActive] = useState(false);
  const location = useLocation();
  return (
    <div>
      {isAuth ? (
        <div>
          <WrapperPage>
            <Sidebar
              isSidebarActive={isSidebarActive}
              setSidebarActive={setSidebarActive}
            />
            <WrapperRoutes>
              <WrapperSearchString>
                <SearchWrapper setSidebarActive={setSidebarActive} />
                {userRole === RolesTypes.MANAGER ? (
                  <>
                    {location.pathname === '/home' ? (
                      <WrapperButtons>
                        <Button value={'Open library statistics'} />
                      </WrapperButtons>
                    ) : null}
                  </>
                ) : null}
              </WrapperSearchString>
              <Routes>
                {routes}
                <Route path="/notifications" element={<NotificationPage />} />
                <Route path="*" element={<HomePage />} />
                <Route path="item/:item_id" element={<BookPreview />} />
              </Routes>
            </WrapperRoutes>
          </WrapperPage>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<StartPage />} />
          <Route path="*" element={<StartPage />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
