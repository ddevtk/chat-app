import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AvailableChat from '../components/AvailableChatList';
import JoinedChat from '../components/JoinedChatList';
import { fetchChats } from '../redux/actions/chatAction';

const Home = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.items);
  console.log(chats);
  useEffect(() => {
    dispatch(fetchChats());
  }, []);
  return (
    <div className='row no-gutters fh'>
      <div className='col-3 fh'>
        <JoinedChat />
      </div>
      <div className='col-9 fh'>
        <AvailableChat />
      </div>
    </div>
  );
};

export default Home;
