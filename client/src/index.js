import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ClientProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <ClientProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
