import React, { useContext } from 'react';
import ParticipantList from '../ParticipantsList';
import MeetChat from '../MeetChat';
import MeetingInfo from './infoView';
import { MeetingContext } from '../../context/meetingContext';
import { Wrapper } from './components';

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
