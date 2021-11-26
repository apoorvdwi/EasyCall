function socketIOServer(server, MAX_CAPACITY) {
  // initialise a Socket.io server

  const { allowedURLs } = require('./config');
  const io = require('socket.io')(server, {
    cors: {
      origin: allowedURLs,
    },
  });

  io.on('connection', (socket) => {
    console.log('Connection successful', socket.id);
    socket.on('Loaded', (data, data2) => {
      console.log(data, data2, MAX_CAPACITY);
    });
  });
}

module.exports = { socketIOServer };
