import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import io from 'socket.io-client';
import { UserContext } from './userContext';
import { useSnackbar } from 'notistack';
import { MeetingContext } from './meetingContext';
import { Collapse } from '@mui/material';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const userContext = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const meetingContext = useContext(MeetingContext);
  const { user } = userContext;
  const {
    meetId,
    meetingDetails,
    panelView,
    setParticipantWidth,
    endMeeting,
    meeting,
    screenTrack,
    toggleScreenShare,
    setMeetingChats,
  } = meetingContext;
  const [isWhiteBoardView, setIsWhiteBoardView] = useState(false);
  const [screenToDisplay, setScreenToDisplay] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const socketRef = useRef(null);
  const socketConnected = useRef(false);

  useEffect(() => {
    if (meetId && !socketConnected.current) {
      socketRef.current = io(process.env.REACT_APP_SERVER_BASE_URL);
      socketConnected.current = true;
      joinRoom();
      listenToParticipantUpdates();
      listenToWhiteBoard();
      receiveMessages();
    }
  }, [meetId]);

  useEffect(() => {
    if (isWhiteBoardView && screenTrack) {
      setScreenToDisplay((prevScreen) => {
        let newScreen = '';
        if (prevScreen === 'sharedScreen') {
          toggleScreenShare();
          newScreen = 'whiteBoard';
        } else {
          toggleWhiteBoard();
          newScreen = 'sharedScreen';
        }
        return newScreen;
      });
    } else if (isWhiteBoardView) {
      setScreenToDisplay('whiteBoard');
    } else if (screenTrack) {
      setScreenToDisplay('sharedScreen');
    } else {
      setScreenToDisplay(null);
    }
  }, [isWhiteBoardView, screenTrack]);

  useEffect(() => {
    if (screenToDisplay) {
      setParticipantWidth(100);
    } else {
      const widthObject = panelView
        ? { 1: 50, 2: 46, 3: 46, 4: 46, default: 31 }
        : { 1: 50, 2: 47, default: 31 };
      const participantCount = usersList.length;

      setParticipantWidth(widthObject[participantCount] || widthObject.default);
    }
  }, [panelView, usersList, screenToDisplay]);

  useEffect(() => {
    const cleanup = (event) => {
      if (event.persisted) {
        return;
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketConnected.current = false;
        setIsWhiteBoardView(false);
      }
    };

    if (socketRef.current) {
      window.addEventListener('beforeunload', cleanup);
      return () => {
        window.removeEventListener('beforeunload', cleanup);
      };
    }
  }, [meetId, socketRef.current]);

  const joinRoom = () => {
    socketRef.current.emit('join-room', { meetId, user });

    socketRef.current.on('room-full', () => {
      if (meeting) endMeeting();
      enqueueSnackbar('This room is full, please join a different room', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        preventDuplicate: true,
        TransitionComponent: Collapse,
        variant: 'error',
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    });

    socketRef.current.on('user-already-joined', () => {
      if (meeting) endMeeting();
      enqueueSnackbar(
        "It looks like you're already in this room. You cannot join the same room twice",
        {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          preventDuplicate: true,
          TransitionComponent: Collapse,
          variant: 'error',
        },
      );
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    });
  };

  const listenToWhiteBoard = () => {
    socketRef.current.on('whiteboard', ({ user: userStarted }) => {
      if (!isWhiteBoardView && userStarted.id !== user.id) {
        enqueueSnackbar(`${userStarted.displayName} started using whiteboard`, {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          preventDuplicate: true,
          TransitionComponent: Collapse,
          variant: 'info',
        });
      }
    });
  };

  const listenToParticipantUpdates = () => {
    socketRef.current.on('updated-users-list', ({ usersInThisRoom }) => {
      setUsersList(usersInThisRoom);
    });
  };

  const toggleWhiteBoard = () => {
    if (isWhiteBoardView) {
      setIsWhiteBoardView(false);
    } else {
      socketRef.current.emit('whiteboard', { meetId, user });
      setIsWhiteBoardView(true);
    }
  };

  const sendMessage = (body, user) => {
    if (body === '') return;
    const chat = {
      user,
      message: {
        body,
        time: new Date(),
      },
    };
    addChat(chat);

    socketRef.current.emit('send-message', {
      meetId,
      chatId: meetingDetails.chatId,
      chat,
    });
  };

  const receiveMessages = () => {
    socketRef.current.on('receive-message', ({ chat }) => {
      addChat(chat);
    });
  };

  const addChat = (message) => {
    setMeetingChats((chats) => [...chats, message]);
  };

  const contextProps = {
    socketRef,
    socketConnected,
    toggleWhiteBoard,
    isWhiteBoardView,
    setIsWhiteBoardView,
    usersList,
    setUsersList,
    screenToDisplay,
    sendMessage,
    receiveMessages,
  };

  return (
    <SocketContext.Provider value={contextProps}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
