import React, { useContext, useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  BsInfoCircle,
  BsMicFill,
  BsMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
} from 'react-icons/bs';
import {
  MdPresentToAll,
  MdCancelPresentation,
  MdOutlineCallEnd,
} from 'react-icons/md';
import { BiChalkboard } from 'react-icons/bi';
import { IoIosPeople, IoMdChatboxes } from 'react-icons/io';
import { MeetingContext } from '../../context/meetingContext';
import { SocketContext } from '../../context/socketContext';

const Wrapper = styled.div`
  width: 60px;
  height: 90%;
  border-radius: 50px;
  position: absolute;
  right: 20px;
  background: #efcb68;
  border: 3px solid #000411;
  color: #000411;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  .control {
    width: 100%;
    cursor: pointer;
    ${(props) =>
    props.disabledProp
      ? `
  pointer-events: none;
  cursor: not-allowed;
  filter: opacity(0.5);
  `
      : ''}
  }
`;

const MeetSettingsBar = (props) => {
  const meetingContext = useContext(MeetingContext);
  const socketContext = useContext(SocketContext);
  const { toggleWhiteBoard } = socketContext;
  const history = useHistory();
  const {
    meeting,
    endMeeting,
    userAudio: audio,
    userVideo: video,
    toggleUserAudio,
    toggleUserVideo,
    toggleScreenShare,
    changePanelView,
    screenTrack,
  } = meetingContext;

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (meeting) setDisabled(false);
  }, [meeting]);

  return (
    <Wrapper disabledProp={disabled}>
      <Tooltip placement="left" title="Meeting Info">
        <span
          className="control"
          onClick={() => {
            changePanelView('info');
          }}
        >
          <BsInfoCircle size={30} />
        </span>
      </Tooltip>

      <Tooltip placement="left" title={`${audio ? 'Disable' : 'Enable'} Audio`}>
        <span className="control" onClick={toggleUserAudio}>
          {audio ? <BsMicFill size={30} /> : <BsMicMuteFill size={30} />}
        </span>
      </Tooltip>

      <Tooltip placement="left" title={`${video ? 'Disable' : 'Enable'} Video`}>
        <span className="control" onClick={toggleUserVideo}>
          {video ? (
            <BsCameraVideoFill size={30} />
          ) : (
            <BsCameraVideoOffFill size={30} />
          )}
        </span>
      </Tooltip>

      <Tooltip placement="left" title="Share Screen">
        <span
          id="shareScreenIcon"
          className="control"
          onClick={() => {
            toggleScreenShare();
          }}
        >
          {!screenTrack ? (
            <MdPresentToAll size={30} />
          ) : (
            <MdCancelPresentation size={30} />
          )}
        </span>
      </Tooltip>

      <Tooltip placement="left" title="WhiteBoard">
        <span
          className="control"
          onClick={() => {
            toggleWhiteBoard();
          }}
        >
          <BiChalkboard size={30} />
        </span>
      </Tooltip>

      <Tooltip placement="left" title="View Participants">
        <span
          className="control"
          onClick={() => {
            changePanelView('participants');
          }}
        >
          <IoIosPeople size={30} />
        </span>
      </Tooltip>

      <Tooltip placement="left" title="Chat">
        <span
          className="control"
          onClick={() => {
            changePanelView('chat');
          }}
        >
          <IoMdChatboxes size={30} />
        </span>
      </Tooltip>

      <Tooltip placement="left" title="End Call">
        <span
          className="control"
          onClick={() => {
            endMeeting();
            history.replace('/');
          }}
        >
          <MdOutlineCallEnd size={30} />
        </span>
      </Tooltip>
    </Wrapper>
  );
};

export default MeetSettingsBar;
