import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import io from 'socket.io-client';
import { UserContext } from './userContext';

const MessagingContext = createContext();

const MessagingProvider = ({ children }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [chatId, setChatId] = useState(null);
  const [activeChats, setActiveChats] = useState(null);
  const socketRef = useRef(null);
  const socketConnected = useRef(false);

  useEffect(() => {
    if (chatId && !socketConnected.current) {
      socketRef.current = io(process.env.REACT_APP_SERVER_BASE_URL);
      socketConnected.current = true;
      joinMeeting();
      receiveMessages();
    }
  }, [chatId]);

  useEffect(() => {
    const cleanup = (event) => {
      if (event.persisted) {
        return;
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketConnected.current = false;
      }
    };

    if (socketRef.current) {
      window.addEventListener('beforeunload', cleanup);
      return () => {
        window.removeEventListener('beforeunload', cleanup);
      };
    }
  }, [chatId, socketRef.current]);

  const joinMeeting = () => {
    socketRef.current.emit('join-chatGroup', { chatId, user });
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

    socketRef.current.emit('send-message-dashboard', {
      chatId,
      chat,
    });
  };

  const receiveMessages = () => {
    socketRef.current.on('receive-message-dashboard', ({ chat }) => {
      addChat(chat);
    });
  };

  const addChat = (message) => {
    setActiveChats((chats) => [...chats, message]);
  };

  const contextProps = {
    socketRef,
    socketConnected,
    sendMessage,
    receiveMessages,
    chatId,
    setChatId,
  };

  return (
    <MessagingContext.Provider value={contextProps}>
      {children}
    </MessagingContext.Provider>
  );
};

export { MessagingProvider, MessagingContext };
