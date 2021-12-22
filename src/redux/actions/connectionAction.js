import * as api from '../../api/connectionApi';

export const checkUserConnection = (uid, status) => (dispatch) => {
  api.setUserOnlineStatus(uid, status);
  dispatch({ type: 'CONNECTION_USER_STATUS_CHANGED' });
};
