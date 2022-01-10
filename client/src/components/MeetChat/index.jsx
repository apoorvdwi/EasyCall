import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { MeetingContext } from '../../context/meetingContext';
import { UserContext } from '../../context/userContext';
import { SocketContext } from '../../context/socketContext';
import { IoSendSharp } from 'react-icons/io5';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

const ChatsWrapper = styled.div`
  width: 100%;
  max-height: calc(100% - 60px);
  min-height: calc(100% - 60px);
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
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

const Message = styled.div`
  width: auto;
  max-width: 95%;
  padding: 5px 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 25px;
  background: #000411;
  font-family: 'Sora', sans-serif;
  color: #fff;

  p {
    font-size: 12px;
    max-width: 100%;
    overflow-wrap: break-word;
    ${(props) =>
    props.me
      ? `
    text-align: right;`
      : `
    text-align: left;`}
  }

  ${(props) =>
    props.me
      ? `
    align-items: flex-end;
    align-self: flex-end;`
      : `
    align-items: flex-start;
    align-self: flex-start;`}

  span {
    font-size: 15px;
  }
`;

const MessageInput = styled(Input)`
  width: calc(100%-8px) !important;
  font-size: 17px;
  margin-right: 8px;
  outline: none;
  border-color: #160c28;
  border-radius: 10px;
  background: #e1efe6;
  font-family: 'Sora', sans-serif;
  border: 2px solid #160c28;

  &:hover,
  &:focus,
  &:active {
    color: #160c28;
    background: #e1efe6;
    border: 2px solid #160c28;
    box-shadow: none;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  position: sticky;
  padding: 10px;
  bottom: 0;
  left: 0;
  display: flex;
`;

const StyledSubmitButton = styled(Button)`
  height: 40px;
  border-radius: 20px;
  font-family: 'Sora', sans-serif;
  background: #efcb68;
  color: #160c28;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;

  &:hover,
  &:focus,
  &:active {
    color: #160c28;
    background: #efcb68;
    border-color: unset;
  }

  &:hover {
    border: 2px solid #160c28;
  }
`;

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
        <InputWrapper>
          <MessageInput
            value={messageData}
            onChange={(e) => {
              setMessageData(e.target.value);
            }}
            placeholder="Start Typing ...."
          />
          <StyledSubmitButton
            onClick={() => {
              sendMessage(messageData, modifiedUserObject);
              setMessageData('');
            }}
          >
            <IoSendSharp size={20} />
          </StyledSubmitButton>
        </InputWrapper>
      </Wrapper>
    )
  );
};

export default MeetChat;
