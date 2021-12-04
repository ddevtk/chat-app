import React from 'react';

const ViewTitle = ({ text }) => {
  return (
    <div className='chat-name-container'>
      <span className='name'>{text}</span>
      <a href='/' className='btn btn-primary btn-sm back-button'>
        Back
      </a>
    </div>
  );
};

export default ViewTitle;
