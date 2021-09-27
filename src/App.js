import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import LoginProvider from './utils/LoginProvider';
import MealsPage from './pages/MealsPage';
import FoodDetail from './pages/FoodDetail';
import DrinkDetail from './pages/DrinkDetail';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/comidas" component={ MealsPage } />
        <Route
          exact
          path="/comidas/52787"
          component={ FoodDetail }
        />
        <Route
          exact
          path="/bebidas/11007"
          component={ DrinkDetail }
        />
      </Switch>
    </LoginProvider>
  );
}

export default App;
