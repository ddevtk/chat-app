import * as api from '../../api/auth';
import { authActionType } from '../type/authActionType';

export const registerUser = (formData) => async (dispatch) => {
  try {
    await api.register(formData);
    dispatch({ type: authActionType.AUTH_REGISTER_SUCCESS });
  } catch (error) {
    console.log(error.message);
  }
};
export const listenAuthChanges = () => (dispatch) => {
  dispatch({ type: authActionType.AUTH_REGISTER_INIT });
  api.onAuthStateChange((authUser) => {
    if (authUser) {
      dispatch({
        type: authActionType.AUTH_REGISTER_SUCCESS,
        payload: authUser,
      });
      console.log('user is signed in');
    } else {
      dispatch({ type: authActionType.AUTH_REGISTER_ERROR });
      console.log('no user is signed in');
    }
  });
};
