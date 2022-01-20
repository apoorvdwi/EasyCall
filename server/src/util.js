const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const config = require('./config');

const app = initializeApp({
  credential: cert(
    JSON.parse(
      Buffer.from(config.google_config_base64, 'base64').toString('ascii'),
    ),
  ),
});

const db = getFirestore(app);

const addMessageToFirebase = async (chatId, messageData) => {
  const docRef = db.collection('chats').doc(`${chatId}`);

  const prevData = (await docRef.get()).data();
  const newMessages = prevData ? prevData.messages : [];
  await docRef.update({
    messages: [...newMessages, messageData],
  });
};

module.exports = addMessageToFirebase;
