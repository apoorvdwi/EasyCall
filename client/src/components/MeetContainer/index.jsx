import React, { useState } from 'react';
import styled from 'styled-components';
import MeetSettingsBar from '../MeetSettingsBar';

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => props.infoView
    ? `
  width: 76%;
  `
    : `
  width: 100%;`}
`;

const MeetContainer = (props) => {
  return (
    <Wrapper infoView={props.infoView}>
      {props.children}
      <MeetSettingsBar />
    </Wrapper>
  );
};

export default MeetContainer;
