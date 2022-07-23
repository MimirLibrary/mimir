import React, { FC } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import { colors, dimensions } from '@mimir/ui-kit';
import claimPicture from '../../../assets/ClaimABook.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 100%;

  span {
    color: ${colors.accent_color};
  }
`;

const StyledButton = styled(Button)`
  width: 50%;
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

const WrapperButtons = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.active ? 'space-between' : 'center')};
  align-items: center;
  width: 100%;
  margin-top: ${dimensions.base_2};
`;

interface IPropsErrorMessage {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  message: string | null;
  title: string;
  onClick?: () => void;
  onSubmitClick?: () => void;
  titleCancel: string;
  activeAskManager?: boolean;
  showContentOfDonate?: () => void;
  titleOption?: string;
}

const ErrorMessage: FC<IPropsErrorMessage> = ({
  setActive,
  message,
  title,
  onClick,
  titleCancel,
  activeAskManager = true,
  showContentOfDonate,
  titleOption,
  onSubmitClick,
}) => {
  const closeModal = () => {
    setActive(false);
    if (showContentOfDonate) {
      showContentOfDonate();
    }
  };

  return (
    <Wrapper>
      <WrapperErrorClaim>
        <WrapperInfo>
          <TitleOfError>{title}</TitleOfError>
          <Description>
            {message || 'Take another book or try contacting the manager'}
          </Description>
          <div>
            <img src={claimPicture} alt="error to claim" />
          </div>
        </WrapperInfo>
        <WrapperButtons active={activeAskManager}>
          <StyledButton
            value={titleOption || 'Ok'}
            onClick={onSubmitClick ? onSubmitClick : closeModal}
          />
          {activeAskManager && (
            <StyledButton
              value={titleCancel || 'Cancel'}
              transparent
              onClick={onClick ? onClick : closeModal}
            />
          )}
        </WrapperButtons>
      </WrapperErrorClaim>
    </Wrapper>
  );
};

export default ErrorMessage;
