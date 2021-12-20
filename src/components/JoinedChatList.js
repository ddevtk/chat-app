import React from 'react';
import { useNavigate } from 'react-router-dom';

const JoinedChats = ({ chats }) => {
  const navigate = useNavigate();

  return (
    <div className='list-container'>
      <div className='chat-search-box'>
        <div className='input-group'>
          <input className='form-control' placeholder='Search' />
        </div>
      </div>
      <ul className='items'>
        {chats?.map((chat) => (
          <li
            key={chat.id}
            onClick={() => navigate(`/chat/${chat.id}`)}
            className='item'
          >
            <div className='item-status'>
              <img src={chat.imageUrl} alt='Retail Admin' />
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

export default JoinedChats;
