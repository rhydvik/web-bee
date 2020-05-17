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
        storage,
        whitelist: ['inventory', 'types'],
      },
      reducer,
    ),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore;
