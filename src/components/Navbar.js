import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';
import { Avatar, Image } from 'antd';

const Navbar = ({ canGoBack, showSetting }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser(user.uid, 'offline'));
  };

  return (
    <div className='chat-navbar'>
      <nav className='chat-navbar-inner'>
        <div className='chat-navbar-inner-left'>
          {canGoBack && (
            <button
              onClick={() => navigate(-1)}
              className='btn btn-outline-primary'
            >
              Back
            </button>
          )}
          {!showSetting && (
            <Link
              to='/settings'
              className='btn btn-outline-success ml-2 d-flex align-items-center'
            >
              Settings
            </Link>
          )}
        </div>
        <div className='chat-navbar-inner-right'>
          {user && (
            <>
              <Avatar
                src={<Image src={user.avatarUrl} />}
                alt={user.username}
                size={48}
                className='mr-2'
              />
              <span className='logged-in-user'>Hi, {user.username}</span>
              <button
                onClick={logoutHandler}
                className='btn btn-sm btn-outline-danger ml-2 d-flex align-items-center justify-content-center'
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
