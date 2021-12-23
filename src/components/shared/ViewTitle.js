import React from 'react';
import { Avatar } from 'antd';

const ViewTitle = ({ text, children, imageUrl }) => {
  return (
    <div className='chat-name-container'>
      <div className='d-flex justify-content-center align-items-center'>
        {imageUrl && <Avatar size={50} src={imageUrl} className='mr-2' />}
        <span className='name'>{text}</span>
      </div>

      <div className='d-flex align-items-center justify-content-center'>
        {children}
      </div>
    </div>
  );
};

export default ViewTitle;
