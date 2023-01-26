import React, { FC, useState } from 'react';
import { OpenLink } from '../BookInfo';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

export const Description = styled.p<{ showFullDescription: boolean }>`
  overflow: ${(props) => (props.showFullDescription ? 'visible' : 'hidden')};
  text-overflow: ${(props) =>
    props.showFullDescription ? 'unset' : 'ellipsis'};
  white-space: ${(props) => (props.showFullDescription ? 'normal' : 'nowrap')};
  text-align: justify;
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

interface IProps {
  children: React.ReactNode;
}

const ExpandableText: FC<IProps> = ({ children }) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);

  return (
    <>
      <Description showFullDescription={showDescription}>
        {children}
      </Description>
      <OpenLink onClick={() => setShowDescription(!showDescription)}>
        {!showDescription ? 'see full description' : 'hide description'}
      </OpenLink>
    </>
  );
};
export default ExpandableText;
