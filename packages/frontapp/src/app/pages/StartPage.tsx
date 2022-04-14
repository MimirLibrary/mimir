import React, {FC, useState} from 'react';
import styled from "@emotion/styled";
import {useAppDispatch} from "../hooks/useTypedDispatch";
import {setUser} from "../redux/slices/userSlice";

const StartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 168px;
`;

const Logo = styled.div`
  background-image: url("../../assets/Mimir.svg");
  width: 200px;
  height: 275px
`

const WelcomeHeader = styled.h1`
  font-family: 'Bitter';
  font-weight: 600;
  font-size: 35px;
  line-height: 42px;
  color: #333333;
  margin-top: 10px;
  margin-bottom: 15px
`

const StartPageParagraph = styled.p`
  margin-top: 0;
  margin-bottom: 30px;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: #333333;
`

const WrapperForInputAndButton = styled.div`
  display: flex;
`

const Input = styled.input`
  margin-right: 10px;
  width: 350px;
  height: 50px;
  border: 1px solid #1A1ED6;
  box-sizing: border-box;
  border-radius: 30px;

  ::placeholder {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #BDBDBD;
    padding-left: 20px;
  }

  :focus {
    padding-left: 20px;
    color: #000000;
    outline: 0;
    box-shadow: 0 0 0 0.1rem #1A1ED6;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
  }
`

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 50px;
  background: #1A1ED6;
  border-radius: 30px;
  border: none;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
  cursor: pointer;

  :hover {
    background: #14168F;
  }

  :active {
    background: #07097B;
  }
`

const StartPage: FC = () => {
  const [username, setUsername] = useState<string>('')
  const dispatch = useAppDispatch()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const addUser = () => {
    dispatch(setUser(username))
  }

  return (
    <StartPageWrapper>
      <Logo/>
      <WelcomeHeader>
        Welcome to the library MIMIR
      </WelcomeHeader>
      <StartPageParagraph>
        Simplify the process of claim
      </StartPageParagraph>
      <WrapperForInputAndButton>
        <Input value={username} onChange={handleChangeInput} type="text" placeholder="Enter your username"/>
        <LoginButton onClick={addUser}>Login</LoginButton>
      </WrapperForInputAndButton>
    </StartPageWrapper>
  );
}

export default StartPage;
