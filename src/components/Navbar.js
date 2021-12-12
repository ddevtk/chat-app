import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <div className='chat-navbar'>
      <nav className='chat-navbar-inner'>
        <div className='chat-navbar-inner-left'>
          <button
            onClick={() => navigate(-1)}
            className='btn btn-outline-primary'
          >
            Back
          </button>
          <Link to='/settings' className='btn btn-outline-success ml-2'>
            Settings
          </Link>
        </div>
        <div className='chat-navbar-inner-right'>
          <span className='logged-in-user'>Hi User</span>
          <Link
            to='/'
            className='btn btn-sm btn-outline-success ml-2 d-flex align-items-center justify-content-center'
          >
            Login
          </Link>
          {user && (
            <button
              onClick={() => dispatch(logoutUser())}
              className='btn btn-sm btn-outline-danger ml-2 d-flex align-items-center justify-content-center'
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
