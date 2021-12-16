import React from 'react';
import Navbar from '../components/Navbar';

const Base = ({ children, ...props }) => {
  console.log(children);
  return (
    <>
      <Navbar {...props} />
      {children}
    </>
  );
};

export default Base;
