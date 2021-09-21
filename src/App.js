import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import LoginProvider from './utils/LoginProvider';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Route to="/" component={ Login } />
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
