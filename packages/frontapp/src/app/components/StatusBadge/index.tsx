import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

export type BadgeType = 'success' | 'danger';

interface StatusBadgeProps {
  type: 'success' | 'danger';
}

const badgeColors: Record<BadgeType, string> = {
  success: colors.main_green,
  danger: colors.problem_red,
};

export const StatusBadge = styled.span<StatusBadgeProps>`
  font-size: ${() => dimensions.base};
  line-height: ${() => dimensions.xl};
  font-weight: 500;
  color: ${(props) => badgeColors[props.type]};
`;

export default StatusBadge;
