import { FC, ReactElement } from 'react';

interface ConditionalWrapperProps {
  children: ReactElement;
  condition: boolean;
  wrapper: (children: ReactElement) => JSX.Element;
}

const ConditionalWrapper: FC<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children);

export default ConditionalWrapper;
