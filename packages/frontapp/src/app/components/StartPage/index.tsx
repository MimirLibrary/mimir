import React, {FC, useState} from 'react';
import styled from "@emotion/styled";
import {useAppDispatch} from "../../hooks/useTypedDispatch";
import {setUser} from "../../redux/slices/userSlice";

const StyledStartPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 168px;
`;

const StyledStartImage = styled.div`
  background-image: url("../../../assets/Mimir.svg");
  width: 200px;
  height: 275px
`

const StyledWelcomeHeader = styled.h1`
  font-family: 'Bitter';
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  line-height: 42px;
  color: #333333;
  margin-top: 10px;
  margin-bottom: 15px
`

const StyledStartPageParagraph = styled.p`
  margin-top: 0;
  margin-bottom: 30px;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: #333333;
`

const WrapperForInputAndButton = styled.div`
  display: flex;
  justify-content: center;
`

const StyledInput = styled.input`
  margin-right: 10px;
  width: 350px;
  height: 50px;
  border: 1px solid #1A1ED6;
  box-sizing: border-box;
  border-radius: 30px;
  order: 0;
  flex-grow: 0;

  ::placeholder {
    font-style: normal;
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
    box-shadow: 0 0 0 0.1rem rgba(37, 76, 176, 0.99);
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
  }
`

const StyledLoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: static;
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
    <StyledStartPage>
      <StyledStartImage />
      <StyledWelcomeHeader>
        Welcome to the library MIMIR
      </StyledWelcomeHeader>
      <StyledStartPageParagraph>
        Simplify the process of claim
      </StyledStartPageParagraph>
      <WrapperForInputAndButton>
        <StyledInput value={username} onChange={handleChangeInput} type="text" placeholder="Enter your username" />
        <StyledLoginButton onClick={addUser}>Login</StyledLoginButton>
      </WrapperForInputAndButton>
    </StyledStartPage>
  );
}

export default StartPage;
