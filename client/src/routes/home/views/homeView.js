import React, { useState, useContext } from 'react';
import { BsCameraVideo, BsArrowRightShort } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { Collapse } from '@mui/material';
import { MdGroups } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { checkIfRoomExists } from '../../../utils/twilioUtils';
import { ClientContext } from '../../../context';

import {
  Heading,
  SubHeading,
  StyledInput,
  StyledSubmitButton,
} from '../components';

const HomeView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const context = useContext(ClientContext);
  const { setMeetId } = context;
  const [newMeetName, setNewMeetName] = useState('');
  const [joinMeetId, setJoinMeetId] = useState('');
  const history = useHistory();

  const joinMeeting = async (roomId) => {
    // check if rooms exists and join the room
    const roomExistsData = await checkIfRoomExists(roomId);
    if (roomExistsData.roomExists) {
      setMeetId(roomId);
      history.push(`/meet/${roomId}`);
    } else {
      enqueueSnackbar('Room requested was not found !!', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        TransitionComponent: Collapse,
        variant: 'error',
      });
    }
  };

  const createMeeting = () => {
    // create room and join the room
    const roomId = uuidv4();
    setMeetId(roomId);
    history.push(`/meet/${roomId}`);
  };

  return (
    <>
      <div className="left">
        <div className="option">
          <Heading>
            <BsCameraVideo size={40} />
            &nbsp;&nbsp;Create Meeting
          </Heading>
          <div className="content">
            <SubHeading>Create your own Meeting</SubHeading>
            <StyledInput
              value={newMeetName}
              onChange={(e) => {
                setNewMeetName(e.target.value);
              }}
              placeholder="Meeting Name (Optional)"
            />
            <StyledSubmitButton type="default" size="large">
              Create
              <BsArrowRightShort size={30} />
            </StyledSubmitButton>
          </div>
        </div>
        <div className="option">
          <Heading>
            <MdGroups size={40} />
            &nbsp;&nbsp;Join Meeting
          </Heading>
          <div className="content">
            <SubHeading>Join meeting by meet ID</SubHeading>
            <StyledInput
              value={joinMeetId}
              onChange={(e) => {
                setJoinMeetId(e.target.value);
              }}
              placeholder="Meeting ID (Required)"
            />
            <StyledSubmitButton
              onClick={() => {
                joinMeeting(joinMeetId);
              }}
              disabled={!joinMeetId}
              type="default"
              size="large"
            >
              Join
              <BsArrowRightShort size={30} />
            </StyledSubmitButton>
          </div>
        </div>
      </div>
      <div className="right">
        <Heading>
          <AiFillClockCircle size={30} />
          &nbsp;Recent Meetings
        </Heading>
      </div>
    </>
  );
};

export default HomeView;
