function meetingSocketIOServer(server, MAX_CAPACITY) {
  // initialise a Socket.io server

  const { allowedURLs } = require('./config');
  const addMessageToFirebase = require('./util');
  const io = require('socket.io')(server, {
    path: '/meet-socket/',
    cors: {
      origin: allowedURLs,
    },
  });

  const socketsInMeeting = {};
  const usersInMeeting = {};

  io.on('connection', (socket) => {
    socket.on('join-meeting', ({ meetId, user }) => {
      if (
        socketsInMeeting[meetId]?.includes(socket.id) ||
        usersInMeeting[meetId]?.find((u) => u.id === user.id)
      ) {
        socket.emit('user-already-joined');
        return;
      }

      if (
        socketsInMeeting[meetId]?.length === MAX_CAPACITY ||
        usersInMeeting[meetId]?.length === MAX_CAPACITY
      ) {
        socket.emit('meeting-full');
        return;
      }

      user.socketId = socket.id;

      if (socketsInMeeting[meetId]) {
        socketsInMeeting[meetId].push(socket.id);
      } else {
        socketsInMeeting[meetId] = [socket.id];
      }

      socket.join(meetId);

      if (usersInMeeting[meetId]) {
        const item = usersInMeeting[meetId]?.find((u) => u.id === user.id);
        if (!item) usersInMeeting[meetId].push(user);
      } else {
        usersInMeeting[meetId] = [user];
      }

      io.sockets
        .in(meetId)
        .emit('updated-users-list', {
          usersInThisMeeting: usersInMeeting[meetId],
        });
    });

    socket.on('whiteboard', ({ meetId, user }) => {
      io.sockets.in(meetId).emit('whiteboard', { meetId, user });
    });

    socket.on('send-message', ({ meetId, chatId, chat }) => {
      addMessageToFirebase(chatId, chat);
      socket.to(meetId).emit('receive-message', { chat });
    });

    socket.on('disconnect', () => {
      const meetings = Object.keys(socketsInMeeting);
      meetings.forEach((meetingId) => {
        if (socketsInMeeting[meetingId].includes(socket.id)) {
          const remainingUsers = socketsInMeeting[meetingId].filter(
            (u) => u !== socket.id,
          );
          const remainingUserObj = usersInMeeting[meetingId].filter(
            (u) => u.socketId !== socket.id,
          );

          socketsInMeeting[meetingId] = remainingUsers;
          usersInMeeting[meetingId] = remainingUserObj;

          io.sockets.in(meetingId).emit('updated-users-list', {
            usersInThisMeeting: usersInMeeting[meetingId],
          });
        }
      });
    });
  });
}

function chatSocketIOServer(server) {
  // initialise a Socket.io server

  const { allowedURLs } = require('./config');
  const addMessageToFirebase = require('./util');
  const io = require('socket.io')(server, {
    path: '/chat-socket/',
    cors: {
      origin: allowedURLs,
    },
  });

  const socketsInChatRoom = {};
  const usersInChatRoom = {};

  io.on('connection', (socket) => {
    socket.on('join-chatroom', ({ chatRoomId, user }) => {
      if (
        socketsInChatRoom[chatRoomId]?.includes(socket.id) ||
        usersInChatRoom[chatRoomId]?.find((u) => u.id === user.id)
      ) {
        socket.emit('user-already-joined');
        return;
      }

      user.socketId = socket.id;

      if (socketsInChatRoom[chatRoomId]) {
        socketsInChatRoom[chatRoomId].push(socket.id);
      } else {
        socketsInChatRoom[chatRoomId] = [socket.id];
      }

      socket.join(chatRoomId);

      if (usersInChatRoom[chatRoomId]) {
        const item = usersInChatRoom[chatRoomId]?.find((u) => u.id === user.id);
        if (!item) usersInChatRoom[chatRoomId].push(user);
      } else {
        usersInChatRoom[chatRoomId] = [user];
      }
    });

    socket.on('send-message', ({ chatRoomId, chatId, chat }) => {
      addMessageToFirebase(chatId, chat);
      socket.to(chatRoomId).emit('receive-message', { chat });
    });

    socket.on('disconnect', () => {
      const meetings = Object.keys(socketsInChatRoom);
      meetings.forEach((chatRoomId) => {
        if (socketsInChatRoom[chatRoomId].includes(socket.id)) {
          const remainingUsers = socketsInChatRoom[chatRoomId].filter(
            (u) => u !== socket.id,
          );
          const remainingUserObj = usersInChatRoom[chatRoomId].filter(
            (u) => u.socketId !== socket.id,
          );

          socketsInChatRoom[chatRoomId] = remainingUsers;
          usersInChatRoom[chatRoomId] = remainingUserObj;
        }
      });
    });
  });
}

module.exports = { meetingSocketIOServer, chatSocketIOServer };
