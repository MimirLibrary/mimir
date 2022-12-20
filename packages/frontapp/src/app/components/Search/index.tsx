import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import { ReactComponent as SearchIcon } from '../../../assets/Navbar/Search.svg';
import Input from '../Input';
import { ThemeProvider } from '@emotion/react';

export const InputSearch = styled(Input)`
  width: 19rem;
  border: none;
  outline: none;
  margin-left: ${dimensions.xs_2};
  color: ${colors.main_black};
  font-family: ${fonts.primary}, sans-serif;
  margin-right: 0.12rem;

  ::placeholder {
    color: #bdbdbd;
    font-size: ${dimensions.base};
    line-height: ${dimensions.xl};
  }

  @media (max-width: ${dimensions.tablet_width}) {
    margin-left: -${dimensions.xl};
  }

  @media (max-width: ${dimensions.phone_width}) {
    width: 100%;
    margin-left: 0;
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  cursor: pointer;
  :hover {
    fill: ${colors.accent_color};
  }
  @media (max-width: ${dimensions.phone_width}) {
    display: none;
  }
`;

type WrapperInputProps = { changeWidth?: boolean };

export const WrapperInput = styled.div<WrapperInputProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 21.5rem;
  width: 100% - 100px;
  border: 0.5px solid #bdbdbd;
  border-radius: ${dimensions.xl_3};
  padding: 10px 0;
  padding-left: ${dimensions.xs_1};
  margin-right: ${dimensions.xs_1};
  background: ${colors.bg_secondary};

  :hover {
    border: 0.5px solid ${colors.accent_color};
  }
  :focus {
    border: 0.5px solid ${colors.accent_color};
  }

  @media (max-width: ${dimensions.tablet_width}) {
    max-width: 100%;
    width: ${(props) => (props.changeWidth ? '100%' : '64vw')};
    min-width: 12rem;
    justify-content: flex-start;
    margin: 0;
    padding-left: ${dimensions.base};
    font-size: ${dimensions.sm};
    line-height: ${dimensions.lg};
  }
`;

interface ISearchParams {
  handleChangeSearch: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
  redirectToSearchByKey?: (arg0: React.KeyboardEvent<HTMLImageElement>) => void;
  redirectToSearchByClick?: () => void;
  placeholder: string;
  search: string;
  isFullWidth?: boolean;
}

const Search: FC<ISearchParams> = ({
  handleChangeSearch,
  redirectToSearchByClick,
  redirectToSearchByKey,
  placeholder,
  search,
  isFullWidth,
}) => {
  return (
    <WrapperInput changeWidth={isFullWidth} onKeyPress={redirectToSearchByKey}>
      <StyledSearchIcon
        fill={colors.dropdown_gray}
        width="20"
        height="20"
        onClick={redirectToSearchByClick}
      />
      <InputSearch
        type="text"
        value={search}
        onChange={handleChangeSearch}
        placeholder={placeholder}
      />
    </WrapperInput>
  );
};

export default Search;
