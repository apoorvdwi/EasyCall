import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCq9LNZCwrmx8n2V897QBY6BdcUCoj7_0U',
  authDomain: 'easycall-8b8a5.firebaseapp.com',
  projectId: 'easycall-8b8a5',
  storageBucket: 'easycall-8b8a5.appspot.com',
  messagingSenderId: '28247549299',
  appId: '1:28247549299:web:336d2e1c4c44efe0251106',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export const createUserProfileDocument = async (
  userAuth,
  additionalData = {},
) => {
  if (!userAuth) return;

  const userRef = doc(db, 'users', `${userAuth.uid}`);

  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        userImage: photoURL,
        meetings: [],
        chats: [],
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating the User', error.message);
    }
  } else {
    const { photoURL } = userAuth;

    try {
      await updateDoc(userRef, {
        userImage: photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating the User', error.message);
    }
  }

  return userRef;
};

export default app;
