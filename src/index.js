import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { UserContextProvider } from './context/userContext';

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
  ,
  document.getElementById('root')
);


