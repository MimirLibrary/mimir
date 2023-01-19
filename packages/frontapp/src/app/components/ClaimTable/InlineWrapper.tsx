import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';

const InlineWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: ${dimensions.phone_width}) {
    margin-bottom: 15px;
  }
`;

export default InlineWrapper;
