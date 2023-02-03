import React, { FC, useMemo } from 'react';
import { Topic } from '../BookInfo';
import styled from '@emotion/styled';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { colors, dimensions } from '@mimir/ui-kit';
import Dropdown, { IDropdownOption } from '../Dropdown';
import { TUserLocation } from '../../store/slices/userSlice';

type Handler =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | TUserLocation
  | IDropdownOption;

interface IProps {
  type?: string;
  title: string;
  value?: string;
  textarea?: boolean;
  dropdown?: boolean;
  handler(e: Handler): void;
  dropdownOptions?: IDropdownOption[];
  dropdownIndex?: number;
  placeholder?: string;
}

const SectionWrapper = styled.div`
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.25rem;
  color: #333333;
`;

const RestyledDropdown = styled(Dropdown)`
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  border: 0.5px solid #bdbdbd;
  color: ${colors.main_black};
  border-radius: ${dimensions.xl_3};
  padding: ${dimensions.xs_1};
  background: ${colors.bg_secondary};

  :hover {
    border: 0.5px solid ${colors.accent_color};
  }

  :focus {
    border: 0.5px solid ${colors.accent_color};
  }
`;

const Edit: FC<IProps> = ({
  type,
  title,
  value = '',
  textarea = false,
  dropdown = false,
  placeholder = '',
  handler,
  dropdownOptions = [],
}) => {
  const currentDropdownIndex = useMemo(
    () => dropdownOptions?.findIndex((item) => item.value === value),
    [value, dropdownOptions]
  );

  return (
    <SectionWrapper>
      <Topic>{title}</Topic>
      {dropdown ? (
        <RestyledDropdown
          options={dropdownOptions}
          initIndex={currentDropdownIndex}
          onChange={handler}
          placeholder={placeholder}
        />
      ) : (
        <InputWrapper>
          {textarea ? (
            <Textarea
              value={value}
              handler={handler}
              placeholder={placeholder}
            />
          ) : (
            <Input
              type={type ? type : 'text'}
              value={value}
              handler={handler}
              placeholder={placeholder}
            />
          )}
        </InputWrapper>
      )}
    </SectionWrapper>
  );
};

export default Edit;
