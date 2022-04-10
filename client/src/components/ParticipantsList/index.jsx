import React, { useContext } from 'react';
import { SocketContext } from '../../context/socketContext';
import { Wrapper, Heading, Participant } from './components';

const ParticipantList = () => {
  const socketContext = useContext(SocketContext);
  const { usersList } = socketContext;
  return (
    <Wrapper>
      <Heading>Participants</Heading>
      {usersList.map((participant) => (
        <Participant key={participant.id}>
          {participant.displayName}
        </Participant>
      ))}
    </Wrapper>
  );
};

export default ParticipantList;
