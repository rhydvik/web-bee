import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import filters from './reducers/filters';
import types from './reducers/types';

import state from './initialState';

function configureStore(initialState = state) {
  const reducer = combineReducers({
    filters: filters,
    types,
  });

  const store = createStore(
    persistReducer(
      {
        key: 'root',
        debug: true,
        storage,
        whitelist: ['auth', 'filters'],
      },
      reducer,
    ),
    initialState,
  );

  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore;
