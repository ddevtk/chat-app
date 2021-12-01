import React from 'react';
import AvailableChat from '../components/AvailableChats';
import JoinedChat from '../components/JoinedChats';

const Home = () => {
  return (
    <div className='row no-gutters fh'>
      <div className='col-3 fh'>
        <JoinedChat />
      </div>
      <div className='col-9 fh'>
        <AvailableChat />
      </div>
    </div>
  );
};

export default Home;
