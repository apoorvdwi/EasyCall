import React, { useContext } from 'react';
import styled from 'styled-components';
import { SocketContext } from '../../context/socketContext';
import { MeetingContext } from '../../context/meetingContext';
import { MdOutlineContentCopy } from 'react-icons/md';
import { useSnackbar } from 'notistack';
import { Collapse } from '@mui/material';
import { InfoWrapper, Heading, ContentWrapper } from './components';

const MeetingInfo = () => {
  const { enqueueSnackbar } = useSnackbar();
  const socketContext = useContext(SocketContext);
  const meetingContext = useContext(MeetingContext);
  const { usersList } = socketContext;
  const { meetId } = meetingContext;
  return (
    <InfoWrapper>
      <Heading>Meeting Details</Heading>
      <ContentWrapper>
        <span className="heading">Meeting ID</span>
        <span className="data">{meetId}</span>
      </ContentWrapper>
      <ContentWrapper>
        <span className="heading">Meeting Link</span>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            maxWidth: '100%',
          }}
        >
          <span className="data">{window.location.href}</span>
          <MdOutlineContentCopy
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href).then(() => {
                enqueueSnackbar('Meeting Link copied', {
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                  },
                  TransitionComponent: Collapse,
                  variant: 'success',
                });
              });
            }}
            size={35}
          />
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <span className="heading">Participants</span>
        <span className="data">{usersList.length}</span>
      </ContentWrapper>
    </InfoWrapper>
  );
};

export default MeetingInfo;
