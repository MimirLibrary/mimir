import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { removeIdentifier } from '../../store/slices/identifierSlice';
import { ReactComponent as ArrowIcon } from '../../../assets/ArrowUp2.svg';
import { Oval } from 'react-loader-spinner';
import DonateViaISBN from '../DonateViaISBN';
import DonateBook from '../DonateBook';
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessge';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { GetMaterialFromMetadataQuery } from '@mimir/apollo-client';
import { t } from 'i18next';

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 3.5rem;

  @media (max-width: ${dimensions.tablet_width}) {
    margin-top: ${dimensions.xl_3};
  }
`;

export const TitleInfo = styled.h1`
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  margin-bottom: ${dimensions.base};
`;

export const SubTitle = styled.h3`
  font-weight: 300;
  font-size: ${dimensions.base};
  color: ${colors.main_black};
  line-height: ${dimensions.xl};
`;

export const BackSpan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${dimensions.lg};
  text-align: center;
  margin-top: ${dimensions.xl_3};
  font-weight: 600;
  font-size: ${dimensions.base};
  color: #000000;
  cursor: pointer;

  @media (max-width: ${dimensions.tablet_width}) {
    order: -1;
    margin-top: 0;
    margin-bottom: ${dimensions.xl_3};
  }
`;

export const WrapperLoader = styled.div`
  display: flex;
  justify-content: center;
`;

const DonateBookFlow = () => {
  const dispatch = useDispatch();
  const { identifier } = useAppSelector((state) => state.identifier);
  const [dataOfMaterial, setDataOfMaterial] = useState<
    GetMaterialFromMetadataQuery | null | undefined
  >(null);
  const [dataOfError, setDataOfError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [showEmptyContentDonate, setShowEmptyContentDonate] =
    useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (identifier) dispatch(removeIdentifier());
    };
  }, [identifier]);

  useEffect(() => {
    if (dataOfError) {
      setIsShowError(true);
    }
  }, [dataOfError]);

  useEffect(() => {
    if (dataOfMaterial) {
      setShowEmptyContentDonate(true);
    }
  }, [dataOfMaterial]);

  const setDataMaterial = useCallback(
    (data: GetMaterialFromMetadataQuery | undefined) => {
      setDataOfMaterial(data);
    },
    [dataOfMaterial]
  );

  const setValueOfLoading = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  const setValueOfError = useCallback((value: Error | null) => {
    setDataOfError(value);
  }, []);

  const handleCloseContentOfDonate = useCallback(() => {
    dispatch(removeIdentifier());
    setDataOfError(null);
    setDataOfMaterial(null);
    setShowEmptyContentDonate(false);
  }, [dispatch]);

  const showContentOfDonate = useCallback(() => {
    setShowEmptyContentDonate(true);
  }, []);

  return (
    <>
      <section>
        <WrapperInfo>
          <TitleInfo>{t('DonateBookInputs.Title')}</TitleInfo>
          <SubTitle>{t('DonateBookInputs.Subtitle')}</SubTitle>
          {showEmptyContentDonate && (
            <BackSpan onClick={handleCloseContentOfDonate}>
              <ArrowIcon /> <span>Back</span>
            </BackSpan>
          )}
        </WrapperInfo>
        {isLoading ? (
          <WrapperLoader>
            <Oval
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={5}
              strokeWidthSecondary={1}
              color="blue"
              secondaryColor="white"
            />
          </WrapperLoader>
        ) : (
          !showEmptyContentDonate && (
            <DonateViaISBN
              setDataToState={setDataMaterial}
              setIsLoading={setValueOfLoading}
              setDataError={setValueOfError}
            />
          )
        )}
        {dataOfMaterial && showEmptyContentDonate && (
          <DonateBook
            data={dataOfMaterial}
            onHideContent={handleCloseContentOfDonate}
          />
        )}
        {!dataOfMaterial && showEmptyContentDonate && (
          <DonateBook onHideContent={handleCloseContentOfDonate} />
        )}
      </section>
      <Modal active={isShowError} setActive={setIsShowError}>
        <ErrorMessage
          setActive={setIsShowError}
          message={t('DonateBookInputs.Modal.ISBNError.Message')}
          title={t('DonateBookInputs.Modal.ISBNError.Title')}
          titleCancel="Ok"
          activeAskManager={false}
          showContentOfDonate={showContentOfDonate}
        />
      </Modal>
    </>
  );
};

export default DonateBookFlow;
