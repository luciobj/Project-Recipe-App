import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import LoginProvider from './utils/LoginProvider';
import MealsPage from './pages/MealsPage';
import Explore from './pages/Explore';
import ExploreMeals from './pages/ExploreMeals';
import ExploreDrinks from './pages/ExploreDrinks';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ MealsPage } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreMeals } />
        <Route exact path="explorar/bebidas" component={ ExploreDrinks } />
      </Switch>
    </LoginProvider>
  );
}

export default App;
