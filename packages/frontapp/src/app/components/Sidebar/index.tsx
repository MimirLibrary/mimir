import { FC, useRef } from 'react';
import styled from '@emotion/styled';
import Navbar from '../Navbar';
import Header from '../Header';
import { colors, dimensions } from '@mimir/ui-kit';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import {
  useGetAllMessagesQuery,
  useGetNotificationsByPersonQuery,
} from '@mimir/apollo-client';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { RolesTypes } from '@mimir/global-types';
import { locationIds } from '../../store/slices/userSlice';

interface IProps {
  isSidebarActive: boolean;
  hideSidebar: () => void;
}

interface IStyledSidebarProps {
  isSidebarActive: boolean;
}

const StyledWrapper = styled.div<IStyledSidebarProps>`
  max-width: 22rem;
  width: 100%;
  @media (max-width: ${dimensions.laptop_width}) {
    max-width: none;
    position: fixed;
    background-color: ${(props) =>
      props.isSidebarActive ? 'rgba(0, 0, 0, 0.4)' : 'none'};
    height: 100%;
    transition: all 0.8s;
    z-index: ${(props) => (props.isSidebarActive ? 1000 : -1)};
  }
`;

const StyledSidebar = styled.aside<IStyledSidebarProps>`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  max-width: 22rem;
  width: 100%;
  padding-top: ${dimensions.xl_2};
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: ${dimensions.laptop_width}) {
    position: fixed;
    padding-top: ${dimensions.lg};
    top: 0;
    left: ${(props) => (props.isSidebarActive ? '0' : '-100%')};
    background: ${colors.bg_secondary};
    max-width: 20rem;
    transition: all 0.8s;
    height: 100%;
    z-index: 1000;
  }

  @media (max-width: 23rem) {
    max-width: 85%;
  }
`;

const Sidebar: FC<IProps> = ({ isSidebarActive, hideSidebar }) => {
  const ref = useRef(null);
  useOnClickOutside(ref, hideSidebar);
  const { id, userRole } = useAppSelector((state) => state.user);
  const locations = useAppSelector(locationIds);

  const { data: getNotificationsByPersonData } =
    useGetNotificationsByPersonQuery({
      variables: {
        person_id: id,
      },
      skip: userRole === RolesTypes.MANAGER,
    });

  const { data: allMessagesData } = useGetAllMessagesQuery({
    skip: userRole === RolesTypes.READER,
    variables: { location_id: locations },
  });

  return (
    <StyledWrapper isSidebarActive={isSidebarActive}>
      <StyledSidebar isSidebarActive={isSidebarActive} ref={ref}>
        <Header
          hasNewNotifications={
            !!getNotificationsByPersonData?.getNotificationsByPerson.length ||
            !!allMessagesData?.getAllMessages?.length
          }
          hideSidebar={hideSidebar}
        />
        <Navbar hideSidebar={hideSidebar} />
      </StyledSidebar>
    </StyledWrapper>
  );
};

export default Sidebar;
