import React from 'react';
import PropTypes from 'prop-types';

// import RecipesProvider from '../context/recipesProvider';
import Header from '../Components/Header';
import Categories from '../Components/Categories';
import DrinksCards from '../Components/DrinksCards';
import Footer from '../Components/Footer';

const Drinks = (props) => {
  const { history } = props;
  return (
    <div>
      <Header title="Bebidas" />
      <Categories mealOrDrink="drink" />
      <DrinksCards history={ history } />
      <Footer />
    </div>
  );
};

export default Drinks;

Drinks.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;
