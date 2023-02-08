import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

export type BadgeType = 'success' | 'warning' | 'danger' | 'default';

interface StatusBadgeProps {
  type: BadgeType;
}

const badgeColors: Record<BadgeType, string> = {
  success: colors.main_green,
  warning: colors.warning_yellow,
  default: colors.main_black,
  danger: colors.problem_red,
};

export const StatusBadge = styled.span<StatusBadgeProps>`
  font-size: ${() => dimensions.base};
  line-height: ${() => dimensions.xl};
  font-weight: 500;
  color: ${(props) => badgeColors[props.type]};
`;

export default StatusBadge;
