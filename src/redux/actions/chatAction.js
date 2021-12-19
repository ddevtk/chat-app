import { chatActionType } from '../type/chatActionType';
import * as api from '../../api/chatsApi';
import db from '../../db/firestore';

export const fetchChatsAction = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  const chats = await api.fetchChats();
  chats.forEach((chat) => {
    chat.joinedUsers = chat.joinedUsers.map((user) => user.id);
  });

  const sortedChats = chats.reduce(
    (acc, cur) => {
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

// https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg
