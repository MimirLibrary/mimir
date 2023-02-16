import { FC, useCallback, memo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BlockPage from '../../pages/BlockPage';
import { RoutesTypes } from '../../../utils/routes';
import SearchWrapper from '../SearchWrapper';
import NotificationPage from '../../pages/NotificationPage';
import HomePage from '../../pages/HomePage';
import { RolesTypes } from '@mimir/global-types';
import { ReactComponent as QRCodeSvg } from '../../../assets/Qrcode.svg';
import { t } from 'i18next';
import Scanner from '../Scanner';
import { useAppSelector } from '../../hooks/useTypedSelector';
import useScanner from '../../hooks/useScanner';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import Button from '../Button';
import { useRoutes } from '../../hooks/useRoutes';
import { ReactComponent as AddBookBluePlus } from '../../../assets/AddBookBluePlus.svg';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../store/slices/tabsSlice';
import { NavbarItems } from '../../../utils/NavbarItems';

const WrapperRoutes = styled.div`
  width: calc(100% - 22rem);
  background-color: ${colors.bg_primary};
  padding: 2.5rem 2.5rem 2.5rem 2.3rem;

  @media (max-width: ${dimensions.laptop_width}) {
    width: 100%;
    padding: 67px ${dimensions.xs_1} ${dimensions.xs_1} ${dimensions.xs_1};
  }

  @media (max-width: ${dimensions.tablet_width}) {
    padding: 67px ${dimensions.base} ${dimensions.base};
  }

  @media (max-width: ${dimensions.phone_width}) {
    padding-bottom: 10.25rem;
  }
`;
interface IStyledButton {
  show: boolean;
}

const StyledButton = styled(Button)<IStyledButton>`
  height: 56px;
  width: 197px;
  position: absolute;
  top: ${dimensions.base_2};
  right: ${dimensions.base_2};

  @media (max-width: ${dimensions.laptop_width}) {
    position: fixed;
    top: auto;
    right: ${dimensions.base};
    bottom: ${dimensions.base};
    height: ${dimensions.base_3};
    width: ${dimensions.base_3};
    display: ${({ show }) => (show ? 'inline' : 'none')};
    span {
      display: none;
    }
  }
`;

interface IPropsMainComponent {
  showSidebar: () => void;
}

const MainComponent: FC<IPropsMainComponent> = ({ showSidebar }) => {
  const {
    isShowScanner,
    setIsShowScanner,
    handleOnDetectedScannerRoute,
    handleOnCloseScanner,
  } = useScanner();
  const { blocked, userRole } = useAppSelector((state) => state.user);
  const routes = useRoutes(userRole);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLaptop = useMediaQuery({ maxWidth: dimensions.laptop_width });

  const handleAddItem = useCallback(() => {
    navigate(RoutesTypes.CREATE_NEW_ITEM);
    dispatch(setActiveTab(NavbarItems.CREATE_NEW_ITEM));
  }, []);

  const handleClaimItem = useCallback(() => {
    setIsShowScanner(true);
  }, []);

  return blocked ? (
    <Routes>
      <Route path="*" element={<BlockPage />} />
    </Routes>
  ) : (
    <WrapperRoutes>
      <SearchWrapper showSidebar={showSidebar} />
      <Routes>
        {routes}
        <Route
          path={RoutesTypes.NOTIFICATIONS}
          element={<NotificationPage />}
        />
        <Route path="*" element={<HomePage />} />
        <Route path="/block" element={<BlockPage />} />
      </Routes>
      {userRole !== RolesTypes.MANAGER ? (
        <StyledButton
          svgComponent={<QRCodeSvg />}
          value={t('Search.Scan')}
          onClick={handleClaimItem}
          show={!(window.location.pathname === RoutesTypes.DONATE_TO_LIBRARY)}
        />
      ) : isLaptop ? (
        <StyledButton
          svgComponent={<AddBookBluePlus />}
          value={t('Search.Scan')}
          onClick={handleAddItem}
          show={!(window.location.pathname === RoutesTypes.CREATE_NEW_ITEM)}
        />
      ) : null}
      {isShowScanner && (
        <Scanner
          onDetected={handleOnDetectedScannerRoute}
          onClose={handleOnCloseScanner}
        />
      )}
    </WrapperRoutes>
  );
};

export default memo(MainComponent);
