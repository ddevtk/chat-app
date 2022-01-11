import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import LoadingView from './components/shared/LoadingView';
import HomeView from './views/HomeView';
import Welcome from './views/Welcome';
import Settings from './views/Settings';
import Chat from './views/Chat';

import StoreProvider from './store/StoreProvider';
import { listenToAuthChanges } from './actions/auth';
import { listenToConnectionChanges } from './actions/app';
import ChatCreate from './views/ChatCreate';
import { checkUserConnection } from './actions/connection';
import { loadInitialSettings } from './actions/settings';

const ChatApp = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  const isOnline = useSelector(({ app }) => app.isOnline);
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    dispatch(loadInitialSettings());
    const unsubFromAuth = dispatch(listenToAuthChanges());
    const unsubFromConnection = dispatch(listenToConnectionChanges());

    return () => {
      unsubFromAuth();
      unsubFromConnection();
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubFromUserConnection;
    if (user?.uid) {
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
    }

    return () => {
      unsubFromUserConnection && unsubFromUserConnection();
    };
  }, [dispatch, user]);

  const ContentWrapper = ({ children }) => {
    const isDarkTheme = useSelector(({ settings }) => settings.isDarkTheme);
    return <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>{children}</div>;
  };
  if (!isOnline) {
    return (
      <LoadingView message='Application has been disconnected from the internet. Please reconnect...' />
    );
  }

  if (isChecking) {
    return <LoadingView />;
  }
  return (
    <Router>
      <ContentWrapper>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/chatCreate' element={<ChatCreate />} />
          <Route path='/home' element={user ? <HomeView /> : <Welcome />} />
          <Route path='/settings' element={user ? <Settings /> : <Welcome />} />
          <Route path='/chat/:id' element={user ? <Chat /> : <Welcome />} />
        </Routes>
      </ContentWrapper>
    </Router>
  );
};

const App = () => {
  return (
    <StoreProvider>
      <ChatApp />
    </StoreProvider>
  );
};

export default App;
