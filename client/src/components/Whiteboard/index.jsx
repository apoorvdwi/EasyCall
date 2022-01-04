import React, { useContext } from 'react';
import styled from 'styled-components';
import { MeetingContext } from '../../context/meetingContext';

const randomstring = require('randomstring');

const StyledIframe = styled.iframe`
  height: 90%;
  width: calc(75% - 100px);
  border-radius: 20px;
  border: 5px #000411 solid;
`;

const WhiteBoard = () => {
  const meetingContext = useContext(MeetingContext);
  const { meetingDetails } = meetingContext;

  return meetingDetails && meetingDetails.whiteBoardUrl ? (
    <StyledIframe
      src={meetingDetails.whiteBoardUrl}
      name="whiteboard"
      title="whiteboard"
      scrolling="no"
    />
  ) : null;
};

export default WhiteBoard;
