import * as api from '../../api/authApi';
import { setUserOnlineStatus } from '../../api/connectionApi';
import { authActionType } from '../type/authActionType';
import { chatActionType } from '../type/chatActionType';

export const registerUser = (formData) => async (dispatch) => {
  dispatch({ type: authActionType.AUTH_REGISTER_INIT });
  try {
    const user = await api.register(formData);
    dispatch({ type: authActionType.AUTH_REGISTER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({
      type: authActionType.AUTH_REGISTER_ERROR,
      payload: error.message,
    });
  }
};

export const loginUser = (formData) => async (dispatch) => {
  dispatch({ type: authActionType.AUTH_LOGIN_INIT });
  try {
    const user = await api.login(formData);
    dispatch({ type: authActionType.AUTH_LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({
      type: authActionType.AUTH_LOGIN_ERROR,
      payload: 'Invalid Username or Password ❗❗❗',
    });
  }
};

export const listenAuthChanges = () => (dispatch) => {
  dispatch({ type: authActionType.AUTH_ON_INIT });
  return api.onAuthStateChange(async (authUser) => {
    if (authUser) {
      const userProfile = await api.getUserProfile(authUser.uid);
      dispatch({
        type: authActionType.AUTH_ON_SUCCESS,
        payload: userProfile,
      });
    } else {
      dispatch({ type: authActionType.AUTH_ON_ERROR });
    }
  });
};

export const logoutUser = (uid, status) => async (dispatch) => {
  try {
    await setUserOnlineStatus(uid, status);
    await api.logout();
    dispatch({ type: authActionType.AUTH_LOGOUT_SUCCESS });
    dispatch({ type: chatActionType.CLEAN_STATE });
  } catch (error) {
    console.error(error.message);
  }
};

export const cleanError = () => (dispatch) => {
  dispatch({ type: authActionType.CLEAN_ERROR });
};
