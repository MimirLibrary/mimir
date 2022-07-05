import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { Oval } from 'react-loader-spinner';
import DonateBook from '../components/DonateBook';
import DonateViaISBN from '../components/DonateViaISBN';
import ErrorMessage from '../components/ErrorMessge';
import Modal from '../components/Modal';
import { useAppSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { removeIdentifier } from '../store/slices/identifierSlice';
import { useGetMaterialByIdentifierQuery } from '@mimir/apollo-client';
import { ReactComponent as ArrowIcon } from '../../assets/ArrowUp2.svg';

const Wrapper = styled.section``;

const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 3.5rem;
`;

const TitleInfo = styled.h1`
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  margin-bottom: ${dimensions.base};
`;

const SubTitle = styled.h3`
  font-weight: 300;
  font-size: ${dimensions.base};
  color: ${colors.main_black};
  line-height: ${dimensions.xl};
`;

const BackSpan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: ${dimensions.xl_3};
  font-weight: 600;
  font-size: ${dimensions.base};
  color: #000000;
  cursor: pointer;
`;

const WrapperLoader = styled.div`
  display: flex;
  justify-content: center;
`;

const DonateToLibrary = () => {
  const dispatch = useDispatch();
  const { identifier } = useAppSelector((state) => state.identifier);
  const { location } = useAppSelector((state) => state.user);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [showEmptyContentDonate, setShowEmptyContentDonate] =
    useState<boolean>(false);

  const { data, loading, error } = useGetMaterialByIdentifierQuery({
    skip: !identifier,
    variables: {
      identifier: String(identifier.split('-').join('')),
      location_id: Number(location.id),
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    return () => {
      if (identifier) dispatch(removeIdentifier());
    };
  }, [identifier]);

  useEffect(() => {
    if (error) {
      setIsShowError(true);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setShowEmptyContentDonate(true);
    }
  }, [data]);

  const handleCloseContentOfDonate = useCallback(() => {
    dispatch(removeIdentifier());
    setShowEmptyContentDonate(false);
  }, [dispatch]);

  const showContentOfDonate = useCallback(() => {
    setShowEmptyContentDonate(true);
  }, []);

  return (
    <>
      <Wrapper>
        <WrapperInfo>
          <TitleInfo>
            Are you planning to donate something to the library?
          </TitleInfo>
          <SubTitle>
            Fill in the required* fields or try to scan the code
          </SubTitle>
          {showEmptyContentDonate && (
            <BackSpan onClick={handleCloseContentOfDonate}>
              <ArrowIcon /> Back
            </BackSpan>
          )}
        </WrapperInfo>
        {loading ? (
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
          !showEmptyContentDonate && <DonateViaISBN />
        )}
        {data && showEmptyContentDonate && (
          <DonateBook data={data} onHideContent={handleCloseContentOfDonate} />
        )}
        {!data && showEmptyContentDonate && (
          <DonateBook onHideContent={handleCloseContentOfDonate} />
        )}
      </Wrapper>
      <Modal active={isShowError} setActive={setIsShowError}>
        <ErrorMessage
          setActive={setIsShowError}
          message="We did not find a suitable book code :(
          But you can still donate to the library by filling in the information manually"
          title="ISBN is not known"
          titleCancel="Ok"
          activeAskManager={false}
          showContentOfDonate={showContentOfDonate}
        />
      </Modal>
    </>
  );
};

export default DonateToLibrary;
