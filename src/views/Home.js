import React, { useEffect } from 'react';
import { fetchChats } from '../api/chats';
// import { fetchChats } from '../api/chats';
import AvailableChat from '../components/AvailableChatList';
import JoinedChat from '../components/JoinedChatList';

const Home = () => {
  useEffect(() => {
    fetchChats();
  }, []);
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
