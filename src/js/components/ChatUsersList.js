import React from 'react';
import ChatSearch from './ChatSearch';

const ChatUsersList = ({ users = [] }) => {
  return (
    <div className='list-container'>
      <ChatSearch />
      <ul className='items'>
        {users.map((user) => (
          <li key={user.uid} className='item'>
            <div className='item-status'>
              <img src={user.avatar} alt='Retail Admin' />
              <span className={`status ${user.state}`}></span>
            </div>
            <p className='name-time'>
              <span className='name mr-2'>{user.username}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatUsersList;
