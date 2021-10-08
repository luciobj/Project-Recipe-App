import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import IngredientsMealsCards from '../Components/IngredientsMealsCards';
import IngredientsDrinksCards from '../Components/IngredientsDrinksCards';

function IngredientsExplore(props) {
  const { mealOrDrink } = props;
  return (
    <div>
      <Header title="Explorar Ingredientes" containBtnSearch />
      {mealOrDrink === 'Drinks' && <IngredientsDrinksCards />}
      {mealOrDrink === 'Meals' && <IngredientsMealsCards />}
      <Footer />
    </div>
  );
}

export default IngredientsExplore;

IngredientsExplore.propTypes = {
  props: PropTypes.shape({ mealOrDrink: PropTypes.string }),
}.isRequired;
