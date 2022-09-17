import React, { FC, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as SvgArrow } from '../../../assets/Arrow.svg';
import { TUserLocation } from '../../store/slices/userSlice';
import { useAppSelector } from '../../hooks/useTypedSelector';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Loader from '../Loader';
import CheckBox from '../CheckBox';
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
      transform: rotate(180deg);
      fill: ${colors.accent_color};
    }
  }

  svg {
    fill: ${colors.dropdown_gray};
    margin-left: ${dimensions.base};
    pointer-events: none;
  }

  span {
    display: inline-block;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const OptionListWrapper = styled.div`
  cursor: auto;
  overflow: hidden;
  margin-top: ${dimensions.xs_2};
  background-color: ${colors.bg_secondary};
  width: 100%;
  border-radius: ${dimensions.xs_1};
  box-shadow: 0px 10px 70px #1a1ed614;
  position: absolute;
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

const WrapperOption = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: start;
`;

const WrapperDropDown = styled.div`
  position: relative;
  max-width: 310px;
  margin: ${dimensions.base} 0 ${dimensions.xl_2} 0;
`;

const WrapperLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${dimensions.base} 0;
`;

interface ILoading {
  addLoading: boolean;
  removeLoading: boolean;
}

interface IDropDownLocation {
  options: TUserLocation[];
  handleChangeLocations: (
    e: React.ChangeEvent<HTMLInputElement>,
    option: TUserLocation
  ) => void;
  loading?: ILoading;
}

const DropDownLocation: FC<IDropDownLocation> = ({
  options,
  handleChangeLocations,
  loading,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const locations = useAppSelector((state) => state.user.locations);
  useOnClickOutside(ref, () => setShowOptionList(false));

  const locationsName = useMemo(
    () => locations.map((loc) => loc.value),
    [locations]
  );

  const handleChangeOptionList = () => {
    setShowOptionList((prev) => !prev);
  };

  const isChecked = (id: string): boolean => {
    if (!locations.length) return false;
    const currentLocation = locations.find((item) => item.id === id);
    return !!currentLocation;
  };

  const isDisabled = (index: number): boolean => {
    if (locations.length > 1) return false;
    const currentLoc = locations.find((item) => +item.id === index + 1);
    return !!(locations.length === 1 && currentLoc);
  };

  return (
    <WrapperDropDown ref={ref}>
      <DropdownContainer
        onClick={handleChangeOptionList}
        className={`${showOptionList ? 'show-options' : ''}`}
      >
        <span>{locationsName && locationsName.join(' / ')}</span>
        <SvgArrow />
      </DropdownContainer>
      {showOptionList && (
        <OptionListWrapper>
          {loading?.addLoading || loading?.removeLoading ? (
            <WrapperLoader>
              <Loader width={50} height={50} color={`${colors.accent_color}`} />
            </WrapperLoader>
          ) : (
            <OptionList>
              {options &&
                options.map((option, index) => (
                  <WrapperOption key={option.value}>
                    <label>{option.value}</label>
                    <CheckBox
                      disabled={isDisabled(index)}
                      checked={isChecked(option.id)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeLocations(e, option)
                      }
                    />
                  </WrapperOption>
                ))}
            </OptionList>
          )}
        </OptionListWrapper>
      )}
    </WrapperDropDown>
  );
};

export default DropDownLocation;
