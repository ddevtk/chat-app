import React, { useState } from 'react';
import { createTimestamp } from '../helpers/helpers';

const Messenger = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
      setValue('');
    }
  };

  const sendMessage = () => {
    if (value.trim() === '') {
      return;
    }
    const message = {
      content: value,
      timestamp: createTimestamp(),
    };
    onSubmit(message);
  };

  return (
    <div className='chat-input form-group mt-3 mb-0'>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={onKeyPressHandler}
        className='form-control'
        rows='2'
        placeholder='Type your message...'
      ></textarea>
    </div>
  );
};

export default Messenger;
