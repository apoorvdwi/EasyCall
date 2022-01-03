import React, { useContext } from 'react';
import styled from 'styled-components';
import MeetSettingsBar from '../MeetSettingsBar';
import { MeetingContext } from '../../context/meetingContext';

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  align-content: center;
  padding-right: 80px;
  flex-wrap: wrap;
  ${(props) =>
    props.infoView
      ? `
  width: 76%;
  `
      : `
  width: 100%;`}
`;

const MeetContainer = (props) => {
  const meetingContext = useContext(MeetingContext);
  const { panelView } = meetingContext;
  return (
    <Wrapper infoView={panelView}>
      {props.children}
      <MeetSettingsBar />
    </Wrapper>
  );
};

export default MeetContainer;
