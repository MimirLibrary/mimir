import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as Cross } from '../../../assets/Close.svg';
import { colors, dimensions } from '@mimir/ui-kit';
import successImg from '../../../assets/Succes.png';
import Button from '../Button';

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

const StyledButton = styled(Button)`
  cursor: pointer;
  :hover {
    background-color: ${colors.hover_color};
    color: ${colors.bg_primary};
  }
`;

const WrapperImg = styled.div`
  margin-bottom: ${dimensions.base_2};
`;

interface IPropsSuccessClaim {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  created_at: Date;
}

export const SuccessClaim: FC<IPropsSuccessClaim> = ({ setActive }) => {
  const closeModal = () => {
    setActive(false);
  };

  return (
    <Wrapper>
      <WrapperSuccessClaim>
        <TitleOfClaim>You have successfully claim the book</TitleOfClaim>
        <Description>
          Enjoy reading and don't forget to return this by{' '}
          <span>04.30.2022!</span>
        </Description>
        <WrapperImg>
          <img src={successImg} alt="success claim" />
        </WrapperImg>
        <StyledButton value="Finish" onClick={closeModal} />
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
