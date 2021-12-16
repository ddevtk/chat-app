import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import ChatMesList from '../components/ChatMesList';
import ChatUserList from '../components/ChatUserList';
import ViewTitle from '../components/shared/ViewTitle';
import Base from '../layouts/Base';

const Chat = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to='/' />;
  }

  return (
    <Base canGoBack>
      <div className='row no-gutters fh'>
        <div className='col-3 fh'>
          <ChatUserList />
        </div>
        <div className='col-9 fh'>
          <ViewTitle text={`Joined channel:  ${id}`} />
          <ChatMesList />
        </div>
      </div>
    </Base>
  );
};

export default Chat;
