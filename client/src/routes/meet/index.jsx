import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import { Collapse } from '@mui/material';
import { useHistory } from 'react-router-dom';
import MeetContainer from '../../components/MeetContainer';
import MeetInfo from '../../components/MeetInfo';
import { checkIfRoomExists } from '../../utils/twilioUtils';
import WhiteBoard from '../../components/Whiteboard';
import { MeetingContext } from '../../context/meetingContext';

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
  const { enqueueSnackbar } = useSnackbar();
  const meetingContext = useContext(MeetingContext);
  const { meetId, setMeetId } = meetingContext;
  const history = useHistory();
  const [view, setView] = useState(true);

  useEffect(() => {
    const meetIdProp = props.match.params.meetId;
    // const roomExistsData = await checkIfRoomExists(meetIdProp);
    // if (roomExistsData.roomExists) {
    //   setMeetId(meetIdProp);
    // } else {
    //   enqueueSnackbar(
    //     'Room requested was not found !! Redirecting to Dashboard',
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

  return (
    <Wrapper>
      <MeetWrapper>
        <MeetContainer infoView={view}>
          <button
            onClick={() => {
              setView(!view);
            }}
          >
            Click to view Info
          </button>
          {/* <WhiteBoard /> */}
        </MeetContainer>
        {view ? <MeetInfo /> : null}
      </MeetWrapper>
    </Wrapper>
  );
};

export default Meet;
