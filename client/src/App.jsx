import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { onSnapshot } from 'firebase/firestore';
import { Switch, Route } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase';
import './App.css';
import { UserContext } from './context/userContext';
import LoginPage from './routes/login';
import LoadingPage from './routes/loading';
import Home from './routes/home';
import Meet from './routes/meet';

function App() {
  const userContext = useContext(UserContext);
  const { user, setUser, loading, setLoading } = userContext;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}`);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        onSnapshot(userRef, (snapShot) => {
          setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          setLoading(false);
        });
      } else {
        setLoading(false);
        setUser(false);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {loading ? (
        <LoadingPage />
      ) : !user ? (
        <LoginPage />
      ) : (
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/meet/:meetId" component={Meet} />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
