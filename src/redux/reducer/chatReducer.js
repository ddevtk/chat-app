import { chatActionType } from '../type/chatActionType';

const DEFAULT_STATE = {
  activeChats: [],
  items: [],
  isCreating: null,
  isFetching: false,
  messages: {},
};

export const chatReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case chatActionType.FETCH_CHATS_INIT:
      return { ...state, isFetching: true };
    case chatActionType.FETCH_CHATS_SUCCESS:
      return { ...state, items: action.payload, isFetching: false };
    case chatActionType.JOIN_CHAT_SUCCESS:
      return { ...state, isCreating: false };
    case chatActionType.REFRESH_STATE_WHEN_CREATE_CHAT:
      return {
        ...state,
        isCreating: null,
      };

    case chatActionType.SET_ACTIVE_CHAT:
      const index = state.activeChats.findIndex((chat) => {
        return chat.id === action.payload.id;
      });
      if (index === -1) {
        state.activeChats.push(action.payload);
      } else {
        state.activeChats[index] = action.payload;
      }
      return { ...state, activeChats: state.activeChats };

    case chatActionType.CHATS_SET_MESSAGES:
      const preMessages = state.messages[action.payload.chatId] || [];
      console.log(preMessages);
      console.log(action.payload.messages);
      state.messages[action.payload.chatId] = [
        ...preMessages,
        ...action.payload.messages,
      ].reduce((pre, cur) => {
        // remove duplicates object in array
        if (!pre.some((obj) => obj.id === cur.id)) {
          pre.push(cur);
        }
        return pre;
      }, []);
      return {
        ...state,
      };

    case chatActionType.CHATS_UPDATE_USER_STATE:
      state.activeChats.forEach((chat) => {
        if (chat.id === action.payload.chatId) {
          chat.joinedUsers.forEach((jUser) => {
            if (jUser.id === action.payload.user.uid) {
              jUser.state = action.payload.user.state;
            }
          });
        }
      });
      return {
        ...state,
      };
    case chatActionType.CLEAN_STATE:
      return DEFAULT_STATE;
    default:
      return state;
  }
};
