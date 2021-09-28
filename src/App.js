import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import LoginProvider from './utils/LoginProvider';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import ExploreMeals from './pages/ExploreMeals';
import ExploreDrinks from './pages/ExploreDrinks';
import IngredientsExplore from './pages/IngredientsExplore';
import OriginExplore from './pages/OriginExplore';
import RecipesMade from './pages/RecipesMade';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MealDetails from './pages/MealDetails';

function App() {
  return (
    <Switch>
      <LoginProvider>
        <Route exact path="/" component={ Login } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ RecipesMade } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreMeals } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ IngredientsExplore }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ IngredientsExplore }
        />
        <Route exact path="/explorar/comidas/area" component={ OriginExplore } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/comidas/:id" component={ MealDetails } />
      </LoginProvider>
    </Switch>
  );
}

export default App;
