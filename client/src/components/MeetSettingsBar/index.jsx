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
  BsRecordCircleFill,
} from 'react-icons/bs';
import {
  MdPresentToAll,
  MdCancelPresentation,
  MdOutlineCallEnd,
} from 'react-icons/md';
import { BiChalkboard } from 'react-icons/bi';
import { IoIosPeople, IoMdChatboxes } from 'react-icons/io';
import { MeetingContext } from '../../context/meetingContext';

const Wrapper = styled.div`
  width: 60px;
  height: 95%;
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
  `
      : ''}
  }
`;

const MeetSettingsBar = (props) => {
  const meetingContext = useContext(MeetingContext);
  const history = useHistory();
  const {
    meeting,
    endMeeting,
    userAudio: audio,
    userVideo: video,
    toggleUserAudio,
    toggleUserVideo,
    changePanelView,
  } = meetingContext;

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (meeting) setDisabled(false);
  }, [meeting]);

  const [options] = useState([
    {
      name: 'info',
      icon: <BsInfoCircle size={30} />,
      description: 'Meeting Info',
    },
    {
      name: 'audio',
      icon: <BsMicFill size={30} />,
      disabledIcon: <BsMicMuteFill size={30} />,
      description: 'Disable Audio',
      disabledDescription: 'Enable Audio',
    },
    {
      name: 'video',
      icon: <BsCameraVideoFill size={30} />,
      disabledIcon: <BsCameraVideoOffFill size={30} />,
      description: 'Disable Video',
      disabledDescription: 'Enable Video',
    },
    {
      name: 'screenshare',
      icon: <MdPresentToAll size={30} />,
      disabledIcon: <MdCancelPresentation size={30} />,
      description: 'Disable Screenshare',
      disabledDescription: 'Enable Screenshare',
    },
    {
      name: 'record',
      icon: <BsRecordCircleFill size={30} />,
      description: 'Record meeting',
    },
    {
      name: 'whiteboard',
      icon: <BiChalkboard size={30} />,
      description: 'Open Whiteboard',
    },
    // {
    //   name: 'filters',
    //   icon: <IoColorFilterOutline size={30} />,
    //   description: 'Apply Video Filters',
    // },
    {
      name: 'participants',
      icon: <IoIosPeople size={30} />,
      description: 'View Participants',
    },
    {
      name: 'chat',
      icon: <IoMdChatboxes size={30} />,
      description: 'Open Chat',
    },
    {
      name: 'endcall',
      icon: <MdOutlineCallEnd size={30} />,
      description: 'End Call',
      onClick: () => {
        endMeeting();
        history.replace('/');
      },
    },
  ]);

  return (
    <Wrapper disabledProp={disabled}>
      <Tooltip placement="left" title="Meeting Info">
        <span className="control">
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
        <span className="control" onClick={() => {}}>
          <MdPresentToAll size={30} />
        </span>
      </Tooltip>

      <Tooltip placement="left" title="Record Meeting">
        <span className="control" onClick={() => {}}>
          <BsRecordCircleFill size={30} />
        </span>
      </Tooltip>

      <Tooltip placement="left" title="WhiteBoard">
        <span className="control" onClick={() => {}}>
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
        <span className="control" onClick={() => {}}>
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
