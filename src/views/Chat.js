import React from 'react';
import { Link } from 'react-router-dom';
import ChatMesList from '../components/ChatMesList';
import ChatUserList from '../components/ChatUserList';
import ViewTitle from '../components/ViewTitle';

const Chat = () => {
  return (
    <div className='row no-gutters fh'>
      <div className='col-3 fh'>
        <ChatUserList />
      </div>
      <div className='col-9 fh'>
        <ViewTitle />
        <ChatMesList />
      </div>
    </div>
  );
};

export default Chat;
