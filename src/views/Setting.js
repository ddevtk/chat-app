import { ipcRenderer } from 'electron';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Base from '../layouts/Base';
import { updateSetting } from '../redux/actions/settingAction';

const Setting = () => {
  const { user } = useSelector((state) => state.auth);
  const { isDarkTheme, playSound, showNotifications } = useSelector(
    (state) => state.setting
  );

  const dispatch = useDispatch();

  if (!user) {
    return <Navigate to='/' />;
  }

  const updateSettingHandler = (e) => {
    const { name, checked } = e.target;
    dispatch(updateSetting(name, checked));
  };

  const quitApp = () => {
    ipcRenderer.send('app-quit');
  };

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
                    id='theme'
                    checked={isDarkTheme}
                    onChange={updateSettingHandler}
                    name='isDarkTheme'
                    type='checkbox'
                    className='form-check-input'
                  />
                  <label className='form-check-label' htmlFor='theme'>
                    Dark Theme
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    id='notification'
                    checked={showNotifications}
                    onChange={updateSettingHandler}
                    name='showNotifications'
                    type='checkbox'
                    className='form-check-input'
                  />
                  <label className='form-check-label' htmlFor='notification'>
                    Enable Notification
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    id='sound'
                    checked={playSound}
                    onChange={updateSettingHandler}
                    name='playSound'
                    type='checkbox'
                    className='form-check-input'
                  />
                  <label className='form-check-label' htmlFor='sound'>
                    Sound notification
                  </label>
                </div>
              </div>
              <button
                type='button'
                onClick={quitApp}
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
