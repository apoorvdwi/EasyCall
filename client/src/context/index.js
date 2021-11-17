import React, { useState, createContext, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
} from 'firebase/auth';
import { auth, db } from '../firebase';

const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    let existingEmail = null;
    let pendingCred = null;
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    auth.useDeviceLanguage();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        existingEmail = error.email;
        pendingCred = error.credential;
        return fetchSignInMethodsForEmail(auth, error.email)
          .then((providers) => {
            if (providers.indexOf(GithubAuthProvider.PROVIDER_ID) !== -1) {
              const githubProvider = new GithubAuthProvider();
              githubProvider.setCustomParameters({ login_hint: existingEmail });
              return signInWithPopup(auth, githubProvider).then((result) => {
                return result.user;
              });
            }
          })
          .then((user) => {
            return user.linkWithCredential(pendingCred);
          });
      }
    }
  };

  const signInWithGithub = async () => {
    let existingEmail = null;
    let pendingCred = null;
    const provider = new GithubAuthProvider();
    auth.useDeviceLanguage();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        existingEmail = error.email;
        pendingCred = error.credential;
        return fetchSignInMethodsForEmail(auth, error.email)
          .then((providers) => {
            if (providers.indexOf(GoogleAuthProvider.PROVIDER_ID) !== -1) {
              const googleProvider = new GoogleAuthProvider();
              googleProvider.setCustomParameters({ login_hint: existingEmail });
              return signInWithPopup(auth, googleProvider).then((result) => {
                return result.user;
              });
            }
          })
          .then((user) => {
            return user.linkWithCredential(pendingCred);
          });
      }
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        user,
        setUser,
        signInWithGoogle,
        signInWithGithub,
        signOutUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export { ClientContext, ClientProvider };
