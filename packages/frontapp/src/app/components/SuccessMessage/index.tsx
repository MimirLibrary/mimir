import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import successClaim from '../../../assets/SuccessClaim.png';
import successOperation from '../../../assets/SuccessOperation.png';
import Button from '../Button';
import { parseDate } from '../../models/helperFunctions/converTime';
import { UserOperationType } from '../../types/operationType';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperSuccessClaim = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 346px;
  width: 100%;
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

  span {
    color: ${colors.accent_color};
  }
`;

const ReturnDate = styled.div`
  width: fit-content;
  padding: ${dimensions.xs_2};
  margin-bottom: ${dimensions.base_2};
  background: ${colors.bg_own_claim};
  color: ${colors.accent_color};
  border-radius: ${dimensions.xs_2};
  font-size: ${dimensions.xl};
  font-weight: 600;
`;

const WrapperImg = styled.div`
  margin-bottom: ${dimensions.xs_2};
`;

interface IPropsSuccessClaim {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  returnDate?: string;
  description?: string;
  onCloseContentDonate?: () => void;
  operation?: UserOperationType;
}

const SuccessMessage: FC<IPropsSuccessClaim> = ({
  setActive,
  title,
  returnDate,
  description,
  onCloseContentDonate,
  operation,
}) => {
  const closeModal = () => {
    setActive(false);
    if (onCloseContentDonate) {
      onCloseContentDonate();
    }
  };

  const isOperationClaimOrProlong =
    operation === UserOperationType.CLAIM ||
    operation === UserOperationType.PROLONG;

  const trueFormatReturnDate = returnDate
    ? parseDate(new Date(returnDate))
    : '';

  return (
    <Wrapper>
      <WrapperSuccessClaim>
        <TitleOfClaim>{title}</TitleOfClaim>
        {description && <Description>{description}</Description>}
        <WrapperImg>
          <img
            src={isOperationClaimOrProlong ? successClaim : successOperation}
            alt="success claim"
          />
        </WrapperImg>
        {returnDate && <ReturnDate> {trueFormatReturnDate}</ReturnDate>}
        <Button value="Finish" onClick={closeModal} />
      </WrapperSuccessClaim>
    </Wrapper>
  );
};

export default SuccessMessage;
