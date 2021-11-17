import React, { useEffect, useContext } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { Switch, Route } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase';
import './App.css';
import { ClientContext } from './context';
import LoginPage from './routes/login';
// import LoadingPage from './routes/loading';
// import Home from './routes/home';

function App() {
  const context = useContext(ClientContext);
  const { user, setUser, initializing, setInitializing } = context;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        onSnapshot(userRef, (snapShot) => {
          setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {/* {initializing ? (
        <LoadingPage />
      ) : !user ? (
        <LoginPage />
      ) : (
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      )} */}
      <LoginPage />
    </div>
  );
}

export default App;
