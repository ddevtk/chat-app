import { chatActionType } from '../type/chatActionType';

export const chatReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case chatActionType.FETCH_CHATS:
      return { items: action.payload };
    default:
      return state;
  }
};
