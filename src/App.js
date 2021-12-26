import React, { useEffect, useState } from 'react';
import Home from './views/Home';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Setting from './views/Setting';
import Chat from './views/Chat';
import Welcome from './views/Welcome';
import LoadingView from './components/shared/LoadingView';
import { useDispatch } from 'react-redux';
import { listenAuthChanges } from './redux/actions/authActions';
import ChatCreate from './views/ChatCreate';
import { initialSettings } from './redux/actions/settingAction';
import ContentWrapper from './layouts/ContentWrapper';

const App = () => {
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(null);

  const alertOnline = () => {
    navigator.onLine ? setIsOnline(true) : setIsOnline(false);
  };

  dispatch(listenAuthChanges());

  useEffect(() => {
    dispatch(initialSettings());
    window.addEventListener('online', alertOnline);
    window.addEventListener('offline', alertOnline);
    return () => {
      window.removeEventListener('online', alertOnline);
      window.removeEventListener('offline', alertOnline);
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
      <ContentWrapper>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/home' element={<Home />} />
          <Route path='chat-create' element={<ChatCreate />} />
          <Route path='/chat/:id' element={<Chat />} />
          <Route path='/settings' element={<Setting />} />
        </Routes>
      </ContentWrapper>
    </Router>
  );
};

export default App;
