import { chatActionType } from '../type/chatActionType';

export const chatReducer = (
  state = { activeChats: [], items: [], isCreating: null },
  action
) => {
  switch (action.type) {
    case chatActionType.FETCH_CHATS:
      return { ...state, items: action.payload };
    case chatActionType.JOIN_CHAT_SUCCESS:
      return { ...state, isCreating: false };
    case chatActionType.REFRESH_STATE_WHEN_CREATE_CHAT:
      return {
        ...state,
        isCreating: null,
      };
    case chatActionType.CLEAN_STATE:
      return {
        ...state,
        items: [],
        isCreating: null,
        activeChats: [],
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
    default:
      return state;
  }
};
