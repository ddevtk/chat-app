import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import ChatMesList from '../components/ChatMesList';
import ChatUserList from '../components/ChatUserList';
import LoadingView from '../components/shared/LoadingView';
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

  const joinRoom = activeChats?.filter((chat) => chat.id === id)[0];
  const joinedUsers = joinRoom?.joinedUsers;

  const subscribeToJoinedUsers = (jUsers) => {
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
    dispatch(subscribeToChat(id));
    return () => {
      dispatch(subscribeToChat(id));
      unSubFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  if (!user) {
    return <Navigate to='/' />;
  }
  // if (activeChats.length === 0) {
  //   return <LoadingView />;
  // }

  return (
    <Base canGoBack>
      <div className='row no-gutters fh'>
        <div className='col-3 fh'>
          <ChatUserList users={joinRoom?.joinedUsers} />
        </div>
        <div className='col-9 fh'>
          <ViewTitle text={joinRoom?.name} imageUrl={joinRoom?.imageUrl} />
          <ChatMesList />
        </div>
      </div>
    </Base>
  );
};

export default Chat;
