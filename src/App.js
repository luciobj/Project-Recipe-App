import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import LoginProvider from './utils/LoginProvider';
import MealsPage from './pages/MealsPage';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/comidas" component={ MealsPage } />
      </Switch>
    </LoginProvider>
  );
}

export default App;
