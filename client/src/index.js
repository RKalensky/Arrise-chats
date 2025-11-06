import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import initStore from './store';

import App from './App';

import './assets/styles/index.scss';

const store = initStore();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
