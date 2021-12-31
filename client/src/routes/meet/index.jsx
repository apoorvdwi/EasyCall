import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import { Collapse } from '@mui/material';
import { useHistory } from 'react-router-dom';
import MeetContainer from '../../components/MeetContainer';
import MeetInfo from '../../components/MeetInfo';
import { checkIfMeetingExists, getAccessToken } from '../../utils/twilioUtils';
import WhiteBoard from '../../components/Whiteboard';
import { MeetingContext } from '../../context/meetingContext';
import { UserContext } from '../../context/userContext';
import { ReactComponent as Loader } from '../../assets/loader.svg';
import Participant from '../../components/Participant';

const Wrapper = styled.div`
  width: 100vw;
  padding: 25px;
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
  const { enqueueSnackbar } = useSnackbar();
  const meetingContext = useContext(MeetingContext);
  const userContext = useContext(UserContext);
  const {
    meetId,
    setMeetId,
    accessToken,
    setAccessToken,
    meeting,
    setMeeting,
    connectToMeeting,
    isConnecting,
    participantConnected,
    participantDisconnected,
    participants,
    leaveMeeting,
  } = meetingContext;
  const { user } = userContext;
  const history = useHistory();
  const [view, setView] = useState(false);

  useEffect(() => {
    const meetIdProp = props.match.params.meetId;
    // const meetingExistsData = await checkIfMeetingExists(meetIdProp);
    // if (meetExistsData.meetingExists) {
    //   setMeetId(meetIdProp);
    // } else {
    //   enqueueSnackbar(
    //     'meeting requested was not found !! Redirecting to Dashboard',
    //     {
    //       anchorOrigin: {
    //         vertical: 'top',
    //         horizontal: 'center',
    //       },
    //       TransitionComponent: Collapse,
    //       variant: 'error',
    //     },
    //   );
    //   setTimeout(() => {
    //     history.replace('/');
    //   }, 2000);
    // }
    setMeetId(meetIdProp);
  }, [props]);

  useEffect(() => {
    const getAndSetAccessToken = async () => {
      const AccessToken = await getAccessToken(user.id);
      if (AccessToken) {
        setAccessToken(AccessToken);
      } else {
        enqueueSnackbar(
          'Access Token could not be generated !! Redirecting to Dashboard',
          {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            TransitionComponent: Collapse,
            variant: 'error',
          },
        );
        setTimeout(() => {
          history.replace('/');
        }, 2000);
      }
    };

    getAndSetAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      connectToMeeting(accessToken, meetId, setMeeting);
    }
  }, [accessToken]);

  useEffect(() => {
    leaveMeeting();
    if (meeting) {
      meeting.on('participantConnected', participantConnected);
      meeting.on('participantDisconnected', participantDisconnected);
      meeting.participants.forEach(participantConnected);
    }

    return () => {
      meeting?.off('participantConnected', participantConnected);
      meeting?.off('participantDisconnected', participantDisconnected);
    };
  }, [meeting]);

  const remoteParticipants = participants?.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <Wrapper>
      <MeetWrapper>
        <MeetContainer infoView={view}>
          {/* <button
            onClick={() => {
              setView(!view);
            }}
          >
            Click to view Info
          </button> */}
          {isConnecting ? <Loader /> : null}
          {!isConnecting && meeting ? (
            <>
              <Participant
                key={meeting.localParticipant.sid}
                participant={meeting.localParticipant}
              />
              {remoteParticipants}
            </>
          ) : null}
          {/* <WhiteBoard /> */}
        </MeetContainer>
        {view ? <MeetInfo /> : null}
      </MeetWrapper>
    </Wrapper>
  );
};

export default Meet;
