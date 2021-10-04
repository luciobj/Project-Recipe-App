import React from 'react';
import Header from '../Components/Header';
import DoneRecipesCards from '../Components/DoneRecipesCards';

const RecipesMade = () => (
  <div>
    <Header title="Receitas Feitas" containBtnSearch />
    <DoneRecipesCards />
  </div>
);

export default RecipesMade;
