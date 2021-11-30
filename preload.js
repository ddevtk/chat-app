const { ipcRenderer } = require('electron');

window.sayHello = (message) => {
  ipcRenderer.send('notify', message);
};
