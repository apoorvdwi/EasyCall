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

router.post('/meet-exists', (req, res) => {
  const meetId = req.body.meetId;
  const client = twilio(config.twilio.accountSid, config.twilio.authToken);

  console.log('/meet-exists', meetId);

  client.video
    .rooms(meetId)
    .fetch()
    .then((meeting) => {
      if (meeting) {
        res.send({
          meetingExists: true,
          meeting,
        });
      } else {
        res.send({
          meetingExists: false,
        });
      }
    })
    .catch((err) => {
      res.send({
        meetingExists: false,
        err,
      });
    });
});

module.exports = router;
