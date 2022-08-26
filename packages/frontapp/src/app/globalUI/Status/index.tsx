import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { StatusTypes } from '@mimir/global-types';

interface IStyledBookStatusProps {
  status: string | null;
}

export const StyledBookStatusWrapper = styled.div<IStyledBookStatusProps>`
  @media (max-width: ${dimensions.phone_width}) {
    width: fit-content;
    padding: 0 4px;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    border-color: ${(props) => {
      switch (props.status) {
        case StatusTypes.FREE:
          return colors.free_book;
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
  }
`;

export const StyledBookStatus = styled.p<IStyledBookStatusProps>`
  font-weight: 500;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${(props) => {
    switch (props.status) {
      case StatusTypes.FREE:
        return colors.free_book;
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
`;
