import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';
import { FC } from 'react';
import { ReactComponent as Filter } from '../../../assets/Filter.svg';
import CategorySearch from '../CategorySearch';
import UserSearch from '../UserSearch';
import Modal from '../Modal';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RoutesTypes } from '../../../utils/routes';
interface IProps {
  active: boolean;
}

const StyledButton = styled.button<IProps>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  fill: ${(props) => (props.active ? colors.accent_color : '')};
`;

const FiltersButton: FC = () => {
  const location = useLocation();
  const [active, setActive] = useState(false);
  return (
    <>
      <StyledButton active={false} onClick={() => setActive(true)}>
        <Filter />
      </StyledButton>
      <Modal active={active} setActive={setActive}>
        {location.pathname === RoutesTypes.READERS ? (
          <UserSearch setActive={setActive} />
        ) : (
          <CategorySearch setActive={setActive} />
        )}
      </Modal>
    </>
  );
};

export default FiltersButton;
