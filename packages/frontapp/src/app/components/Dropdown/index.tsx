import { FC, MouseEvent, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as SvgArrow } from '../../../assets/Arrow.svg';
import useOnClickOutside from '../../hooks/useOnClickOutside';

export interface IDropdownOption {
  [k: string]: unknown;
  value: string;
}

export interface IDropdownProps {
  /**
   * String which user will see before selected option.
   */
  placeholder?: string;
  /**
   * Options for select.
   */
  options: IDropdownOption[];
  /**
   * Select an option instead placeholder.
   */
  initIndex?: number;
  /**
   * Use if you want restyle component.
   */
  className?: string;
  /**
   * Pass a function to be called when another option is selected.
   * This function will only run when the value exactly changes.
   */
  onChange?: (option: IDropdownOption) => void;
}

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
  background-color: ${colors.bg_secondary};
  top: calc(100% + ${dimensions.xs_2});
  width: 100%;
  border-radius: ${dimensions.xs_1};
  box-shadow: 0px 10px 70px #1a1ed614;
  position: absolute;
  left: 0;
  z-index: 1;
`;

const OptionList = styled.div`
  max-height: 160px;
  overflow-y: auto;

  span {
    cursor: pointer;
    display: inline-block;
    width: 100%;
    padding: ${dimensions.xs_1} 0 ${dimensions.xs_1} ${dimensions.base};
    line-height: ${dimensions.xl};
    color: ${colors.main_black};

    &:hover {
      background-color: #ededff;
    }
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

const Dropdown: FC<IDropdownProps> = ({
  placeholder,
  options,
  initIndex = -1,
  className,
  onChange,
}) => {
  const containerRef = useRef(null);
  useOnClickOutside(containerRef, () => {
    setShowOptionList(false);
  });
  const [selectedOptionIndex, setSelectedOptionIndex] =
    useState<number>(initIndex);
  const [showOptionList, setShowOptionList] = useState(false);

  const handleDropdownClick = (event: MouseEvent) => {
    if (event.target !== event.currentTarget) return;
    setShowOptionList(true);
  };

  const handleOptionClick = (index: number) => {
    setShowOptionList(false);
    if (index === selectedOptionIndex) return;
    setSelectedOptionIndex(index);
    onChange && onChange(options[index]);
  };

  return (
    <DropdownContainer
      ref={containerRef}
      className={`${selectedOptionIndex < 0 ? 'placeholder' : ''} ${
        showOptionList ? 'show-options' : ''
      } ${className}`}
      onClick={handleDropdownClick}
    >
      {selectedOptionIndex >= 0
        ? options[selectedOptionIndex].value
        : placeholder}
      <SvgArrow />
      {showOptionList && (
        <OptionListWrapper>
          <OptionList>
            {options.map((option, index) => (
              <span
                key={index}
                onClick={() => {
                  handleOptionClick(index);
                }}
              >
                {option.value}
              </span>
            ))}
          </OptionList>
        </OptionListWrapper>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
