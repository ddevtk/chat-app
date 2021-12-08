import { chatActionType } from '../type/chatActionType';
import * as api from '../../api/chatsApi';

export const fetchChats = () => async (dispatch) => {
  const chats = await api.fetchChats();
  dispatch({
    type: chatActionType.FETCH_CHATS,
    payload: chats,
  });
};
