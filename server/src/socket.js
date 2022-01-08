function socketIOServer(server, MAX_CAPACITY) {
  // initialise a Socket.io server

  const { allowedURLs } = require('./config');
  const addMessageToFirebase = require('./util');
  const io = require('socket.io')(server, {
    cors: {
      origin: allowedURLs,
    },
  });

  const socketsInRoom = {};
  const usersInRoom = {};

  io.on('connection', (socket) => {
    console.log('Connection successful', socket.id);

    socket.on('join-room', ({ meetId, user }) => {
      if (
        socketsInRoom[meetId]?.includes(socket.id) ||
        usersInRoom[meetId]?.find((u) => u.id === user.id)
      ) {
        socket.emit('user-already-joined');
        return;
      }

      if (
        socketsInRoom[meetId]?.length === MAX_CAPACITY ||
        usersInRoom[meetId]?.length === MAX_CAPACITY
      ) {
        socket.emit('room-full');
        return;
      }

      user.socketId = socket.id;

      if (socketsInRoom[meetId]) {
        socketsInRoom[meetId].push(socket.id);
      } else {
        socketsInRoom[meetId] = [socket.id];
      }

      socket.join(meetId);

      if (usersInRoom[meetId]) {
        const item = usersInRoom[meetId]?.find((u) => u.id === user.id);
        if (!item) usersInRoom[meetId].push(user);
      } else {
        usersInRoom[meetId] = [user];
      }

      io.sockets
        .in(meetId)
        .emit('updated-users-list', { usersInThisRoom: usersInRoom[meetId] });
    });

    socket.on('whiteboard', ({ meetId, user }) => {
      io.sockets.in(meetId).emit('whiteboard', { meetId, user });
    });

    socket.on('send-message', ({ meetId, chatId, chat }) => {
      addMessageToFirebase(chatId, chat);
      socket.to(meetId).emit('receive-message', { chat });
    });

    socket.on('disconnect', () => {
      const rooms = Object.keys(socketsInRoom);
      rooms.forEach((roomId) => {
        if (socketsInRoom[roomId].includes(socket.id)) {
          const remainingUsers = socketsInRoom[roomId].filter(
            (u) => u !== socket.id,
          );
          const remainingUserObj = usersInRoom[roomId].filter(
            (u) => u.socketId !== socket.id,
          );

          socketsInRoom[roomId] = remainingUsers;
          usersInRoom[roomId] = remainingUserObj;

          io.sockets.in(roomId).emit('updated-users-list', {
            usersInThisRoom: usersInRoom[roomId],
          });
        }
      });
    });
  });
}

module.exports = { socketIOServer };
