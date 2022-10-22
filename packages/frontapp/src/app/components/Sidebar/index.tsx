import { FC } from 'react';
import styled from '@emotion/styled';
import Navbar from '../Navbar';
import Header from '../Header';
import { colors, dimensions } from '@mimir/ui-kit';
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
    max-width: 18rem;
  }

  @media (max-width: ${dimensions.tablet_width}) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.isSidebarActive ? '0' : '-100%')};
    background: ${colors.bg_secondary};
    width: 90%;
    max-width: 22rem;
    transition: all 0.8s;
    height: 100%;
    z-index: 1000;
  }
`;

const Sidebar: FC<IProps> = ({ isSidebarActive, hideSidebar }) => {
  const { id, userRole, locations } = useAppSelector((state) => state.user);

  const { data: getNotificationsByPersonData } =
    useGetNotificationsByPersonQuery({
      variables: {
        person_id: id,
      },
      skip: userRole === RolesTypes.MANAGER,
    });

  const { data: allMessagesData } = useGetAllMessagesQuery({
    skip: userRole === RolesTypes.READER,
    variables: { location_id: parseInt(locations[0].id) },
  });

  // TODO: handle READER notifications

  return (
    <StyledSidebar isSidebarActive={isSidebarActive}>
      <Header
        hasNewNotifications={
          !!getNotificationsByPersonData?.getNotificationsByPerson.length ||
          !!allMessagesData?.getAllMessages?.length
        }
        hideSidebar={hideSidebar}
      />
      <Navbar hideSidebar={hideSidebar} />
    </StyledSidebar>
  );
};

export default Sidebar;
