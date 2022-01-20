import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './App';
import { UserProvider } from './context/userContext';
import { MeetingProvider } from './context/meetingContext';
import { SocketProvider } from './context/socketContext';
import { MessagingProvider } from './context/messagingContext';

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <UserProvider>
      <MeetingProvider>
        <SocketProvider>
          <MessagingProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MessagingProvider>
        </SocketProvider>
      </MeetingProvider>
    </UserProvider>
  </SnackbarProvider>,
  document.getElementById('root'),
);
