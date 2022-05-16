import React, { useContext, useState } from 'react';
import { MeetingContext } from '../../context/meetingContext';
import { UserContext } from '../../context/userContext';
import { SocketContext } from '../../context/socketContext';
import { IoSendSharp } from 'react-icons/io5';
import {
  Wrapper,
  ChatsWrapper,
  Message,
  InputWrapper,
  MessageInput,
  StyledSubmitButton,
} from './components';

const MeetChat = () => {
  const meetingContext = useContext(MeetingContext);
  const userContext = useContext(UserContext);
  const socketContext = useContext(SocketContext);
  const { sendMessage } = socketContext;
  const [messageData, setMessageData] = useState('');
  const { user } = userContext;
  const modifiedUserObject = {
    displayName: user.displayName,
    id: user.id,
  };
  const { meetingChats } = meetingContext;
  return (
    meetingChats && (
      <Wrapper>
        <ChatsWrapper>
          {meetingChats.map((chat) => {
            const name = chat.user.displayName;
            return (
              <Message me={chat.user.id === user.id}>
                <span>{chat.user.id === user.id ? 'You' : name}</span>
                <p>{chat.message.body}</p>
              </Message>
            );
          })}
        </ChatsWrapper>
        <InputWrapper
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(messageData, modifiedUserObject);
            setMessageData('');
          }}
        >
          <MessageInput
            value={messageData}
            onChange={(e) => {
              setMessageData(e.target.value);
            }}
            placeholder="Start Typing ...."
          />
          <StyledSubmitButton htmlType="submit">
            <IoSendSharp size={20} />
          </StyledSubmitButton>
        </InputWrapper>
      </Wrapper>
    )
  );
};

export default MeetChat;
