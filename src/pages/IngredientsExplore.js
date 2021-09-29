import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import IngredientsMealsCards from '../Components/IngredientsMealsCards';
import IngredientsDrinksCards from '../Components/IngredientsDrinksCards';

const URL = window.location.pathname;
function IngredientsExplore() {
  return (
    <div>
      <Header title="Explorar Ingredientes" containBtnSearch />
      {URL === '/explorar/bebidas/ingredientes'
        ? <IngredientsDrinksCards />
        : <IngredientsMealsCards />}
      <Footer />
    </div>
  );
}

export default IngredientsExplore;
