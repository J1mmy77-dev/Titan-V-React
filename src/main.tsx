// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import NotificationPanel from './components/NotificationPanel';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <NotificationPanel />
    </Provider>
  </React.StrictMode>,
);