require('dotenv').config();

module.exports = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
  google_config_base64: process.env.GOOGLE_CONFIG_BASE64,
  url: {
    client: 'http://localhost:3000',
  },
  allowedURLs: ['http://localhost:3000', 'https://easycall.vercel.app'],
};
