import React from 'react';

const ViewTitle = ({ text, children }) => {
  return (
    <div className='chat-name-container'>
      <span className='name'>{text}</span>
      {/* <a href='/' className='btn btn-primary btn-sm back-button'>
        Back
      </a> */}
      <div className='d-flex align-items-center justify-content-center'>
        {children}
      </div>
    </div>
  );
};

export default ViewTitle;
