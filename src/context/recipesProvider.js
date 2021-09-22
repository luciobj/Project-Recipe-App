import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const contextValue = {
    setMeals,
    setDrinks,
  };

  console.log(meals);
  console.log(drinks);

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
