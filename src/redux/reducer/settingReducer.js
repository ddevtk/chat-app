import { settingActionTypes } from '../type/settingActionTypes';

const defaultSetting = {
  isDarkTheme: false,
  playSound: true,
  showNotifications: true,
};

export const settingReducer = (state = defaultSetting, action) => {
  switch (action.type) {
    case settingActionTypes.UPDATE_SETTINGS:
      state[action.payload.setting] = action.payload.value;
      return {
        ...state,
      };

    case settingActionTypes.INITIAL_SETTINGS:
      const settings = localStorage.getItem('app-settings')
        ? JSON.parse(localStorage.getItem('app-settings'))
        : {};

      return { ...defaultSetting, ...settings };

    default:
      return state;
  }
};
