import React from 'react';
import { ipcRenderer } from 'electron';
import Home from './views/Home';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Setting from './views/Setting';
import Register from './views/Register';
import Login from './views/Login';
import Chat from './views/Chat';

const App = () => {
  const sendNotification = () => {
    window.sayHello('Hello from App.js');
  };
  return (
    <Router>
      <Navbar />
      <div className='content-wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/chat/:id' element={<Chat />} />
          <Route path='/settings' element={<Setting />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
