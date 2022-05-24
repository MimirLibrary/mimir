import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';
import { FC } from 'react';
import { ReactComponent as Filter } from '../../../assets/Filter.svg';

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
  return (
    <StyledButton active={false}>
      <Filter />
    </StyledButton>
  );
};

export default FiltersButton;
