import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const maxLength = 12;

function IngredientsDrinksCards() {
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const { setDrinks } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchDrinksIngredients() {
      const { drinks } = await fetch(API_URL)
        .then((res) => res.json());
      setDrinksIngredients(drinks);
    }
    fetchDrinksIngredients();
  }, []);

  return (
    <>
      {drinksIngredients.map((elements, index) => (
        <Link
          to="/bebidas"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ setDrinks(elements.strIngredient1) }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${elements.strIngredient1}-Small.png` }
            alt={ `${elements.strIngredient1}` }
            data-testid={ `${index}-card-img` }
          />
          <p
            key={ index }
            data-testid={ `${index}-card-name` }
          >
            {elements.strIngredient1}
          </p>
        </Link>)).splice(0, maxLength)}
    </>
  );
}

export default IngredientsDrinksCards;
