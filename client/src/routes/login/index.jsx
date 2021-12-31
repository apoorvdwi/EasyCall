import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import styled from 'styled-components';
import { UserContext } from '../../context/userContext';
import './styles.scss';
import Logo from '../../assets/logoDarkTransparentHorizhontal.png';
import VideoCall from '../../assets/Illustrations/home.png';

const Wrapper = styled.div`
  width: 100vw;
  padding: 25px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000411;
`;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e1efe6;
  padding: 40px;

  .leftContainer {
    display: flex;
    height: 100%;
    width: 50%;
    padding: 0 30px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
      height: 120px;
    }
  }

  .rightContainer {
    display: flex;
    height: 100%;
    width: 50%;
    flex-direction: column;
    align-items: center;
    justify-content: top;

    .videoIllus {
      height: 100%;
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
    }
  }
`;

const StyledLoginButton = styled(Button)`
  width: 60%;
  height: 70px;
  border-radius: 40px;
  font-family: 'Sora', sans-serif;
  background: #efcb68;
  color: #160c28;
  font-size: 25px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 10px;
  text-transform: none;
  border: 3px solid transparent;

  &:hover,
  &:focus,
  &:active {
    color: #160c28;
    background: #efcb68;
    border-color: unset;
  }

  &:hover {
    border: 3px solid #160c28;
  }
`;

const SubHeading = styled.span`
  font-family: 'Sora', sans-serif;
  width: 60%;
  font-size: 30px;
  font-weight: 600;
  margin: 30px auto;
  color: #160c28;
`;

const LoginPage = () => {
  const userContext = useContext(UserContext);
  const { signInWithGoogle, signInWithGithub } = userContext;
  return (
    <Wrapper>
      <LoginWrapper>
        <div className="leftContainer">
          <img className="logo" alt="logo" src={Logo} />
          <SubHeading>
            Meet, chat, call and collaborate in just one place.
          </SubHeading>
          <StyledLoginButton
            type="default"
            size="large"
            onClick={async () => {
              await signInWithGoogle();
            }}
          >
            <FaGoogle size={40} />
            &nbsp;&nbsp;Login with Google
          </StyledLoginButton>
          <StyledLoginButton
            type="default"
            size="large"
            onClick={async () => {
              await signInWithGithub();
            }}
          >
            <FaGithub size={40} />
            &nbsp;&nbsp;Login with Github
          </StyledLoginButton>
        </div>
        <div className="rightContainer">
          <img
            className="videoIllus"
            alt="video call illustration"
            src={VideoCall}
          />
        </div>
      </LoginWrapper>
    </Wrapper>
  );
};

export default LoginPage;
