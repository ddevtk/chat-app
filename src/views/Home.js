import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AvailableChat from '../components/AvailableChatList';
import JoinedChat from '../components/JoinedChatList';
import Base from '../layouts/Base';
import { fetchChats } from '../redux/actions/chatAction';

const Home = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.items);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  if (!user) {
    return <Navigate to='/' />;
  }

  return (
    <Base>
      <div className='row no-gutters fh'>
        <div className='col-3 fh'>
          <JoinedChat chats={chats} />
        </div>
        <div className='col-9 fh'>
          <AvailableChat chats={chats} />
        </div>
      </div>
    </Base>
  );
};

export default Home;
