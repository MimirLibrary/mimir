import React, { FC, useCallback, useState } from 'react';
import { OpenLink, Topic } from './index';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

export const Description = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

interface IProps {
  children: React.ReactNode;
}

const DescriptionDetails: FC<IProps> = ({ children }) => {
  const [showDescription, toggleDescription] = useState<boolean>(false);

  const toggle = useCallback(() => {
    toggleDescription(!showDescription);
  }, [showDescription]);

  return (
    <>
      <Topic>Description: </Topic>
      <Description
        style={
          showDescription
            ? {
                overflow: 'visible',
                textOverflow: 'unset',
                whiteSpace: 'normal',
              }
            : undefined
        }
      >
        {children}
      </Description>
      <OpenLink onClick={toggle}>
        {' '}
        {!showDescription ? 'see full description' : 'hide description'}
      </OpenLink>
    </>
  );
};
export default DescriptionDetails;
