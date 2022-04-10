import React, { useContext } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { UserContext } from '../../context/userContext';
import Logo from '../../assets/logoDarkTransparentHorizhontal.png';
import VideoCall from '../../assets/Illustrations/home.png';
import {
  Wrapper,
  LoginWrapper,
  StyledLoginButton,
  SubHeading,
} from './components';

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
