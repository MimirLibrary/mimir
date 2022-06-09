import React, { FC } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as Cross } from '../../../assets/Close.svg';
import claimPicture from '../../../assets/ClaimABook.svg';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 15fr 1fr;
  justify-items: center;
  width: 100%;
`;

const WrapperErrorClaim = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TitleOfError = styled.h3`
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

  span {
    color: ${colors.accent_color};
  }
`;

const WrapperCross = styled.div`
  margin-top: -7px;
  cursor: pointer;
  justify-self: flex-end;
`;

const StyledButton = styled(Button)`
  :first-of-type {
    margin-right: ${dimensions.base};
  }
`;

const WrapperInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  max-width: 346px;
  width: 100%;
`;

const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: ${dimensions.base_2};
`;

interface IPropsErrorMessage {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  message: string | null;
}

const ErrorMessage: FC<IPropsErrorMessage> = ({ setActive, message }) => {
  const closeModal = () => {
    setActive(false);
  };

  return (
    <Wrapper>
      <WrapperErrorClaim>
        <WrapperInfo>
          <TitleOfError>Something goes wrong with your claiming</TitleOfError>
          <Description>
            {message || 'Take another book or try contacting the manager'}
          </Description>
          <div>
            <img src={claimPicture} alt="error to claim" />
          </div>
        </WrapperInfo>
        <WrapperButtons>
          <StyledButton value="Ok" onClick={closeModal} />
          <StyledButton value="Ask a manager" transparent />
        </WrapperButtons>
      </WrapperErrorClaim>
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

export default ErrorMessage;
