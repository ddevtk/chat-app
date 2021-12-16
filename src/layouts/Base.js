import React from 'react';
import Navbar from '../components/Navbar';

const Base = ({ children, ...props }) => {
  return (
    <>
      <Navbar {...props} />
      {children}
    </>
  );
};

export default Base;
