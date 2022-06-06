import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import { ReactComponent as Cross } from '../../../assets/Close.svg';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useClaimBookMutation } from '@mimir/apollo-client';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 14fr 1fr;
  justify-items: center;
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

const InputISBN = styled.input`
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

const WrapperCross = styled.div`
  margin-top: -7px;
  cursor: pointer;
  justify-self: flex-end;
`;

const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: ${dimensions.base_2};
`;

const StyledButton = styled(Button)`
  cursor: pointer;

  :hover {
    background-color: ${colors.hover_color};
    color: ${colors.bg_primary};
  }
  :first-of-type {
    margin-right: ${dimensions.base};
  }
`;

const WrapperInput = styled.div`
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
}

const ClaimOperation: FC<IProps> = ({ setActive }) => {
  const [claimBook, { data, loading }] = useClaimBookMutation();
  const { id } = useAppSelector((state) => state.user);
  const [valueIsISBN, setValueIsISBN] = useState<string>('');

  const handleChangeISBNInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueIsISBN(e.target.value);
  };

  const closeModal = () => {
    setActive(false);
  };

  const handleClaimBook = () => {
    claimBook({
      variables: {
        person_id: id,
        identifier: valueIsISBN,
      },
    });
    setValueIsISBN('');
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
            value={valueIsISBN}
            type="number"
            onChange={handleChangeISBNInput}
            required
            placeholder="Enter ISBN code"
            minLength={10}
            maxLength={13}
          />
        </WrapperInput>
        <WrapperButtons>
          <StyledButton value="Claim a book" onClick={handleClaimBook} />
          <StyledButton transparent value="Cancel" onClick={closeModal} />
        </WrapperButtons>
      </WrapperClaimOperation>
      <WrapperCross>
        <Cross
          fill={`${colors.accent_color}`}
          width={43}
          height={43}
          onClick={closeModal}
        />
      </WrapperCross>
    </Wrapper>
  );
};

export default ClaimOperation;
