import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import { WrapperInput } from '../ClaimOperation';
import ButtonScanner from '../ButtonScanner';
import Button from '../Button';
import Scanner from '../Scanner';
import { useAppDispatch } from '../../hooks/useTypedDispatch';
import { setIdentifier } from '../../store/slices/identifierSlice';
import InputMask from 'react-input-mask';

const Wrapper = styled.section`
  width: 100%;
  background: ${colors.bg_secondary};
  border-radius: ${dimensions.xs_1};
  margin-top: ${dimensions.xl_2};
  padding: ${dimensions.base_2} ${dimensions.xl_6};
`;

const Title = styled.h3`
  font-weight: bold;
  line-height: ${dimensions.xl};
  font-size: ${dimensions.base};
  color: ${colors.main_black};
  margin-bottom: ${dimensions.xs_2};
`;

const SubTitle = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
  margin-bottom: ${dimensions.base};
`;

const WrapperInputStyled = styled(WrapperInput)`
  margin: 0;
`;
const ISBNWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 34.5rem;
  width: 100%;

  @media (max-width: ${dimensions.tablet_width}) {
    flex-direction: column;
    align-items: start;
    justify-content: start;
  }
`;

const StyledButton = styled(Button)`
  :disabled {
    background: ${colors.dropdown_gray};
    cursor: default;
  }
`;

const InputStyledMask = styled(InputMask)`
  width: 19rem;
  border: none;
  outline: none;
  margin-left: ${dimensions.xs_2};
  color: ${colors.main_black};
  font-family: ${fonts.primary}, sans-serif;
  margin-right: 0.12rem;

  @media (max-width: ${dimensions.tablet_width}) {
    margin-left: -${dimensions.xl};
  }

  @media (max-width: ${dimensions.phone_width}) {
    width: 70%;
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const DonateViaISBN = () => {
  const [valueOfISBN, setValueIsISBN] = useState<string>('');
  const [isShowScanner, setIsShowScanner] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handelChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueIsISBN(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(setIdentifier(valueOfISBN));
    setValueIsISBN('');
  };

  const handleShowScanner = useCallback(() => {
    setIsShowScanner(true);
  }, []);

  return (
    <>
      <Wrapper>
        <Title>ISBN code</Title>
        <SubTitle>
          Look at the back of the book for the code and write it in the box.
        </SubTitle>
        <form onSubmit={handleSubmit}>
          <ISBNWrapper>
            <WrapperInputStyled>
              <InputStyledMask
                mask="999-9-999-99999-9"
                value={valueOfISBN}
                onChange={handelChangeInput}
                required
                placeholder="Enter ISBN"
              />
            </WrapperInputStyled>
            <ButtonScanner
              margin={`0 ${dimensions.xs_2}`}
              onClick={handleShowScanner}
            />
            <StyledButton
              type="submit"
              value="Find book"
              disabled={!valueOfISBN}
            />
          </ISBNWrapper>
        </form>
      </Wrapper>
      {isShowScanner && (
        <Scanner
          onDetected={(code) => {
            setValueIsISBN(code);
          }}
          onClose={() => setIsShowScanner(false)}
        />
      )}
    </>
  );
};

export default DonateViaISBN;
