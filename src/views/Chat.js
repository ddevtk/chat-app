import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import ChatMesList from '../components/ChatMesList';
import ChatUserList from '../components/ChatUserList';
import Messenger from '../components/Messenger';
import LoadingView from '../components/shared/LoadingView';
import ViewTitle from '../components/shared/ViewTitle';
import Base from '../layouts/Base';
import {
  sendChatMessage,
  subscribeToChat,
  subscribeToMessages,
  subscribeToProfile,
} from '../redux/actions/chatAction';

const Chat = () => {
  const { id } = useParams();
  const peopleWatchers = useRef({});
  const messageList = useRef({});
  const { user } = useSelector((state) => state.auth);
  const { activeChats } = useSelector((state) => state.chats);
  const { messages } = useSelector((state) => state.chats);
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

  const sendMessage = (message) => {
    dispatch(sendChatMessage(message, id)).then(() => {
      messageList.current.scrollIntoView(false);
    });
  };

  useEffect(() => {
    dispatch(subscribeToChat(id));
    dispatch(subscribeToMessages(id));

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

  return (
    <Base canGoBack>
      <div className='row no-gutters fh'>
        <div className='col-3 fh'>
          <ChatUserList users={joinRoom?.joinedUsers} />
        </div>
        <div className='col-9 fh'>
          <ViewTitle text={joinRoom?.name} imageUrl={joinRoom?.imageUrl} />
          <ChatMesList
            messages={messages[id]}
            uid={user?.uid}
            innerRef={messageList}
          />
          <Messenger onSubmit={sendMessage} />
        </div>
      </div>
    </Base>
  );
};

export default Chat;
