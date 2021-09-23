import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Explore from './Explore';
import Meals from './Meals';
import Drinks from './Drinks';
import ExploreMeals from './ExploreMeals';
import ExploreDrinks from './ExploreDrinks';
import IngredientsExplore from './IngredientsExplore';
import OriginExplore from './OriginExplore';
import LoginProvider from './utils/LoginProvider';
import RecipesMade from './RecipesMade';
import FavoriteRecipes from './FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Switch>
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
          <Route
            exact
            path="/explorar/comidas/area"
            component={ OriginExplore }
          />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        </Switch>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
