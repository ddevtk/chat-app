import React from 'react';
import { ipcRenderer } from 'electron';

const App = () => {
  const sendNotification = () => {
    window.sayHello('Hello from App.js');
  };
  return (
    <div>
      <button onClick={sendNotification}>Send notification</button>
    </div>
  );
};

export default App;
