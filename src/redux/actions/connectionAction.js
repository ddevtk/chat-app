import * as api from '../../api/connectionApi';

export const checkUserConnection = (uid, status) => async (dispatch) => {
  try {
    await api.setUserOnlineStatus(uid, status);
    dispatch({ type: 'CONNECTION_USER_STATUS_CHANGED' });
  } catch (error) {
    console.error(error.message);
  }
};
