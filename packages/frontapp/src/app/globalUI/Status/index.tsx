import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

interface IStyledBookStatusProps {
  status: string | null;
}

export const StyledBookStatus = styled.p<IStyledBookStatusProps>`
  font-weight: 500;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${(props) => {
    switch (props.status) {
      case 'Free':
        return colors.free_book;
      case 'Busy':
        return colors.accent_color;
      case 'Overdue':
        return colors.problem_red;
      default:
        return '';
    }
  }};
`;
