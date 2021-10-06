import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const maxLength = 12;
const IMAGE_API_URL = 'https://www.thecocktaildb.com/images/ingredients/';

function IngredientsDrinksCards() {
  const [drinksItems, setdrinksItems] = useState([]);
  const { setDrinksIngredients } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchDrinksIngredients() {
      const { drinks } = await fetch(API_URL)
        .then((res) => res.json());
      setdrinksItems(drinks);
    }
    fetchDrinksIngredients();
  }, []);

  return (
    <>
      {drinksItems.map(({ strIngredient1 }, index) => (
        <Link
          to="/bebidas"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => setDrinksIngredients(strIngredient1) }
        >
          <img
            src={ `${IMAGE_API_URL}${strIngredient1}-Small.png` }
            alt={ `${strIngredient1}` }
            data-testid={ `${index}-card-img` }
          />
          <p
            key={ index }
            data-testid={ `${index}-card-name` }
          >
            {strIngredient1}
          </p>
        </Link>)).splice(0, maxLength)}
    </>
  );
}

export default IngredientsDrinksCards;
