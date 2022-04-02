import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Loader } from '../../assets/loader.svg';

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

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e1efe6;
  padding: 40px;
`;

const LoadingPage = () => {
  return (
    <Wrapper>
      <LoadingWrapper>
        <Loader />
      </LoadingWrapper>
    </Wrapper>
  );
};

export default LoadingPage;
