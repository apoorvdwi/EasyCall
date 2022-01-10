import React, { useContext } from 'react';
import styled from 'styled-components';
import { SocketContext } from '../../context/socketContext';
import { MeetingContext } from '../../context/meetingContext';
import { MdOutlineContentCopy } from 'react-icons/md';
import { useSnackbar } from 'notistack';
import { Collapse } from '@mui/material';

const Wrapper = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 20px 10px;
  border-radius: 20px;

  &::-webkit-scrollbar {
    width: 10px;
    background: #e1efe6;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #aeb7b3;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #000411;
  }
`;

export const Heading = styled.h2`
  font-family: 'Sora', sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: #000411;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  border-radius: 10px;
  background: #000411;
  font-family: 'Sora', sans-serif;
  color: #fff;

  .heading {
    font-size: 17px;
    margin-bottom: 10px;
  }

  .data {
    font-size: 11.5px;
    text-overflow: ellipsis;
    text-align: left;
  }
`;

const MeetingInfo = () => {
  const { enqueueSnackbar } = useSnackbar();
  const socketContext = useContext(SocketContext);
  const meetingContext = useContext(MeetingContext);
  const { usersList } = socketContext;
  const { meetId } = meetingContext;
  return (
    <Wrapper>
      <Heading>Meeting Details</Heading>
      <ContentWrapper>
        <span className="heading">Meeting ID</span>
        <span className="data">{meetId}</span>
      </ContentWrapper>
      <ContentWrapper>
        <span className="heading">Meeting Link</span>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span className="data">{window.location.href}</span>
          <MdOutlineContentCopy
            style={{ marginRight: '10px', cursor: 'pointer' }}
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
    </Wrapper>
  );
};

export default MeetingInfo;
