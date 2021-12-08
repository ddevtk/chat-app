import { combineReducers } from 'redux';
import { chatReducer } from './reducer/chatReducer';
import { authReducer } from './reducer/authReducer';

const rootReducer = combineReducers({
  chats: chatReducer,
  auth: authReducer,
});

export default rootReducer;
