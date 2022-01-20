import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import io from 'socket.io-client';
import { UserContext } from './userContext';
import moment from 'moment';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const MessagingContext = createContext();

const MessagingProvider = ({ children }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [chatId, setChatId] = useState(null);
  const [activeChats, setActiveChats] = useState(null);
  const socketRef = useRef(null);
  const socketConnected = useRef(false);

  useEffect(() => {
    const execute = async () => {
      if (chatId) {
        const chatRef = doc(db, 'chats', chatId);
        const chatDoc = await getDoc(chatRef);
        const sortedChats = chatDoc.data()?.messages.sort((first, second) => {
          const firstDate = moment(first.createdAt).valueOf();
          const secondDate = moment(second.createdAt).valueOf();
          let ans = 0;
          if (firstDate === secondDate) ans = 0;
          else if (firstDate < secondDate) ans = -1;
          else ans = 1;

          return ans;
        });

        if (sortedChats) setActiveChats(sortedChats);
        else setActiveChats([]);
      }
    };

    execute();
  }, [chatId]);

  useEffect(() => {
    if (chatId && !socketConnected.current) {
      socketRef.current = io(process.env.REACT_APP_SERVER_BASE_URL, {
        path: '/chat-socket/',
      });
      socketConnected.current = true;
      joinChatRoom();
      receiveMessages();
    } else if (chatId && socketConnected.current) {
      socketRef.current.disconnect();
      socketConnected.current = false;
      socketRef.current = io(process.env.REACT_APP_SERVER_BASE_URL, {
        path: '/chat-socket/',
      });
      socketConnected.current = true;
      joinChatRoom();
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

  const joinChatRoom = () => {
    socketRef.current.emit('join-chatroom', { chatId, user });
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
      chatId,
      chat,
    });
  };

  const receiveMessages = () => {
    socketRef.current.on('receive-message', ({ chat }) => {
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
    activeChats,
    setActiveChats,
  };

  return (
    <MessagingContext.Provider value={contextProps}>
      {children}
    </MessagingContext.Provider>
  );
};

export { MessagingProvider, MessagingContext };
