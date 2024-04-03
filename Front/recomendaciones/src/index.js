import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './login';
import { BrowserRouter } from "react-router-dom";

import  AuthProvider  from "react-auth-kit";
import LoginForm from './nada';
import { App } from './App';
import createStore from 'react-auth-kit/createStore';
const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
      <React.StrictMode>
    <AuthProvider  store={store}>  
    <BrowserRouter>
           <App/>
           </BrowserRouter>
    </AuthProvider>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
