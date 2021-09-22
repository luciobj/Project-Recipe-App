import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import LoginProvider from './utils/LoginProvider';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
