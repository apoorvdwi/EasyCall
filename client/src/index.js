import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './App';
import { UserProvider } from './context/userContext';
import { MeetingProvider } from './context/meetingContext';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <UserProvider>
        <MeetingProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MeetingProvider>
      </UserProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
