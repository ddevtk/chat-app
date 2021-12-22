import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import ChatMesList from '../components/ChatMesList';
import ChatUserList from '../components/ChatUserList';
import ViewTitle from '../components/shared/ViewTitle';
import Base from '../layouts/Base';
import {
  subscribeToChat,
  subscribeToProfile,
} from '../redux/actions/chatAction';

const Chat = () => {
  const { id } = useParams();
  const peopleWatchers = useRef({});
  const { user } = useSelector((state) => state.auth);
  const { activeChats } = useSelector((state) => state.chats);
  const dispatch = useDispatch();

  const joinRoom = activeChats.filter((chat) => chat.id === id)[0];
  const joinedUsers = joinRoom?.joinedUsers;

  const subscribeToJoinedUsers = (jUsers) => {
    console.log('hello');
    jUsers.forEach((user) => {
      if (!peopleWatchers.current[user.id]) {
        peopleWatchers.current[user.id] = dispatch(
          subscribeToProfile(user.id, id)
        );
      }
    });
  };

  const unSubFromJoinedUsers = () => {
    Object.keys(peopleWatchers.current).forEach((id) => {
      peopleWatchers.current[id]();
    });
  };

  useEffect(() => {
    const unSubFromChat = dispatch(subscribeToChat(id));
    return () => {
      unSubFromChat();
      unSubFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

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
