import { chatActionType } from '../type/chatActionType';

export const chatReducer = (
  state = { items: [], isCreating: null },
  action
) => {
  switch (action.type) {
    case chatActionType.FETCH_CHATS:
      return { ...state, items: action.payload };
    case chatActionType.JOIN_CHAT_SUCCESS:
      return { ...state, isCreating: false };
    case chatActionType.CLEAN_STATE:
      return {
        ...state,
        isCreating: null,
      };
    default:
      return state;
  }
};
