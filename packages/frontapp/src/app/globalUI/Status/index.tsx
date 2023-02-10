import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { StatusTypes } from '@mimir/global-types';

interface IStyledBookStatusProps {
  status: string | null;
  fontSize?: string;
}

export const StyledBookStatusWrapper = styled.div<IStyledBookStatusProps>`
  padding: ${dimensions.xs_2};
  background: ${(props) => {
    switch (props.status) {
      case StatusTypes.FREE:
        return colors.bg_free;
      // todo: add separation between own claimed books and others busy (bg_busy)
      case StatusTypes.BUSY:
        return colors.bg_own_claim;
      case StatusTypes.PROLONG:
        return colors.bg_own_claim;
      case StatusTypes.OVERDUE:
        return colors.bg_error;
      case StatusTypes.REJECTED:
        return colors.bg_error;
      case StatusTypes.PENDING:
        return colors.bg_own_claim;
      default:
        return '';
    }
  }};
  border-radius: ${dimensions.xs_2};
  width: fit-content;
`;

export const StyledBookStatus = styled.p<IStyledBookStatusProps>`
  font-weight: 500;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${(props) => {
    switch (props.status) {
      case StatusTypes.FREE:
        return colors.free_book;
      // todo: add separation between own claimed books and others busy
      case StatusTypes.BUSY:
        return colors.accent_color;
      case StatusTypes.PROLONG:
        return colors.accent_color;
      case StatusTypes.OVERDUE:
        return colors.problem_red;
      case StatusTypes.REJECTED:
        return colors.problem_red;
      case StatusTypes.PENDING:
        return colors.accent_color;
      default:
        return '';
    }
  }};
  @media (max-width: ${dimensions.phone_width}) {
    font-size: ${({ fontSize }) => fontSize || dimensions.xs_1};
  }
`;
