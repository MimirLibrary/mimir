import { FC, ReactElement } from 'react';
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
  padding: 0 ${dimensions.xl} 0 0;
  max-height: 680px;
  position: relative;
  overflow: auto;

  &::-webkit-scrollbar {
    border-radius: 8px;
    width: 8px;
  }
`;

const Item = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: ${dimensions.base};
  height: 135px;

  &:nth-of-type(2n) {
    background-color: ${colors.light_gray};
  }

  & > * {
    width: 20%;

    &:first-of-type {
      width: 60%;
    }
  }
`;

const Title = styled.div`
  display: flex;
  background-color: ${colors.accent_color};
  border-radius: ${dimensions.xs_1} ${dimensions.xs_1} 0 0;
  color: white;
  font-weight: 600;
  padding: ${dimensions.base};
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;

  & > * {
    width: 20%;

    &:first-of-type {
      width: 60%;
    }
  }
`;

const Table: FC<{ columnTitles: string[]; rows?: ReactElement[] }> = ({
  columnTitles,
  rows,
}) => {
  return (
    <TableContainer>
      <List>
        <Title>
          {columnTitles.map((title, i) => (
            <span key={i}>{title}</span>
          ))}
        </Title>
        {rows && rows.map((row, i) => <Item key={i}>{row}</Item>)}
      </List>
    </TableContainer>
  );
};

export default Table;
