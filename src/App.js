import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';

import Login from './pages/Login';
import MainPage from './pages/mainPage';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ MainPage } />
      </Switch>
    </div>
  );
}

export default App;
