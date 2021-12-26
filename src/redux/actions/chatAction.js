import { chatActionType } from '../type/chatActionType';
import * as api from '../../api/chatsApi';
import db from '../../db/firestore';

export const fetchChatsAction = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch({
    type: chatActionType.FETCH_CHATS_INIT,
  });
  const chats = await api.fetchChats();
  chats.forEach((chat) => {
    chat.joinedUsers = chat.joinedUsers.map((user) => {
      return user.id;
    });
  });

  const sortedChats = chats.reduce(
    (acc, cur) => {
      const keyword = cur.joinedUsers.includes(user?.uid)
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
    type: chatActionType.FETCH_CHATS_SUCCESS,
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

export const joinChatAction = (chatId) => async (dispatch, getState) => {
  const { uid } = getState().auth.user;
  await api.joinChat(uid, chatId);
  dispatch({ type: chatActionType.JOIN_CHAT_SUCCESS });
};

export const refreshChatCreateState = () => (dispatch) => {
  dispatch({ type: chatActionType.REFRESH_STATE_WHEN_CREATE_CHAT });
};
export const subscribeToChat = (chatId) => (dispatch) =>
  api.subscribeToChat(chatId, async (chat) => {
    const joinedUsers = await Promise.all(
      chat.joinedUsers.map(async (userRef) => {
        const snapshot = await userRef.get();
        return { id: snapshot.id, ...snapshot.data() };
      })
    );
    chat.joinedUsers = joinedUsers;
    dispatch({ type: chatActionType.SET_ACTIVE_CHAT, payload: chat });
  });

export const subscribeToProfile = (userId, chatId) => (dispatch) => {
  return api.subscribeToJoinedUser(userId, (user) => {
    dispatch({
      type: chatActionType.CHATS_UPDATE_USER_STATE,
      payload: { user, chatId },
    });
  });
};

export const sendChatMessage =
  (message, chatId) => async (dispatch, getState) => {
    try {
      const { user } = getState().auth;
      const userRef = db.doc(`profiles/${user.uid}`);

      message.author = userRef;

      await api.sendMessage(message, chatId);

      dispatch({ type: chatActionType.SEND_MESSAGE });
    } catch (error) {
      console.error(error.message);
    }
  };

export const subscribeToMessages = (chatId) => (dispatch) => {
  return api.subscribeToMessage(chatId, async (messages) => {
    const newMessage = await Promise.all(
      messages.map(async (message) => {
        if (message.type === 'added') {
          const userRef = message.doc.data().author;
          const userSnapshot = await userRef.get();
          // let author = userSnapshot.data();
          let newMes = {
            id: message.doc.id,
            ...message.doc.data(),
            author: userSnapshot.data(),
          };

          return newMes;
        }
      })
    );

    dispatch({
      type: chatActionType.CHATS_SET_MESSAGES,
      payload: { chatId, messages: newMessage },
    });
  });
};
