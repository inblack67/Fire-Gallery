import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthState from './context/auth/AuthState'

ReactDOM.render(
  <AuthState>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthState>,
  document.getElementById('root')
);

serviceWorker.register();
