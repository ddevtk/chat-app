import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatString } from '../helpers/helpers';

const JoinedChats = ({ chats }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [joinedChats, setJoinedChats] = useState(chats);

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const jChats = chats?.filter((chat) => {
      return formatString(chat.name).includes(formatString(value));
    });
    setJoinedChats(jChats);
  }, [value]);

  return (
    <div className='list-container'>
      <div className='chat-search-box'>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Search...'
            value={value}
            onChange={inputChangeHandler}
          />
        </div>
      </div>
      <ul className='items' style={{ overflowY: 'scroll' }}>
        {joinedChats?.map((chat) => (
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
