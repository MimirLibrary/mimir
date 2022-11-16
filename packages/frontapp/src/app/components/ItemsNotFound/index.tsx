import styled from '@emotion/styled';
import { colors } from '@mimir/ui-kit';
import { t } from 'i18next';
import React from 'react';

// TODO: Change component when the design is added
const NotFoundTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  color: ${colors.main_black};
`;

const ItemsNotFound = () => {
  return <NotFoundTitle>{t('Search.NotFound')}</NotFoundTitle>;
};

export default ItemsNotFound;
