import * as api from '../../api/auth';
import { authActionType } from '../type/authActionType';

export const registerUser = (formData) => async (dispatch) => {
  dispatch({ type: authActionType.AUTH_REGISTER_INIT });
  try {
    await api.register(formData);
    dispatch({ type: authActionType.AUTH_REGISTER_SUCCESS });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = (formData) => async (dispatch) => {
  dispatch({ type: authActionType.AUTH_LOGIN_INIT });
  try {
    await api.login(formData);
    dispatch({ type: authActionType.AUTH_LOGIN_SUCCESS });
  } catch (error) {
    console.log(error.message);
  }
};

export const listenAuthChanges = () => (dispatch) => {
  dispatch({ type: authActionType.AUTH_ON_INIT });
  api.onAuthStateChange(async (authUser) => {
    if (authUser) {
      const userProfile = await api.getUserProfile(authUser.uid);
      console.log(userProfile);
      dispatch({
        type: authActionType.AUTH_ON_SUCCESS,
        payload: userProfile,
      });
      console.log('User is signed in');
    } else {
      dispatch({ type: authActionType.AUTH_ON_ERROR });
      console.log('No user is signed in');
    }
  });
};

export const logoutUser = () => async (dispatch) => {
  await api.logout();
  dispatch({ type: authActionType.AUTH_LOGOUT_SUCCESS });
};
