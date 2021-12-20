import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import ChatMesList from '../components/ChatMesList';
import ChatUserList from '../components/ChatUserList';
import ViewTitle from '../components/shared/ViewTitle';
import Base from '../layouts/Base';
import { subscribeToChat } from '../redux/actions/chatAction';

const Chat = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { activeChats } = useSelector((state) => state.chats);
  const dispatch = useDispatch();

  const joinRoom = activeChats.filter((chat) => chat.id === id)[0];
  console.log(joinRoom);

  useEffect(() => {
    dispatch(subscribeToChat(id));
  }, []);

  if (!user) {
    return <Navigate to='/' />;
  }

  return (
    <Base canGoBack>
      <div className='row no-gutters fh'>
        <div className='col-3 fh'>
          <ChatUserList users={joinRoom?.joinedUsers} />
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
