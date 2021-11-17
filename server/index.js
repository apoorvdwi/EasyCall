const express = require('express');
const http = require('http');
let io = require('socket.io');
const cors = require('cors');

const app = express();
app.set('port', process.env.PORT || 5000);

app.use(
  cors({
    origin: '*',
  }),
);

app.options('*', cors());

const server = http.createServer(app);
io = io(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Connection successful', socket.id);
  socket.on('Loaded', (data, data2) => {
    console.log(data, data2);
  });
});

server.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});

module.exports = app;
