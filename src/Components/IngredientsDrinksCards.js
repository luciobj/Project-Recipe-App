import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';
import { fetchDrinkByIngredient } from '../services/drinksAPI';

const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const imageApiUrl = 'https://www.thecocktaildb.com/images/ingredients/';
const maxLength = 12;

function IngredientsDrinksCards() {
  const [drinksItems, setdrinksItems] = useState([]);
  const { setDrinksIngredients } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchDrinksIngredients() {
      const { drinks } = await fetch(apiUrl)
        .then((res) => res.json());
      setdrinksItems(drinks);
    }
    fetchDrinksIngredients();
  }, []);

  async function handleClick(item) {
    const meals = await fetchDrinkByIngredient(item);
    setDrinksIngredients(meals);
  }
  return (
    <div>
      {drinksItems.map(({ strIngredient1 }, index) => (
        <Link
          to="/bebidas"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => handleClick(strIngredient1) }
        >
          <img
            src={ `${imageApiUrl}${strIngredient1}-Small.png` }
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
    </div>
  );
}

export default IngredientsDrinksCards;
