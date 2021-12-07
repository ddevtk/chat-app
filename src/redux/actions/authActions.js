import * as api from '../../api/auth';
import { authActionType } from '../type/authActionType';

export const registerUser = (formData) => async (dispatch) => {
  dispatch({ type: authActionType.AUTH_REGISTER });
  try {
    await api.register(formData);
  } catch (error) {
    console.log(error.message);
  }
};
