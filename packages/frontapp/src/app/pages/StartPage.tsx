import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '../hooks/useTypedDispatch';
import { setUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import Input from '../components/Input';

const StartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10.5rem;
`;

const Logo = styled.div`
  background-image: url('../../assets/Mimir.svg');
  width: 12.5rem;
  height: 17.2rem;
`;

const WelcomeHeader = styled.h1`
  font-family: ${fonts.secondary};
  font-weight: 600;
  font-size: ${dimensions.base_2};
  line-height: 2.6rem;
  color: ${colors.main_black};
  margin-top: ${dimensions.xs};
  margin-bottom: ${dimensions.base};
`;

const StartPageParagraph = styled.p`
  margin-top: 0;
  margin-bottom: ${dimensions.xl_3};
  font-weight: 300;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
`;

const WrapperForInputAndButton = styled.div`
  display: flex;
`;

const InputStart = styled(Input)`
  margin-right: ${dimensions.xs};
  padding-left: ${dimensions.xl};
  width: 20rem;
  height: 3.125rem;
  border: 1px solid #1a1ed6;
  box-sizing: border-box;
  border-radius: ${dimensions.xl_3};
  padding-top: 0.2rem;
  font-weight: 300;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};

  ::placeholder {
    font-weight: 400;
    font-size: ${dimensions.xl};
    line-height: ${dimensions.xl_2};
    color: ${colors.main_gray};
    opacity: 0.5;
    padding-left: ${dimensions.xl};
  }

  :focus {
    color: ${colors.main_black};
    outline: 0;
    box-shadow: 0 0 0 0.1rem ${colors.accent_color};
  }
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3.1rem;
  background: ${colors.accent_color};
  border-radius: ${dimensions.xl_3};
  border: none;
  font-weight: 700;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.bg_secondary};
  cursor: pointer;

  :hover {
    background: ${colors.hover_color};
  }

  :active {
    background: ${colors.pressed_color};
  }
`;

const StartPage: FC = () => {
  const history = useNavigate();
  const [username, setUsername] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const addUser = () => {
    dispatch(setUser(username));
    history('/home');
  };

  return (
    <StartPageWrapper>
      <Logo />
      <WelcomeHeader>Welcome to the library MIMIR</WelcomeHeader>
      <StartPageParagraph>Simplify the process of claim</StartPageParagraph>
      <WrapperForInputAndButton>
        <InputStart
          value={username}
          onChange={handleChangeInput}
          type="text"
          placeholder="Enter your username"
        />
        <LoginButton onClick={addUser}>Login</LoginButton>
      </WrapperForInputAndButton>
    </StartPageWrapper>
  );
};

export default StartPage;
