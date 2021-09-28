import React from 'react';

import RecipesProvider from '../context/recipesProvider';
import Header from '../Components/Header';
import Categories from '../Components/Categories';
import DrinksCards from '../Components/DrinksCards';
import Footer from '../Components/Footer';

const Drinks = () => (
  <RecipesProvider>
    <div>
      <Header title="Bebidas" />
      <Categories mealOrDrink="drink" />
      <DrinksCards />
      <Footer />
    </div>
  </RecipesProvider>
);

export default Drinks;
