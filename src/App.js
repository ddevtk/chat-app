import React, { useEffect, useState } from 'react';
import Home from './views/Home';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Setting from './views/Setting';
import Chat from './views/Chat';
import Welcome from './views/Welcome';
import LoadingView from './components/shared/LoadingView';
import { useDispatch } from 'react-redux';
import { listenAuthChanges } from './redux/actions/authActions';

const App = () => {
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(null);

  const alertOnline = () => {
    navigator.onLine ? setIsOnline(true) : setIsOnline(false);
  };

  dispatch(listenAuthChanges());
  useEffect(() => {
    window.addEventListener('online', alertOnline);
    window.addEventListener('offline', alertOnline);
    return () => {
      unSubFromAuth();
    };
  }, []);

  if (isOnline !== null) {
    if (!isOnline) {
      return (
        <LoadingView message='Application has been disconnected from the internet. Please reconnect...' />
      );
    }
  }

  return (
    <Router>
      <div className='content-wrapper'>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/home' element={<Home />} />
          <Route path='/chat/:id' element={<Chat />} />
          <Route path='/settings' element={<Setting />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
