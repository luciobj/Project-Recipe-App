import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';

import Login from './pages/Login';
import MealsPage from './pages/MealsPage';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ MealsPage } />
      </Switch>
    </div>
  );
}

export default App;
