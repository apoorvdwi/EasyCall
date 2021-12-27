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
  const [optionState, setOptionState] = useState({
    audio: false,
    video: false,
    screenshare: false,
  });
  return (
    <Wrapper infoView={props.infoView}>
      <button
        onClick={() => {
          setOptionState({ ...optionState, audio: !optionState.audio });
        }}
      >
        Toggle Audio
      </button>
      <button
        onClick={() => {
          setOptionState({ ...optionState, video: !optionState.video });
        }}
      >
        Toggle Video
      </button>
      <button
        onClick={() => {
          setOptionState({
            ...optionState,
            screenshare: !optionState.screenshare,
          });
        }}
      >
        Toggle Screenshare
      </button>
      {props.children}
      <MeetSettingsBar {...optionState} />
    </Wrapper>
  );
};

export default MeetContainer;
