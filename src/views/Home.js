import React from 'react';
import AvailableChat from '../components/AvailableChats';
import JoinedChat from '../components/JoinedChats';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className='content-wrapper'>
      <Navbar />
      <div className='row no-gutters fh'>
        <div className='col-3 fh'>
          <JoinedChat />
        </div>
        <div className='col-9 fh'>
          <AvailableChat />
        </div>
      </div>
    </div>
  );
};

export default Home;
