import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { BsArrowRight, BsFillShareFill } from 'react-icons/bs';
import { MdOutlineExitToApp } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { Button, Input, Popover, Tooltip, Popconfirm } from 'antd';
import { RiChatNewLine } from 'react-icons/ri';
import { UserContext } from '../../../context/userContext';
import { MessagingContext } from '../../../context/messagingContext';
import { Heading, RecentMeetings } from '../components';
import { IoSendSharp } from 'react-icons/io5';
import { ReactComponent as Loader } from '../../../assets/loader.svg';
import { db } from '../../../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { Collapse } from '@mui/material';
import './styles.scss';

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  border-radius: 20px;
  background-color: #aeb7b3;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  border-radius: 20px;
  background-color: #aeb7b3;
  position: relative;
`;

const ChatsWrapper = styled.div`
  width: 100%;
  max-height: calc(90% - 60px);
  min-height: calc(90% - 60px);
  overflow-y: auto;
  padding: 10px 15px;
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

const InputWrapper = styled.form`
  width: 100%;
  position: sticky;
  padding: 5px 10px 10px;
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

const TopDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 30px 0;
  justify-content: space-between;
  align-items: center;
`;

const ChatContainer = styled.div`
  padding: 20px;
  width: 100%;
  max-height: 90%;
  overflow-y: auto;
`;

