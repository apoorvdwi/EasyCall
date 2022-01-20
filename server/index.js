const express = require('express');
const http = require('http');
const cors = require('cors');
const config = require('./src/config');
const twilio = require('./src/twilio');
const { meetingSocketIOServer, chatSocketIOServer } = require('./src/socket');

const app = express();
app.set('port', process.env.PORT || 5000);

app.use(cors({ origin: config.allowedURLs, methods: ['GET', 'POST'] }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const MAX_CAPACITY = 2;

app.get('/', (req, res) => {
  res.send('Welcome to EasyCall Backend Service');
});

app.use('/twilio', twilio);

const server = http.createServer(app);

meetingSocketIOServer(server, MAX_CAPACITY);
chatSocketIOServer(server);

server.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});

module.exports = app;
