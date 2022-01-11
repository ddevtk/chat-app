import React, { useEffect } from 'react';
import AvailableChatsList from '../components/AvailableChatsList';
import JoinedChatsList from '../components/JoinedChatsList';
import ViewTitle from '../components/shared/ViewTitle';
import { useDispatch, useSelector } from 'react-redux';
import fetchChats from '../actions/chats';
import { withBaseLayout } from '../layouts/BaseLayout';
import Notification from '../utils/notifications';
import { Link } from 'react-router-dom';

const HomeView = () => {
  const dispatch = useDispatch();
  const joinedChat = useSelector(({ chats }) => chats.joined);
  const availableChat = useSelector(({ chats }) => chats.available);

  useEffect(() => {
    Notification.setup();
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className='row no-gutters fh'>
      <div className='col-3 fh'>
        <JoinedChatsList chats={joinedChat} />
      </div>
      <div className='col-9 fh'>
        <ViewTitle text='Choose your channel'>
          <Link className='btn btn-outline-primary' to='/chatCreate'>
            New
          </Link>
        </ViewTitle>
        <AvailableChatsList chats={availableChat} />
      </div>
    </div>
  );
};

export default withBaseLayout(HomeView);
