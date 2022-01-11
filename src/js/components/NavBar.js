import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/auth';

const NavBar = ({ canGoBack, view }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(({ auth }) => auth.user);

  return (
    <div className='chat-navbar'>
      <nav className='chat-navbar-inner'>
        <div className='chat-navbar-inner-left'>
          {canGoBack && (
            <button
              onClick={() => {
                navigate(-1);
              }}
              className='btn btn-outline-primary'
            >
              Back
            </button>
          )}
          {view !== 'Settings' && (
            <button
              onClick={() => {
                navigate('/settings');
                ``;
              }}
              className='btn btn-outline-success ml-2'
            >
              Settings
            </button>
          )}
        </div>
        <div className='chat-navbar-inner-right'>
          <img className='avatar mr-2' src={user.avatar}></img>
          <span className='logged-in-user'>Hi {user.username}!</span>
          <button onClick={() => dispatch(logout())} className='btn btn-outline-danger ml-4'>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
