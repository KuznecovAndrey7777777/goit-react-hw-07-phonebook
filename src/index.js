import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
