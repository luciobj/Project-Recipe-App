import React from 'react';

import RecipesProvider from '../context/recipesProvider';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import MealsCards from '../Components/MealsCards';

const Meals = () => (
  <RecipesProvider>
    <div>
      <Header title="Comidas" />
      <MealsCards />
      <Footer />
    </div>
  </RecipesProvider>
);

export default Meals;
