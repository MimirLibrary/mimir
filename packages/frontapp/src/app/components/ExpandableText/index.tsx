import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { t } from 'i18next';

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

export const OpenButton = styled.button`
  border: none;
  background: none;
  margin: ${dimensions.xs_2} 0;
  padding: 0;
  font-weight: 300;
  color: ${colors.accent_color};
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  text-decoration: underline;
  cursor: pointer;
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
      <OpenButton onClick={() => setShowDescription(!showDescription)}>
        {!showDescription
          ? t('DonateItem.ExpandDescription.Show')
          : t('DonateItem.ExpandDescription.Hide')}
      </OpenButton>
    </>
  );
};
export default ExpandableText;
