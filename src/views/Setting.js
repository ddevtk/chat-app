import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Base from '../layouts/Base';

const Setting = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to='/' />;
  }
  return (
    <Base canGoBack showSetting>
      <div className='centered-view'>
        <div className='centered-container'>
          <form className='centered-container-form'>
            <div className='header'>Adjust application settings</div>
            <button type='button' onClick={() => {}}>
              Notify Me
            </button>
            <div className='form-container'>
              <div className='my-3'>
                <div className='form-check'>
                  <input
                    name='isDarkTheme'
                    type='checkbox'
                    className='form-check-input'
                  />
                  <label className='form-check-label'>Dark Theme</label>
                </div>
                <div className='form-check'>
                  <input
                    name='showNotifications'
                    type='checkbox'
                    className='form-check-input'
                  />
                  <label className='form-check-label'>
                    Enable Notification
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    name='playSound'
                    type='checkbox'
                    className='form-check-input'
                  />
                  <label className='form-check-label'>Sound notification</label>
                </div>
              </div>
              <button
                type='button'
                onClick={() => {}}
                className='btn btn-danger'
              >
                Quit App
              </button>
            </div>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default Setting;
