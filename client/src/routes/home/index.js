import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as Loader } from '../../assets/loader.svg';
import { ClientContext } from '../../context';

const Wrapper = styled.div`
  width: 100vw;
  padding: 45px;
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
  justify-content: center;
  align-items: center;
  background-color: #e1efe6;
  padding: 40px;
`;

const HomePage = () => {
  const context = useContext(ClientContext);
  const { signOutUser } = context;
  return (
    <Wrapper>
      <LoginWrapper>
        <button
          onClick={async () => {
            await signOutUser();
          }}
        >
          Signout
        </button>
      </LoginWrapper>
    </Wrapper>
  );
};

export default HomePage;
