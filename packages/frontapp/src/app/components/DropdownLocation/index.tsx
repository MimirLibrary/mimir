import React, { FC, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as SvgArrow } from '../../../assets/Arrow.svg';
import { IDropdownOption } from '../Dropdown';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { TUserLocation } from '../../store/slices/userSlice';
import { useAppSelector } from '../../hooks/useTypedSelector';

const DropdownContainer = styled.div`
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 ${dimensions.base};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${dimensions.xl_6};
  border: 0.5px solid ${colors.dropdown_gray};
  background-color: ${colors.bg_secondary};
  border-radius: ${dimensions.xl_3};
  position: relative;
  max-width: 310px;

  &:hover {
    svg {
      fill: ${colors.accent_color};
    }
  }

  &.show-options {
    svg {
      fill: ${colors.accent_color};
    }
  }

  &.placeholder {
    color: ${colors.dropdown_gray};
  }

  svg {
    fill: ${colors.dropdown_gray};
    margin-left: ${dimensions.base};
    pointer-events: none;
  }
`;

const OptionListWrapper = styled.div`
  cursor: auto;
  overflow: hidden;
  margin-top: ${dimensions.xs_2};
  background-color: ${colors.bg_secondary};
  //top: ${dimensions.base};
  width: 100%;
  border-radius: ${dimensions.xs_1};
  box-shadow: 0px 10px 70px #1a1ed614;
  position: absolute;
  //left: 0;
  z-index: 1;
  padding: 0 ${dimensions.xl};
`;

const OptionList = styled.div`
  max-height: 160px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  label {
    display: inline-block;
    width: 100%;
    padding: ${dimensions.xs_1} 0 ${dimensions.xs_1} ${dimensions.base};
    line-height: ${dimensions.xl};
    color: ${colors.main_black};
  }

  &::-webkit-scrollbar {
    width: ${dimensions.xl_4};

    &-track {
      background-color: #dfdfdf;
      border-radius: 999px;
      border: ${dimensions.base} solid transparent;
      background-clip: padding-box;
    }

    &-thumb {
      border-radius: 999px;
      background-color: ${colors.accent_color};
      border: ${dimensions.base} solid transparent;
      background-clip: padding-box;
    }
  }
`;

const CheckBox = styled.input`
  width: 24px;
  height: 24px;
`;
const WrapperOption = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: start;
`;

const WrapperDropDown = styled.div`
  position: relative;
  max-width: 310px;
`;

interface IDropDownLocation {
  options: TUserLocation[];
  placeholder: string;
  handleChangeLocations: (
    e: React.ChangeEvent<HTMLInputElement>,
    option: TUserLocation
  ) => void;
}

const DropDownLocation: FC<IDropDownLocation> = ({
  options,
  placeholder,
  handleChangeLocations,
}) => {
  const ref = useRef<any>();
  const [showOptionList, setShowOptionList] = useState(false);
  const locations = useAppSelector((state) => state.user.locations);

  const handleChangeOptionList = () => {
    setShowOptionList((prev) => !prev);
  };

  console.log('locations', locations);
  //
  const isChecked = (id: string): boolean => {
    const elem = locations.find((item) => item.id === id);
    if (elem) return true;
    return false;
  };

  return (
    <WrapperDropDown>
      <DropdownContainer onClick={handleChangeOptionList} ref={ref}>
        {placeholder}
        <SvgArrow />
      </DropdownContainer>
      {showOptionList && (
        <OptionListWrapper>
          <OptionList>
            {options.map((option) => (
              <WrapperOption key={option.value}>
                <label>{option.value}</label>
                <CheckBox
                  type="checkbox"
                  checked={isChecked(option.id)}
                  onChange={(e) => handleChangeLocations(e, option)}
                />
              </WrapperOption>
            ))}
          </OptionList>
        </OptionListWrapper>
      )}
    </WrapperDropDown>
  );
};

export default DropDownLocation;
