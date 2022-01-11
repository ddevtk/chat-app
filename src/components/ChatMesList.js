import { Image } from 'antd';
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
          console.log(mes?.content);
          if (
            mes?.content?.includes(process.env.IS_VIDEO) ||
            mes?.content?.includes(process.env.IS_IMAGE)
          ) {
            return (
              <li
                className={
                  mes?.author?.uid === uid ? 'chat-right' : 'chat-left'
                }
                key={idx}
              >
                {mes?.author?.uid !== uid && (
                  <div className='chat-avatar'>
                    <img
                      src={mes?.author?.avatarUrl}
                      className='avatar-mes-list'
                      alt='Retail Admin'
                    />
                    <div className='chat-name'>{mes?.author?.username}</div>
                  </div>
                )}
                <div className='d-flex flex-column align-items-end'>
                  {mes.content.includes(process.env.IS_VIDEO) ? (
                    <video
                      style={{ width: '200px', borderRadius: '0.6rem' }}
                      controls
                    >
                      <source
                        src={mes.content.split(process.env.IS_VIDEO)[1]}
                      />
                    </video>
                  ) : (
                    <Image
                      src={mes.content.split(process.env.IS_IMAGE)[1]}
                      width={200}
                      style={{ borderRadius: '0.6rem' }}
                    />
                  )}

                  <div className='chat-hour mt-1'>
                    {formatTimeAgo(mes.timestamp)}
                  </div>
                </div>
              </li>
            );
          }
          return (
            <li
              className={mes?.author?.uid === uid ? 'chat-right' : 'chat-left'}
              key={idx}
            >
              {mes?.author?.uid !== uid && (
                <div className='chat-avatar'>
                  <img
                    src={mes?.author?.avatarUrl}
                    className='avatar-mes-list'
                    alt='Retail Admin'
                  />
                  <div className='chat-name'>{mes?.author?.username}</div>
                </div>
              )}
              <div className='chat-text-wrapper'>
                <span className='chat-text'>{mes?.content}</span>
                <span className='chat-spacer'></span>
                <div className='chat-hour'>{formatTimeAgo(mes?.timestamp)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatMesList;
