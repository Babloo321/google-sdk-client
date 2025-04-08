import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './rtk/store.js';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import CheckAuthProvider from './utils/AuthProvider.jsx';
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="695113974523-eiqdh9qmusu8hd12p24vg2sn8ldo9q1n.apps.googleusercontent.com">
    <BrowserRouter>
      <Provider store={store}>
        <CheckAuthProvider>
          <App />
        </CheckAuthProvider>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
