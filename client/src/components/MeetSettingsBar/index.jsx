import React, { useState } from 'react';
import { Tooltip } from 'antd';
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
  MdScreenShare,
  MdStopScreenShare,
  MdOutlineCallEnd,
} from 'react-icons/md';
import { BiChalkboard } from 'react-icons/bi';
import { IoIosPeople, IoMdChatboxes } from 'react-icons/io';
import { IoColorFilterOutline } from 'react-icons/io5';

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
`;

const MeetSettingsBar = (props) => {
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
      icon: <MdScreenShare size={30} />,
      disabledIcon: <MdStopScreenShare size={30} />,
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
    {
      name: 'filters',
      icon: <IoColorFilterOutline size={30} />,
      description: 'Apply Video Filters',
    },
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
    },
  ]);

  return (
    <Wrapper>
      {options.map((option, index) => {
        const name = option.name;
        let icon = option.icon;
        let description = option.description;
        if (name in props) {
          icon = props[name] ? option.icon : option.disabledIcon;
          description = props[name]
            ? option.description
            : option.disabledDescription;
        }
        return (
          <Tooltip placement="left" title={description}>
            <span style={{ width: '100%' }} key={index}>
              {icon}
            </span>
          </Tooltip>
        );
      })}
    </Wrapper>
  );
};

export default MeetSettingsBar;
