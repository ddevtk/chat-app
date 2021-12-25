import React, { useState } from 'react';

const Messenger = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(value);
      setValue('');
    }
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
