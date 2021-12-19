import { authActionType } from '../type/authActionType';

const defaultState = {
  user: null,
  isChecking: false,
  error: null,
};

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case authActionType.AUTH_ON_INIT:
      return {
        user: null,
        isChecking: true,
      };
    case authActionType.AUTH_LOGIN_INIT:
    case authActionType.AUTH_REGISTER_INIT:
      return {
        ...state,
        isChecking: true,
        error: null,
      };
    case authActionType.AUTH_LOGIN_SUCCESS:
    case authActionType.AUTH_REGISTER_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        // user: action.payload,
        error: null,
        isChecking: false,
      };

    case authActionType.AUTH_ON_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isChecking: false,
      };
    case authActionType.AUTH_REGISTER_ERROR:
    case authActionType.AUTH_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isChecking: false,
      };
    case authActionType.AUTH_ON_ERROR:
      return {
        user: null,
        isChecking: false,
      };
    case authActionType.CLEAN_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
