import React from 'react';
import styled from 'styled-components';
import ParticipantList from '../ParticipantsList';

const Wrapper = styled.div`
  height: 100%;
  width: 24%;
  border-left: 3px solid #160c28;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
`;

const MeetInfo = (props) => {
  return (
    <Wrapper>
      <ParticipantList />
    </Wrapper>
  );
};

export default MeetInfo;
