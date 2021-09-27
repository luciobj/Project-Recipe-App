import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';

import Login from './pages/Login';
import MealPage from './pages/MealPage';
import DrinksPage from './pages/DrinksPage';
import MealDetails from './pages/MealDetails'

function App() {
  return (
    <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ MealPage } />
          <Route exact path="/bebidas" component={ DrinksPage } />
          <Route exact path="/comidas/:id" component={ MealDetails } />
        </Switch>
    </div>
  );
}

export default App;
