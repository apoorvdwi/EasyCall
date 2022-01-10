function socketIOServer(server, MAX_CAPACITY) {
  // initialise a Socket.io server

  const { allowedURLs } = require('./config');
  const addMessageToFirebase = require('./util');
  const io = require('socket.io')(server, {
    cors: {
      origin: allowedURLs,
    },
  });

  const socketsInMeeting = {};
  const usersInMeeting = {};

  io.on('connection', (socket) => {
    console.log('Connection successful', socket.id);

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
        .emit('updated-users-list', { usersInThisMeeting: usersInMeeting[meetId] });
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

module.exports = { socketIOServer };
