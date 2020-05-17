import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import filters from './reducers/filters';

function configureStore(initialState = {}) {
  const reducer = combineReducers({
    filters: filters,
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
