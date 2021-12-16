import { combineReducers } from 'redux';
import { chatReducer } from './reducer/chatReducer';
import { authReducer } from './reducer/authReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  chats: chatReducer,
  auth: authReducer,
});

export default persistReducer(persistConfig, rootReducer);
