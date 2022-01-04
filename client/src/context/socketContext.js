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
  const { meetId, panelView, participantUserDetails, setParticipantWidth } =
    meetingContext;
  const [isWhiteBoardView, setIsWhiteBoardView] = useState(false);
  const socketRef = useRef(null);
  const socketConnected = useRef(false);

  useEffect(() => {
    if (meetId && !socketConnected.current) {
      socketRef.current = io(process.env.REACT_APP_SERVER_BASE_URL);
      socketConnected.current = true;
      joinRoom();
      listenToWhiteBoard();
    }
  }, [meetId]);

  useEffect(() => {
    if (isWhiteBoardView) {
      setParticipantWidth(95);
    } else {
      const widthObject = panelView
        ? { 1: 50, 2: 46, 3: 46, 4: 46, default: 31 }
        : { 1: 50, 2: 47, default: 31 };
      const participantCount = participantUserDetails.length;

      setParticipantWidth(widthObject[participantCount] || widthObject.default);
    }
  }, [panelView, participantUserDetails, isWhiteBoardView]);

  useEffect(() => {
    const cleanup = (event) => {
      if (event.persisted) {
        return;
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
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
      window.location.href = '/';
    });

    socketRef.current.on('user-already-joined', () => {
      window.location.href = '/';
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

  const toggleWhiteBoard = () => {
    if (isWhiteBoardView) {
      setIsWhiteBoardView(false);
    } else {
      socketRef.current.emit('whiteboard', { meetId, user });
      setIsWhiteBoardView(true);
    }
  };

  const contextProps = {
    socketRef,
    socketConnected,
    toggleWhiteBoard,
    isWhiteBoardView,
    setIsWhiteBoardView,
  };

  return (
    <SocketContext.Provider value={contextProps}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
