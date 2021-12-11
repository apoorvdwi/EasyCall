const express = require('express');
const twilio = require('twilio');
const config = require('./config');

const router = express.Router();

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const videoToken = (identity, config) => {
  const videoGrant = new VideoGrant();
  const token = new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret,
  );
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

router.post('/token', (req, res) => {
  const identity = req.body.identity;
  const token = videoToken(identity, config);
  res.send({
    accessToken: token.toJwt(),
  });
});

router.post('/room-exists', (req, res) => {
  const roomId = req.body.roomId;
  const client = twilio(config.twilio.accountSid, config.twilio.authToken);

  console.log('/room-exists', roomId);

  client.video
    .rooms(roomId)
    .fetch()
    .then((room) => {
      if (room) {
        res.send({
          roomExists: true,
          room,
        });
      } else {
        res.send({
          roomExists: false,
        });
      }
    })
    .catch((err) => {
      res.send({
        roomExists: false,
        err,
      });
    });
});

module.exports = router;
