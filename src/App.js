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
import ExploreByIngredients from './pages/ExploreByIngredients';
import ExploreByArea from './pages/ExploreByArea';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ MealsPage } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreMeals } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreByIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes" 
          component={ ExploreByIngredients } 
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
      </Switch>
    </LoginProvider>
  );
}

export default App;
