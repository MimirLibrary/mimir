import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import DonateBook from '../components/DonateBook';
import DonateViaISBN from '../components/DonateViaISBN';
import { useAppSelector } from '../hooks/useTypedSelector';
import { ReactComponent as ArrowIcon } from '../../assets/ArrowUp2.svg';
import { useDispatch } from 'react-redux';
import { removeIdentifier } from '../store/slices/identifierSlice';
import { useGetMaterialByIdentifierQuery } from '@mimir/apollo-client';
import Modal from '../components/Modal';
import ErrorMessage from '../components/ErrorMessge';

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
const DonateToLibrary = () => {
  const dispatch = useDispatch();
  const { identifier } = useAppSelector((state) => state.identifier);
  const { location } = useAppSelector((state) => state.user);
  const [isShowError, setIsShowError] = useState<boolean>(false);

  const material = useGetMaterialByIdentifierQuery({
    skip: !identifier,
    variables: {
      identifier: String(identifier.split('-').join('')),
      location_id: Number(location.id),
    },
  });

  useEffect(() => {
    if (material.error) {
      setIsShowError(true);
    }
  }, [material.error]);

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
          {material.data && (
            <BackSpan onClick={() => dispatch(removeIdentifier())}>
              <ArrowIcon /> Back
            </BackSpan>
          )}
          {!material.data && <DonateViaISBN />}
        </WrapperInfo>
        {material.data && <DonateBook data={material?.data} />}
      </Wrapper>
      <Modal active={isShowError} setActive={setIsShowError}>
        <ErrorMessage
          setActive={setIsShowError}
          message="We did not find a suitable book code :(
          But you can still donate to the library by filling in the information manually"
          title="ISBN is not known"
          titleCancel="Ok"
          activeAskManager={false}
        />
      </Modal>
    </>
  );
};

export default DonateToLibrary;
