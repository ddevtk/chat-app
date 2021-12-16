import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';

const Navbar = ({ canGoBack, showSetting }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  console.log(showSetting);

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
            <Link to='/settings' className='btn btn-outline-success ml-2'>
              Settings
            </Link>
          )}
        </div>
        <div className='chat-navbar-inner-right'>
          {user && (
            <>
              <img
                src={user.avatar}
                alt={user.username}
                className='avatar mr-2'
              />
              <span className='logged-in-user'>Hi, {user.username}</span>
              <button
                onClick={() => dispatch(logoutUser())}
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
