require('dotenv').config();

module.exports = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET,
  },
  url: {
    client: 'http://localhost:3000',
  },
  allowedURLs: ['http://localhost:3000'],
};
