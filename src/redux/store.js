import { createStore } from 'redux';

const store = createStore(() => {
  return {
    message: 'hello from store',
  };
});

export default store;
