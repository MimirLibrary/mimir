import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { colors, dimensions } from '@mimir/ui-kit';

export const ButtonLink = styled(Link)`
  cursor: pointer;
  font-weight: 300;
  color: ${colors.accent_color};
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  text-decoration: underline;
`;

export default ButtonLink;
