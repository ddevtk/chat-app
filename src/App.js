import React from 'react';
import { ipcRenderer } from 'electron';
import Home from './views/Home';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Setting from './views/Setting';

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
          <Route path='/register' element={<h1>Register</h1>} />
          <Route path='/settings' element={<Setting />} />
          <Route path='/login' element={<h1>Login</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
