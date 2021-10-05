import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import IngredientsMealsCards from '../Components/IngredientsMealsCards';
import IngredientsDrinksCards from '../Components/IngredientsDrinksCards';
import RecipesProvider from '../context/recipesProvider';

const URL = window.location.pathname;
function IngredientsExplore() {
  return (
    <RecipesProvider>
      <div>
        <Header title="Explorar Ingredientes" containBtnSearch />
        {URL === '/explorar/bebidas/ingredientes'
          ? <IngredientsDrinksCards />
          : <IngredientsMealsCards />}
        <Footer />
      </div>
    </RecipesProvider>
  );
}

export default IngredientsExplore;
