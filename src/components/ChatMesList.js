import React from 'react';

const ChatMesList = ({ messages, uid }) => {
  console.log(messages);
  console.log(uid);
  return (
    <div className='chat-container'>
      <ul className='chat-box chatContainerScroll'>
        {messages?.map((mes, idx) => {
          if (mes?.author?.uid === uid) {
            return (
              <li className='chat-right' key={idx}>
                <div className='chat-avatar'>
                  <img src={mes?.author?.avatarUrl} alt='Retail Admin' />
                  <div className='chat-name'>{mes?.author?.username}</div>
                </div>
                <div className='chat-text-wrapper'>
                  <span className='chat-text'>{mes.content}</span>
                  <span className='chat-spacer'></span>
                  <div className='chat-hour'>5h ago </div>
                </div>
              </li>
            );
          }
          return (
            <li className='chat-left' key={idx}>
              <div className='chat-avatar'>
                <img src={mes?.author?.avatarUrl} alt='Retail Admin' />
                <div className='chat-name'>{mes?.author?.username}</div>
              </div>
              <div className='chat-text-wrapper'>
                <span className='chat-text'>{mes.content}</span>
                <span className='chat-spacer'></span>
                <div className='chat-hour'>5h ago </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatMesList;
