import styled from '@emotion/styled';
import { t } from 'i18next';
import { TextArticle } from '../../globalUI/TextArticle';
import { TextBase } from '../../globalUI/TextBase';
import Button from '../Button';
import { ReactComponent as QRCodeSvg } from '../../../assets/Qrcode.svg';
import Scanner from '../Scanner';
import { useCallback } from 'react';
import { dimensions } from '@mimir/ui-kit';
import useScanner from '../../hooks/useScanner';

const WrapperInstructions = styled.section`
  margin-top: 3.5rem;
`;

const StyledTextBase = styled(TextBase)`
  max-width: 611px;
  margin-bottom: ${dimensions.xl_2};
`;

const StyledButton = styled(Button)`
  visibility: hidden;

  @media (max-width: ${dimensions.tablet_width}) {
    visibility: visible;
  }
`;

const InstructionsClaim = () => {
  const {
    isShowScanner,
    setIsShowScanner,
    handleOnDetectedScannerRoute,
    handleOnCloseScanner,
  } = useScanner();

  const handleOnClickButton = useCallback(() => {
    setIsShowScanner(true);
  }, [setIsShowScanner]);

  return (
    <WrapperInstructions>
      <TextArticle>{t(`InstructionsClaim.Header`)}</TextArticle>
      <StyledTextBase>{t(`InstructionsClaim.Description`)}</StyledTextBase>
      <StyledButton
        svgComponent={<QRCodeSvg />}
        value={t('Search.Scan')}
        onClick={handleOnClickButton}
      />
      {isShowScanner && (
        <Scanner
          onDetected={handleOnDetectedScannerRoute}
          onClose={handleOnCloseScanner}
        />
      )}
    </WrapperInstructions>
  );
};

export default InstructionsClaim;
