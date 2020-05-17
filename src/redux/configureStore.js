import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import inventory from './reducers/inventory';
import types from './reducers/types';

import state from './initialState';

function configureStore(initialState = state) {
  const reducer = combineReducers({
    types,
    inventory,
  });

  const store = createStore(
    persistReducer(
      {
        key: 'root',
        debug: true,
        storage,
        whitelist: ['inventory', 'types'],
      },
      reducer,
    ),
    initialState,
  );

  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore;
