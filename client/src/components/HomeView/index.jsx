import React, { useState, useContext } from 'react';
import { BsCameraVideo, BsArrowRightShort, BsArrowRight } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { Collapse } from '@mui/material';
import { MdGroups } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { checkIfMeetingExists } from '../../utils/twilioUtils';
import { UserContext } from '../../context/userContext';
import { MeetingContext } from '../../context/meetingContext';
import { generateWhiteBoardUrl } from '../../utils';

import {
  Heading,
  SubHeading,
  StyledInput,
  StyledSubmitButton,
  RecentMeetings,
} from './components';

import { db } from '../../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

const HomeView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const userContext = useContext(UserContext);
  const meetingContext = useContext(MeetingContext);
  const { setMeetId } = meetingContext;
  const { user } = userContext;
  const [newMeetName, setNewMeetName] = useState('');
  const [joinMeetId, setJoinMeetId] = useState('');
  const [localLoading, setLocalLoading] = useState({
    create: false,
    join: false,
  });
  const history = useHistory();

  const joinMeeting = async (meetingId) => {
    // check if meeting exists and join the meeting
    setLocalLoading({ ...localLoading, join: true });
    const meetingExistsData = await checkIfMeetingExists(meetingId);
    if (meetingExistsData.meetingExists) {
      setMeetId(meetingId);
      history.push(`/meet/${meetingId}`);
    } else {
      setLocalLoading({ ...localLoading, join: false });
      enqueueSnackbar('Meeting requested was not found !!', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        TransitionComponent: Collapse,
        variant: 'error',
      });
    }
  };

  const createMeeting = async () => {
    // create meeting and join the meeting
    setLocalLoading({ ...localLoading, create: true });
    const meetingId = uuidv4();
    const chatId = uuidv4();
    const meetingRef = doc(db, 'meetings', meetingId);
    const chatRef = doc(db, 'chats', chatId);
    await setDoc(chatRef, {
      chatRoomTitle: newMeetName ? newMeetName : chatId,
      messages: [],
      createdAt: new Date(),
      meetingId,
    });
    const whiteBoardUrl = generateWhiteBoardUrl();
    await setDoc(meetingRef, {
      meetingTitle: newMeetName ? newMeetName : meetingId,
      createdAt: new Date(),
      createdBy: user.id,
      whiteBoardUrl,
      chatId,
    });
    setMeetId(meetingId);
    const userRef = doc(db, 'users', user.id);
    let updatedMeetingData = user.meetings ? user.meetings : {};
    let updatedChatIds = user.chats ? user.chats : [];

    if (!(chatId in updatedChatIds)) {
      updatedChatIds = {
        ...updatedChatIds,
        [chatId]: newMeetName ? newMeetName : chatId,
      };
    }

    if (!(meetingId in updatedMeetingData)) {
      updatedMeetingData = {
        ...updatedMeetingData,
        [meetingId]: newMeetName ? newMeetName : meetingId,
      };
    }
    await updateDoc(userRef, {
      meetings: updatedMeetingData,
      chats: updatedChatIds,
    });

    setLocalLoading({ ...localLoading, create: false });
    history.push(`/meet/${meetingId}`);
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
            <StyledSubmitButton
              loading={localLoading.create}
              onClick={() => {
                createMeeting();
              }}
              type="default"
              size="large"
            >
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
              loading={localLoading.join}
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
        <Heading style={{ marginBottom: '15px' }}>
          <AiFillClockCircle size={30} />
          &nbsp;Recent Meetings
        </Heading>
        {user.meetings
          ? Object.keys(user.meetings).map((meetingId, index) => {
            return (
              <RecentMeetings
                key={index}
                onClick={() => {
                  history.push(`/meet/${meetingId}`);
                }}
              >
                {user.meetings[meetingId]}
                <BsArrowRight size={30} />
              </RecentMeetings>
            );
          })
          : null}
      </div>
    </>
  );
};

export default HomeView;
