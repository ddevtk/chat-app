import { chatActionType } from '../type/chatActionType';
import * as api from '../../api/chatsApi';
import db from '../../db/firestore';

export const fetchChatsAction = () => async (dispatch) => {
  const chats = await api.fetchChats();
  dispatch({
    type: chatActionType.FETCH_CHATS,
    payload: chats,
  });
};

export const createChatAction = (formData, uid) => async (dispatch) => {
  const newChat = { ...formData };
  const userRef = db.doc(`profiles/${uid}`);

  newChat.admin = userRef;
  newChat.joinedUsers = [userRef];
  console.log(newChat);

  try {
    const chat = await api.createChat(newChat);
    dispatch({ type: chatActionType.CREATE_CHAT_SUCCESS, payload: chat });
  } catch (error) {
    console.error(error.message);
  }
};
