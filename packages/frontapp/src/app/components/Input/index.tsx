import React, { FC } from 'react';

interface IProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder?: string;
  className?: string;
}

const Input: FC<IProps> = ({
  value,
  onChange,
  type,
  placeholder,
  className,
}) => {
  return (
         <input
      className={className}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
