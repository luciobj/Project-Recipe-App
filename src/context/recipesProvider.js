import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState('');
  const [mealsIngredients, setMealsIngredients] = useState([]);
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const [areas, setAreas] = useState([]);

  const contextValue = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    search,
    setSearch,
    mealsIngredients,
    setMealsIngredients,
    drinksIngredients,
    setDrinksIngredients,
    areas,
    setAreas,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
