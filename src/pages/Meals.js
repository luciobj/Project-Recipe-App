import React from 'react';

// import RecipesProvider from '../context/recipesProvider';
import Header from '../Components/Header';
import Categories from '../Components/Categories';
import MealsCards from '../Components/MealsCards';
import Footer from '../Components/Footer';

const Meals = () => (
  <div>
    <Header title="Comidas" />
    <Categories mealOrDrink="meal" />
    <MealsCards />
    <Footer />
  </div>
);

export default Meals;