const MessageView = () => {
  const userContext = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const messagingContext = useContext(MessagingContext);
  const [messageData, setMessageData] = useState('');
  const [joinChat, setJoinChat] = useState('');
  const [createNewChat, setCreateNewChat] = useState('');
  const [localLoading, setLocalLoading] = useState({
    join: false,
    create: false,
  });
  const [joinChatRoomVisible, setJoinChatRoomVisible] = useState(false);
  const [createChatRoomVisible, setCreateChatRoomVisible] = useState(false);
  const { user } = userContext;
  const { chatId, setChatId, activeChats, setActiveChats, sendMessage } =
    messagingContext;

  const joinChatRoom = async () => {
    setLocalLoading((prevValue) => ({ ...prevValue, join: true }));
    const chatRef = doc(db, 'chats', joinChat);
    const chatSnapshot = await getDoc(chatRef);

    if (chatSnapshot.exists()) {
      const chatDetails = chatSnapshot.data();
      const userRef = doc(db, 'users', user.id);

      let updatedChatIds = user.chats ? user.chats : [];

      if (!(joinChat in updatedChatIds)) {
        updatedChatIds = {
          ...updatedChatIds,
          [joinChat]: chatDetails.chatRoomTitle
            ? chatDetails.chatRoomTitle
            : joinChat,
        };
      }

      await updateDoc(userRef, {
        chats: updatedChatIds,
      });
      setJoinChat('');
      setLocalLoading((prevValue) => ({ ...prevValue, join: false }));
    } else {
      setJoinChat('');
      setLocalLoading((prevValue) => ({ ...prevValue, join: false }));
      enqueueSnackbar('Chat room with given ID does not exists', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        preventDuplicate: true,
        TransitionComponent: Collapse,
        variant: 'error',
      });
    }
    setJoinChatRoomVisible(false);
  };

  const createChatRoom = async (newChatId) => {
    setLocalLoading((prevValue) => ({ ...prevValue, create: true }));
    const chatRef = doc(db, 'chats', newChatId);

    await setDoc(chatRef, {
      chatRoomTitle: createNewChat ? createNewChat : newChatId,
      messages: [],
      createdAt: new Date(),
      meetingId: null,
    });

    const userRef = doc(db, 'users', user.id);

    let updatedChatIds = user.chats ? user.chats : [];

    if (!(newChatId in updatedChatIds)) {
      updatedChatIds = {
        ...updatedChatIds,
        [newChatId]: createNewChat ? createNewChat : newChatId,
      };
    }

    await updateDoc(userRef, {
      chats: updatedChatIds,
    });
    setCreateNewChat('');
    setLocalLoading((prevValue) => ({ ...prevValue, create: false }));
    setCreateChatRoomVisible(false);
  };

  const shareChatRoom = () => {
    navigator.clipboard.writeText(chatId).then(() => {
      enqueueSnackbar('Chat ID copied to clipboard', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        TransitionComponent: Collapse,
        variant: 'success',
      });
    });
  };

  const leaveChatRoom = async () => {
    const userRef = doc(db, 'users', user.id);

    const updatedChatIds = user.chats ? user.chats : [];

    if (chatId in updatedChatIds) {
      delete updatedChatIds[chatId];
    }

    await updateDoc(userRef, {
      chats: updatedChatIds,
    });
    setActiveChats(null);
    setChatId(null);
  };

  const joinChatPopOverContent = (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await joinChatRoom();
        }}
        style={{ display: 'flex' }}
      >
        <MessageInput
          value={joinChat}
          onChange={(e) => {
            setJoinChat(e.target.value);
          }}
          placeholder="ChatRoom ID"
        />
        <StyledSubmitButton
          loading={localLoading && localLoading.join}
          htmlType="submit"
        >
          <BsArrowRight size={20} />
        </StyledSubmitButton>
      </form>
    </>
  );

  const createNewChatPopOverContent = (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createChatRoom(uuidv4());
        }}
        style={{ display: 'flex' }}
      >
        <MessageInput
          value={createNewChat}
          onChange={(e) => {
            setCreateNewChat(e.target.value);
          }}
          placeholder="ChatRoom Name"
        />
        <StyledSubmitButton
          loading={localLoading && localLoading.create}
          htmlType="submit"
        >
          <AiOutlinePlus size={20} />
        </StyledSubmitButton>
      </form>
    </>
  );

  return (
    <>
      <LeftContainer>
        <TopDiv>
          <Popover
            visible={createChatRoomVisible}
            overlayClassName="addChatPopover"
            placement="bottomLeft"
            trigger="click"
            content={createNewChatPopOverContent}
          >
            <Tooltip placement="right" title="Create new chatroom">
              <AiOutlinePlus
                onClick={() => {
                  setCreateChatRoomVisible((prevValue) => !prevValue);
                }}
                style={{ cursor: 'pointer' }}
                size={30}
              />
            </Tooltip>
          </Popover>
          <Heading>Chats</Heading>
          <Popover
            visible={joinChatRoomVisible}
            overlayClassName="addChatPopover"
            placement="bottomRight"
            trigger="click"
            content={joinChatPopOverContent}
          >
            <Tooltip placement="left" title="Join chatroom">
              <RiChatNewLine
                onClick={() => {
                  setJoinChatRoomVisible((prevValue) => !prevValue);
                }}
                style={{ cursor: 'pointer' }}
                size={30}
              />
            </Tooltip>
          </Popover>
        </TopDiv>
        <ChatContainer>
          {user.chats
            ? Object.keys(user.chats).map((chatRoomId, index) => {
              return (
                <RecentMeetings
                  key={index}
                  onClick={() => {
                    if (chatRoomId !== chatId) setActiveChats(null);
                    setChatId(chatRoomId);
                  }}
                >
                  {user.chats[chatRoomId]}
                  <BsArrowRight size={30} />
                </RecentMeetings>
              );
            })
            : null}
        </ChatContainer>
      </LeftContainer>
      <RightContainer>
        <TopDiv>
          <Tooltip placement="right" title="Copy Chatroom Id">
            <BsFillShareFill
              onClick={shareChatRoom}
              style={{ cursor: 'pointer' }}
              size={30}
            />
          </Tooltip>
          <Heading
            style={{
              width: '400px',
              justifyContent: 'center',
              textOverflow: 'ellipsis',
              display: 'block',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {chatId ? user.chats[chatId] : ''}
          </Heading>
          <Popconfirm
            overlayClassName="leaveChat"
            placement="bottomLeft"
            title="Leave ChatRoom ?"
            onConfirm={leaveChatRoom}
          >
            <Tooltip placement="right" title="Leave Chatroom">
              <MdOutlineExitToApp style={{ cursor: 'pointer' }} size={40} />
            </Tooltip>
          </Popconfirm>
        </TopDiv>
        {chatId ? (
          <>
            <ChatsWrapper>
              {activeChats || activeChats?.length === 0 ? (
                activeChats.map((chat) => {
                  const name = chat.user.displayName;
                  return (
                    <Message me={chat.user.id === user.id}>
                      <span>{chat.user.id === user.id ? 'You' : name}</span>
                      <p>{chat.message.body}</p>
                    </Message>
                  );
                })
              ) : (
                <Loader />
              )}
            </ChatsWrapper>
            <InputWrapper
              onSubmit={(e) => {
                e.preventDefault();
                const modifiedUserObject = {
                  displayName: user.displayName,
                  id: user.id,
                };
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
          </>
        ) : null}
      </RightContainer>
    </>
  );
};

export default MessageView;
