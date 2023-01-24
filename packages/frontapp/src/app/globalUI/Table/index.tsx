import { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import MediaQuery from 'react-responsive';

const TableContainer = styled.div`
  width: 100%;
  border-radius: ${dimensions.xs};
  background-color: white;
  box-shadow: 0 10px 70px rgba(26, 30, 214, 0.08);
  padding: ${dimensions.base_2};

  @media (max-width: ${dimensions.tablet_width}) {
    background-color: #f1f3fe;
    padding: 0 0 0 0;
    height: auto;
    width: 100%;
  }
`;

const List = styled.div`
  box-sizing: border-box;
  max-height: 680px;
  position: relative;

  &::-webkit-scrollbar {
    border-radius: 8px;
    width: 8px;
  }
  @media (max-width: ${dimensions.phone_width}) {
    overflow: hidden;
    padding: 0 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    max-height: none;
  }
`;

const Item = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: ${colors.bg_secondary};
  padding: ${dimensions.base};
  height: 135px;
  width: 100%;

  &:nth-of-type(2n) {
    background-color: ${colors.light_gray};
  }

  & > * {
    width: 20%;

    &:first-child {
      width: 60%;
    }
  }

  @media (max-width: ${dimensions.phone_width}) {
    > * {
      :first-child {
        margin-left: 0;
      }
      margin-left: 5.55rem;
      width: 100%;
    }
    flex-direction: column;
    padding: 1rem;
    height: auto;
    border-radius: ${dimensions.xs_1};
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
        <MediaQuery minWidth={dimensions.phone_width}>
          <Title>
            {columnTitles.map((title, i) => (
              <span key={i}>{title}</span>
            ))}
          </Title>
        </MediaQuery>
        {rows && rows.map((row, i) => <Item key={i}>{row}</Item>)}
      </List>
    </TableContainer>
  );
};

export default Table;
