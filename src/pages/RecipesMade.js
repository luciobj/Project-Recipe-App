import React from 'react';
import Header from '../Components/Header';
import DoneRecipesCards from '../Components/DoneRecipesCards';

const RecipesMade = () => (
  <div>
    <Header title="Receitas Feitas" containBtnSearch />

    <button type="button" data-testid="filter-by-all-btn">
      Todas as receitas
    </button>
    <button type="button" data-testid="filter-by-food-btn">
      Comidas
    </button>
    <button type="button" data-testid="filter-by-drink-btn">
      Bebidas
    </button>
    <DoneRecipesCards />
  </div>
);

export default RecipesMade;
