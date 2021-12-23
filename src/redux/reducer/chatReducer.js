import { chatActionType } from '../type/chatActionType';

export const chatReducer = (
  state = { activeChats: [], items: [], isCreating: null, isFetching: false },
  action
) => {
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
    case chatActionType.CLEAN_STATE:
      return {
        items: [],
        isCreating: null,
        activeChats: [],
        isFetching: false,
      };
    case chatActionType.SET_ACTIVE_CHAT:
      state.activeChats.push(action.payload);

      const newArr = state.activeChats.reduce((pre, cur) => {
        if (!pre.some((obj) => obj.id === cur.id)) {
          pre.push(cur);
        }
        return pre;
      }, []);

      return { ...state, activeChats: newArr };
    case chatActionType.CHATS_UPDATE_USER_STATE:
      const { chatId, user } = action.payload;
      state.activeChats.forEach((chat) => {
        if (chat.id === chatId) {
          chat.joinedUsers.forEach((jUser) => {
            if (jUser.id === user.uid) {
              console.log(jUser);
              jUser.state = user.state;
            }
          });
        }
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};
