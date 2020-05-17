import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import './App.css';
import Routes from './Routes';

import configureStore from './redux/configureStore';

const { store, persistor } = configureStore();

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Routes />
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
