import { settingActionTypes } from '../type/settingActionTypes';

export const updateSetting = (setting, value) => (dispatch) => {
  const settingStorage = localStorage.getItem('app-settings');
  const currentSetting = settingStorage ? JSON.parse(settingStorage) : {};

  const newSetting = { ...currentSetting, [setting]: value };
  localStorage.setItem('app-settings', JSON.stringify(newSetting));

  dispatch({
    type: settingActionTypes.UPDATE_SETTINGS,
    payload: { setting, value },
  });
};

export const initialSettings = () => (dispatch) => {
  dispatch({ type: settingActionTypes.INITIAL_SETTINGS });
};
