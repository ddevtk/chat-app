import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AvailableChat from '../components/AvailableChatList';
import JoinedChat from '../components/JoinedChatList';
import LoadingView from '../components/shared/LoadingView';
import Base from '../layouts/Base';
import { fetchChatsAction } from '../redux/actions/chatAction';

const Home = () => {
  const dispatch = useDispatch();
  const { items, isFetching } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchChatsAction());
    }
  }, []);

  if (!user) {
    return <Navigate to='/' />;
  }

  if (isFetching === true) {
    return <LoadingView />;
  }

  return (
    <Base>
      <div className='row no-gutters fh'>
        <div className='col-3 fh'>
          <JoinedChat chats={items.joined} />
        </div>
        <div className='col-9 fh'>
          <AvailableChat chats={items.available} />
        </div>
      </div>
    </Base>
  );
};

export default Home;
