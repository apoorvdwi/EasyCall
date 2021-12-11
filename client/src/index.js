import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './App';
import { ClientProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <ClientProvider>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </ClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
