import React from 'react';

const ChatUserList = ({ users }) => {
  return (
    <div className='list-container'>
      <div className='chat-search-box'>
        <div className='input-group'>
          <input className='form-control' placeholder='Search' />
        </div>
      </div>
      <ul className='items'>
        {users?.map((user, id) => {
          return (
            <li onClick={() => {}} className='item' key={id}>
              <div className='item-status'>
                <img src={user.avatarUrl} alt={user.username} />
                <span className={`status ${user.state}`}></span>
              </div>
              <p className='name-time'>
                <span className='name mr-2'>{user.username}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatUserList;
