import React from 'react';
import { useParams } from 'react-router';
import ChatMesList from '../components/ChatMesList';
import ChatUserList from '../components/ChatUserList';
import ViewTitle from '../components/shared/ViewTitle';

const Chat = () => {
  const { id } = useParams();

  return (
    <div className='row no-gutters fh'>
      <div className='col-3 fh'>
        <ChatUserList />
      </div>
      <div className='col-9 fh'>
        <ViewTitle text={`Joined channel:  ${id}`} />
        <ChatMesList />
      </div>
    </div>
  );
};

export default Chat;
