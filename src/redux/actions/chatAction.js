import { chatActionType } from '../type/chatActionType';
import * as api from '../../api/chatsApi';
import db from '../../db/firestore';

export const fetchChatsAction = (user) => async (dispatch) => {
  const chats = await api.fetchChats();
  chats.forEach((chat) => {
    chat.joinedUsers = chat.joinedUsers.map((user) => {
      console.log(user.id);
      return user.id;
    });
  });

  const sortedChats = chats.reduce(
    (acc, cur) => {
      console.log(cur);
      const keyword = cur.joinedUsers.includes(user.uid)
        ? 'joined'
        : 'available';

      acc[keyword].push(cur);
      return acc;
    },
    {
      joined: [],
      available: [],
    }
  );

  dispatch({
    type: chatActionType.FETCH_CHATS,
    payload: sortedChats,
  });
};

export const createChatAction = (formData, uid) => async (dispatch) => {
  const newChat = { ...formData };
  newChat.admin = db.doc(`profiles/${uid}`);

  try {
    const chatId = await api.createChat(newChat);
    dispatch({ type: chatActionType.CREATE_CHAT_SUCCESS });
    await api.joinChat(uid, chatId);
    dispatch({ type: chatActionType.JOIN_CHAT_SUCCESS });
  } catch (error) {
    console.error(error.message);
  }
};

export const cleanChatStateAction = () => (dispatch) => {
  dispatch({ type: chatActionType.CLEAN_STATE });
};
