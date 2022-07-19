import { FC, useCallback, useState } from 'react';
import StartPage from './pages/StartPage';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useAuth } from './hooks/useAuth';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useRoutes } from './hooks/useRoutes';
import { useAppSelector } from './hooks/useTypedSelector';
import NotificationPage from './pages/NotificationPage';
import SearchWrapper from './components/SearchWrapper';
import BookPreview from './pages/BookPreview';
import BooksByCategory from './components/BooksByCategory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './components/Button';
import { ReactComponent as QRCodeSvg } from '../assets/Qrcode.svg';
import { t } from 'i18next';
import Scanner from './components/Scanner';
import useScanner from './hooks/useScanner';
import { ContentModal, WrapperModal } from './components/Modal';
import { useGetReasonOfBlockQuery } from '@mimir/apollo-client';
import { useAppDispatch } from './hooks/useTypedDispatch';
import { updateBlocked } from './store/slices/userSlice';
import { ReactComponent as SadMimir } from '../assets/SadMimir.svg';
import { Description } from './components/UserCard';

const WrapperPage = styled.main`
  display: flex;
  justify-content: flex-start;
  min-height: 100vh;
  height: 100%;
`;

const WrapperRoutes = styled.div`
  width: calc(100% - 22rem);
  background-color: ${colors.bg_primary};
  padding: 2.5rem 2.5rem 0 2.3rem;

  @media (max-width: ${dimensions.tablet_width}) {
    width: 100%;
    padding: ${dimensions.xs_1};
  }
`;

const StyledButton = styled(Button)`
  height: 56px;
  width: 197px;
  position: absolute;
  top: ${dimensions.base_2};
  right: ${dimensions.base_2};

  @media (max-width: ${dimensions.tablet_width}) {
    position: fixed;
    top: auto;
    right: ${dimensions.base};
    bottom: ${dimensions.base};
    height: ${dimensions.base_3};
    width: ${dimensions.base_3};

    span {
      display: none;
    }
  }
`;

const SadMimirImage = styled(SadMimir)`
  width: 128px;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: ${dimensions.base};
  margin: ${dimensions.base_2};
`;

const InlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
`;

const App: FC = () => {
  const {
    isShowScanner,
    setIsShowScanner,
    handleOnDetectedScannerRoute,
    handleOnCloseScanner,
  } = useScanner();
  const { isAuth } = useAuth();
  const { userRole, blocked, id } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const routes = useRoutes(userRole);
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [blockedState, setBlocked] = useState<boolean>(blocked);
  const { data, loading } = useGetReasonOfBlockQuery({
    variables: { id: String(id) },
  });
  if (!loading) {
    if (
      blocked !== data?.getReasonOfBlock?.state &&
      data?.getReasonOfBlock?.state !== undefined
    ) {
      dispatch(updateBlocked(!blocked));
      setBlocked(!blocked);
    }
    console.log(data?.getReasonOfBlock?.description);
    // setDescription(data?.getReasonOfBlock?.description || "")
  }

  const handleOnClickButton = useCallback(() => {
    setIsShowScanner(true);
  }, []);

  return (
    <>
      {isAuth ? (
        <div>
          <WrapperPage>
            <Sidebar
              isSidebarActive={isSidebarActive}
              setSidebarActive={setSidebarActive}
            />
            <WrapperRoutes>
              <SearchWrapper setSidebarActive={setSidebarActive} />
              <Routes>
                {routes}
                <Route path="/notifications" element={<NotificationPage />} />
                <Route path="*" element={<HomePage />} />
                <Route path="item/:item_id" element={<BookPreview />} />
                <Route
                  path="category/:category"
                  element={<BooksByCategory />}
                />
                <Route path="/category" element={<BooksByCategory />} />
              </Routes>
              <StyledButton
                svgComponent={<QRCodeSvg />}
                value={t('Search.Scan')}
                onClick={handleOnClickButton}
              />
              {isShowScanner && (
                <Scanner
                  onDetected={handleOnDetectedScannerRoute}
                  onClose={handleOnCloseScanner}
                />
              )}
            </WrapperRoutes>
          </WrapperPage>
          <WrapperModal active={blockedState}>
            <ContentModal active={blockedState}>
              <ModalWrapper>
                <Description bold titlee>
                  {t('Block.Opps')}
                </Description>
                {data?.getReasonOfBlock?.description ? (
                  <InlineWrapper>
                    <Description bold>{t('Block.ReasonForBlock')}</Description>
                    <Description>
                      {data?.getReasonOfBlock?.description}
                    </Description>
                  </InlineWrapper>
                ) : null}
                <SadMimirImage />
              </ModalWrapper>
            </ContentModal>
          </WrapperModal>
        </div>
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

export default App;
