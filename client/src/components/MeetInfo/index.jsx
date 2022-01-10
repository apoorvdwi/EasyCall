import React, { useContext } from 'react';
import styled from 'styled-components';
import ParticipantList from '../ParticipantsList';
import MeetChat from '../MeetChat';
import MeetingInfo from './infoView';
import { MeetingContext } from '../../context/meetingContext';

const Wrapper = styled.div`
  height: 100%;
  width: 24%;
  border-left: 3px solid #160c28;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
`;

const MeetInfo = () => {
  const meetingContext = useContext(MeetingContext);
  const { panelView } = meetingContext;
  return (
    <Wrapper>
      {panelView === 'chat' ? <MeetChat /> : null}
      {panelView === 'participants' ? <ParticipantList /> : null}
      {panelView === 'info' ? <MeetingInfo /> : null}
    </Wrapper>
  );
};

export default MeetInfo;
