import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

const TableContainer = styled.div`
  width: 100%;
  border-radius: ${dimensions.xs_1};
  background-color: white;
  box-shadow: 0px 10px 70px rgba(26, 30, 214, 0.08);
  padding: ${dimensions.base_2} ${dimensions.xl_6};
`;

const List = styled.div`
  box-sizing: border-box;
  padding: ${dimensions.base_3} ${dimensions.xl_3} 0 0;
  max-height: 680px;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  background-color: ${colors.accent_color};
  border-radius: ${dimensions.xs_1} ${dimensions.xs_1} 0 0;
  color: white;
  font-weight: 600;
  padding: ${dimensions.base} ${dimensions.xl_2};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  > *::first-child {
    display: flex;
    flex-grow: 2;
  }
`;

const Table: FC = () => {
  return (
    <TableContainer>
      <List>
        <Title>
          <span>Title 1</span>
          <span>Title 2</span>
          <span>Title 3</span>
        </Title>
      </List>
    </TableContainer>
  );
};

export default Table;
