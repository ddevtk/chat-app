import React from 'react';
import { ipcRenderer } from 'electron';
import Home from './views/Home';

const App = () => {
  const sendNotification = () => {
    window.sayHello('Hello from App.js');
  };
  return (
    <>
      <Home />
    </>
  );
};

export default App;
