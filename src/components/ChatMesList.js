import React, { useEffect } from 'react';
import { formatTimeAgo } from '../helpers/helpers';

const ChatMesList = ({ messages, uid, innerRef }) => {
  const scrollToBottom = () => {
    innerRef.current.scrollIntoView(false);
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <div className='chat-container'>
      <ul ref={innerRef} className='chat-box chatContainerScroll'>
        {messages?.map((mes, idx) => {
          return (
            <li
              className={mes?.author?.uid === uid ? 'chat-right' : 'chat-left'}
              key={idx}
            >
              <div className='chat-avatar'>
                <img src={mes?.author?.avatarUrl} alt='Retail Admin' />
                <div className='chat-name'>{mes?.author?.username}</div>
              </div>
              <div className='chat-text-wrapper'>
                <span className='chat-text'>{mes.content}</span>
                <span className='chat-spacer'></span>
                <div className='chat-hour'>{formatTimeAgo(mes.timestamp)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatMesList;
