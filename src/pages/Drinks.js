import React from 'react';

import Header from '../Components/Header';
import Categories from '../Components/Categories';
import Footer from '../Components/Footer';

const Drinks = () => (
  <div>
    <Header title="Bebidas" />
    <Categories mealOrDrink="drink" />
    <Footer />
  </div>
);

export default Drinks;
