import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as Cross } from '../../../assets/Close.svg';
import { colors, dimensions } from '@mimir/ui-kit';
import successImg from '../../../assets/Success.svg';
import Button from '../Button';
import { getDates, parseDate } from '../../models/helperFunctions/converTime';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 14fr 1fr;
  justify-items: center;
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

const WrapperCross = styled.div`
  margin-top: -7px;
  cursor: pointer;
  justify-self: flex-end;
`;

const WrapperImg = styled.div`
  margin-bottom: ${dimensions.base_2};
`;

interface IPropsSuccessClaim {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  created_at?: Date;
  description?: string;
}

const SuccessMessage: FC<IPropsSuccessClaim> = ({
  setActive,
  title,
  created_at,
  description,
}) => {
  const closeModal = () => {
    setActive(false);
  };

  const { returnDate } = getDates(created_at!);
  const trueFormatReturnDate = parseDate(returnDate);

  return (
    <Wrapper>
      <WrapperSuccessClaim>
        <TitleOfClaim>{title}</TitleOfClaim>
        {description && (
          <Description>
            {description}
            {created_at && <span> {trueFormatReturnDate}!</span>}
          </Description>
        )}
        <WrapperImg>
          <img src={successImg} alt="success claim" />
        </WrapperImg>
        <Button value="Finish" onClick={closeModal} />
      </WrapperSuccessClaim>
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

export default SuccessMessage;
