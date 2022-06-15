import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';
import { FC } from 'react';
import { ReactComponent as Filter } from '../../../assets/Filter.svg';
import CategorySearch from '../CategorySearch';
import Modal from '../Modal';
import { useState } from 'react';

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
  const [active, setActive] = useState(false);
  return (
    <>
      <StyledButton active={false} onClick={() => setActive(true)}>
        <Filter />
      </StyledButton>
      <Modal active={active} setActive={setActive}>
        <CategorySearch />
      </Modal>
    </>
  );
};

export default FiltersButton;
