import React, { useContext, useState } from 'react';
import { BsArrowRight, BsFillShareFill } from 'react-icons/bs';
import { MdOutlineExitToApp } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { Popover, Tooltip, Popconfirm } from 'antd';
import { RiChatNewLine } from 'react-icons/ri';
import { UserContext } from '../../context/userContext';
import { MessagingContext } from '../../context/messagingContext';
import {
  Heading,
  RecentMeetings,
  StyledSubmitButton,
  ChatContainer,
  TopDiv,
  InputWrapper,
  MessageInput,
  Message,
  ChatsWrapper,
  RightContainer,
  LeftContainer,
} from './components';
import { IoSendSharp } from 'react-icons/io5';
import { ReactComponent as Loader } from '../../assets/loader.svg';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { Collapse } from '@mui/material';

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
          {chatId ? (
            <Tooltip placement="right" title="Copy Chatroom Id">
              <BsFillShareFill
                onClick={shareChatRoom}
                style={{ cursor: 'pointer' }}
                size={30}
              />
            </Tooltip>
          ) : null}
          <Heading
            style={{
              width: '380px',
              justifyContent: 'center',
              textOverflow: 'ellipsis',
              display: 'block',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {chatId ? user.chats[chatId] : ''}
          </Heading>
          {chatId ? (
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
          ) : null}
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
