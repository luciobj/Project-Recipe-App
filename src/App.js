import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import MealDetail from './pages/MealDetail';
import DrinkDetail from './pages/DrinkDetail';
import LoginProvider from './context/LoginProvider';
import Explore from './pages/Explore';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import ExploreMeals from './pages/ExploreMeals';
import ExploreDrinks from './pages/ExploreDrinks';
import IngredientsExplore from './pages/IngredientsExplore';
import OriginExplore from './pages/OriginExplore';
import RecipesMade from './pages/RecipesMade';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MealInProgress from './pages/MealInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import PageNotFound from './pages/PageNotFound';
import RecipesProvider from './context/recipesProvider';

function App() {
  return (
<<<<<<< HEAD
    <RecipesProvider>
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
            render={ (props) => <IngredientsExplore { ...props } mealOrDrink="Meals" /> }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            render={ (props) => <IngredientsExplore { ...props } mealOrDrink="Drinks" /> }
          />
          <Route exact path="/explorar/comidas/area" component={ OriginExplore } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route exact path="/comidas/:id" component={ MealDetails } />
          <Route component={ PageNotFound } />
        </Switch>
      </LoginProvider>
    </RecipesProvider>
=======
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
        <Route exact path="/explorar/comidas/area" component={ OriginExplore } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/comidas/:id" component={ MealDetail } />
        <Route exact path="/bebidas/:id" component={ DrinkDetail } />
        <Route
          exact
          path="comidas/comidas/:id/in-progress"
          component={ MealInProgress }
        />
        <Route
          exact
          path="bebidas/bebidas/:id/in-progress"
          component={ DrinkInProgress }
        />
        <Route component={ PageNotFound } />
      </Switch>
    </LoginProvider>
>>>>>>> main-group-23
  );
}

export default App;
