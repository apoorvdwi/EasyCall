const express = require('express');
const twilio = require('twilio');
const config = require('./config');

const router = express.Router();

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const generateToken = (config) => {
  return new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret,
  );
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  if (room) videoGrant = new VideoGrant({ room });
  else videoGrant = new VideoGrant();

  const token = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

router.post('/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    }),
  );
});

module.exports = router;
