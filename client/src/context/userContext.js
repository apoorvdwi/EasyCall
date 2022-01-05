import React, { useState, createContext } from 'react';
import { notification } from 'antd';
import { Button } from '@mui/material';
import {
  GoogleAuthProvider,
  signInWithPopup,
  linkWithCredential,
  signOut,
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
  OAuthProvider,
} from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../firebase';

const UserContext = createContext();

const StyledNotiButton = styled(Button)`
  font-family: 'Sora', sans-serif;
  background: #efcb68;
  color: #160c28;
  justify-content: center;
  align-items: center;
  border-color: unset;
  text-transform: none;
  border: 1px solid transparent;
  padding: 5px 10px;

  &:hover,
  &:focus,
  &:active {
    color: #160c28;
    background: #efcb68;
    border-color: unset;
  }

  &:hover {
    border: 1px solid #160c28;
  }
`;

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setLoading] = useState(true);

  const openNotification = (existing, current, linkFunction) => {
    const key = `open${Date.now()}`;
    const btn = (
      <StyledNotiButton
        type="primary"
        size="small"
        onClick={() => {
          linkFunction();
          notification.close(key);
          setLoading(true);
        }}
      >
        Confirm
      </StyledNotiButton>
    );
    notification.open({
      message: 'Another account found',
      description: `Another ${existing} account with same email found. To Link ${current} credentials with the same account, press Confirm.`,
      btn,
      key,
      duration: 0,
      onClose: () => {
        notification.close(key);
        setLoading(false);
      },
      style: {
        background: '#E1EFE6',
        borderRadius: '10px',
        fontFamily: 'Sora, sans-serif',
        color: '#160c28',
      },
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const signInWithGoogle = async () => {
    let existingEmail = null;
    let pendingCred = null;
    let err = null;
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    auth.useDeviceLanguage();
    await signInWithPopup(auth, provider).catch((error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setLoading(false);
        openNotification('Github', 'Google', async () => {
          existingEmail = error.customData.email;
          pendingCred = OAuthProvider.credentialFromResult(error.customData);
          return fetchSignInMethodsForEmail(auth, existingEmail).then(
            (providers) => {
              if (providers.indexOf(GithubAuthProvider.PROVIDER_ID) !== -1) {
                const githubProvider = new GithubAuthProvider();
                githubProvider.setCustomParameters({
                  login_hint: existingEmail,
                });
                return signInWithPopup(auth, githubProvider).then((result) => {
                  return linkWithCredential(result.user, pendingCred);
                });
              }
            },
          );
        });
      } else {
        err = error;
      }
      console.log(error);
      setLoading(false);
    });
    if (!err) {
      setLoading(true);
    }
  };

  const signInWithGithub = async () => {
    let existingEmail = null;
    let pendingCred = null;
    let err = null;
    const provider = new GithubAuthProvider();
    auth.useDeviceLanguage();
    await signInWithPopup(auth, provider).catch((error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setLoading(false);
        openNotification('Google', 'Github', async () => {
          existingEmail = error.customData.email;
          pendingCred = OAuthProvider.credentialFromResult(error.customData);
          return fetchSignInMethodsForEmail(auth, existingEmail).then(
            (providers) => {
              if (providers.indexOf(GoogleAuthProvider.PROVIDER_ID) !== -1) {
                const googleProvider = new GoogleAuthProvider();
                googleProvider.setCustomParameters({
                  login_hint: existingEmail,
                });
                return signInWithPopup(auth, googleProvider).then((result) => {
                  return linkWithCredential(result.user, pendingCred);
                });
              }
            },
          );
        });
      } else {
        err = error;
      }
      console.log(error);
      setLoading(false);
    });
    if (!err) {
      setLoading(true);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const contextProps = {
    user,
    setUser,
    signInWithGoogle,
    signInWithGithub,
    signOutUser,
    loading,
    setLoading,
  };

  return (
    <UserContext.Provider value={contextProps}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
