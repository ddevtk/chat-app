import React, { useEffect } from 'react';
import Home from './views/Home';
import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Setting from './views/Setting';
import Chat from './views/Chat';
import Welcome from './views/Welcome';
import { useDispatch } from 'react-redux';
import { listenAuthChanges } from './redux/actions/authActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenAuthChanges());
  }, []);

  return (
    <Router>
      <Navbar />
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
