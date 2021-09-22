import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import RecipesProvider from './context/recipesProvider';

import Login from './pages/Login';
import MainPage from './pages/mainPage';

function App() {
  return (
    <div>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ MainPage } />
          <Route path="/bebidas" component={ MainPage } />
        </Switch>
      </RecipesProvider>
    </div>
  );
}

export default App;
