import React, { FC } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import { colors, dimensions, fonts } from '@mimir/ui-kit';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperClaimOperation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 22.75rem;
  width: 100%;
  padding-left: ${dimensions.base_2};
`;

const TitleOfClaim = styled.h3`
  font-weight: 700;
  color: ${colors.main_black};
  line-height: ${dimensions.xl_3};
  font-size: ${dimensions.xl_2};
  margin-bottom: ${dimensions.base};
  text-align: center;
`;

const Description = styled.p`
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
  margin-bottom: ${dimensions.base};
  text-align: center;
`;

export const InputISBN = styled.input`
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

const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: ${dimensions.base_2};
`;

const StyledButton = styled(Button)`
  :first-of-type {
    margin-right: ${dimensions.base};
  }
`;

export const WrapperInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 21.5rem;
  width: 100% - 100px;
  border: 0.5px solid #bdbdbd;
  border-radius: ${dimensions.xl_3};
  padding: 10px 0 10px ${dimensions.xs_1};
  margin: 0 ${dimensions.xs_1};
  background: ${colors.bg_secondary};

  :hover {
    border: 0.5px solid ${colors.accent_color};
  }

  :focus {
    border: 0.5px solid ${colors.accent_color};
  }

  @media (max-width: ${dimensions.tablet_width}) {
    width: 100%;
  }

  @media (max-width: ${dimensions.phone_width}) {
    width: 70%;
  }
`;

interface IProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValueInput: React.Dispatch<React.SetStateAction<string>>;
  claimBook: () => void;
}

const ClaimOperation: FC<IProps> = ({
  setActive,
  claimBook,
  value,
  setValueInput,
}) => {
  const handleChangeISBNInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const closeModal = () => {
    setActive(false);
    setValueInput('');
  };

  return (
    <Wrapper>
      <WrapperClaimOperation>
        <TitleOfClaim>Enter ISBN code</TitleOfClaim>
        <Description>
          Look at the back of the book for the code and write it in the box.
        </Description>
        <WrapperInput>
          <InputISBN
            value={value}
            type="number"
            onChange={handleChangeISBNInput}
            required
            placeholder="Enter ISBN code"
            minLength={10}
            maxLength={13}
          />
        </WrapperInput>
        <WrapperButtons>
          <StyledButton value="Claim a book" onClick={claimBook} />
          <StyledButton transparent value="Cancel" onClick={closeModal} />
        </WrapperButtons>
      </WrapperClaimOperation>
    </Wrapper>
  );
};

export default ClaimOperation;
