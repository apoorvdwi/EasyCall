import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MeetingContext } from '../../context/meetingContext';

const StyledVideo = styled.video`
  height: 90%;
  width: calc(76% - 80px);
  border-radius: 20px;
  border: 5px #000411 solid;
`;

const SharedScreen = () => {
  const meetingContext = useContext(MeetingContext);
  const { screenTrack } = meetingContext;
  const screenRef = useRef();

  useEffect(() => {
    if (screenTrack) {
      screenTrack.attach(screenRef.current);
    }

    return () => {
      if (screenTrack) {
        screenTrack.detach();
      }
    };
  }, [screenTrack]);

  return screenTrack && <StyledVideo ref={screenRef} autoPlay />;
};

export default SharedScreen;
