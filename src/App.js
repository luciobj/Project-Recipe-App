import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import RecipesProvider from './context/recipesProvider';

import Login from './pages/Login';
import MealPage from './pages/MealPage';
import DrinksPage from './pages/DrinksPage';

function App() {
  return (
    <div>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ MealPage } />
          <Route path="/bebidas" component={ DrinksPage } />
        </Switch>
      </RecipesProvider>
    </div>
  );
}

export default App;
