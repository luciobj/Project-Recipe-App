import React from 'react';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Categories from '../Components/Categories';

const Meals = () => (
  <div>
    <Header title="Comidas" />
    <Categories mealOrDrink="meal" />
    <Footer />
  </div>
);

export default Meals;
