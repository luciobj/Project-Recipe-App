import React from 'react';

import RecipesProvider from '../context/recipesProvider';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import DrinksCards from '../Components/DrinksCards';

const Drinks = () => (
  <RecipesProvider>
    <div>
      <Header title="Bebidas" />
      <Footer />
      <DrinksCards />
    </div>
  </RecipesProvider>
);

export default Drinks;
