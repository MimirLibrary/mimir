import React from 'react';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { ReactComponent as ArrowBack } from '../../../assets/ArrowUp2.svg';

import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

export const ButtonWrapper = styled.div`
  margin: 3rem 0 ${dimensions.xl_3} 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const GoBack = styled.a`
  font-weight: 600;
  font-size: ${dimensions.base};
`;

const BackButton = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <ButtonWrapper onClick={handleGoBack}>
      <ArrowBack />
      <GoBack>{t('Back')}</GoBack>
    </ButtonWrapper>
  );
};

export default BackButton;
