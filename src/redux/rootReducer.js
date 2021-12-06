import { combineReducers } from 'redux';
import { chatReducer } from './reducer/chatReducer';

const rootReducer = combineReducers({
  chats: chatReducer,
});

export default rootReducer;
