import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatSearch from './ChatSearch';

const JoinedChatsList = ({ chats }) => {
  const navigate = useNavigate();
  return (
    <div className='list-container'>
      <ChatSearch />
      <ul className='items'>
        {chats.map((chat) => (
          <li
            onClick={() => {
              navigate(`/chat/${chat.id}`);
            }}
            className='item'
            key={chat.id}
          >
            <div className='item-status'>
              <img src={chat.image} alt='Retail Admin' />
              <span className='status online'></span>
            </div>
            <p className='name-time'>
              <span className='name mr-2'>{chat.name}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JoinedChatsList;
