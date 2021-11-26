import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

const MeetWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e1efe6;
  position: relative;
`;

const Meet = (props) => {
  const [meetId, setMeetId] = useState(props.match.params.meetId);

  useEffect(() => {
    setMeetId(props.match.params.meetId);
  }, [props]);

  return (
    <Wrapper>
      <MeetWrapper>hello</MeetWrapper>
    </Wrapper>
  );
};

export default Meet;
