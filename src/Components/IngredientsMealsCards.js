import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';
import { fetchMealByIngredient } from '../services/mealsAPI';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const IMAGE_API_URL = 'https://www.themealdb.com/images/ingredients/';
const maxLength = 12;

function IngredientsMealsCards() {
  const { setMealsIngredients } = useContext(RecipesContext);
  const [mealsItems, setMealsItems] = useState([]);

  useEffect(() => {
    async function fetchMealsIngredients() {
      const { meals } = await fetch(API_URL)
        .then((res) => res.json());
      setMealsItems(meals);
    }
    fetchMealsIngredients();
  }, []);

  async function handleClick(item) {
    const meals = await fetchMealByIngredient(item);
    setMealsIngredients(meals);
  }

  return (
    <>
      {mealsItems.map(({ strIngredient }, index) => (
        <Link
          to="/comidas"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => {
            handleClick(strIngredient);
          } }
        >
          <img
            src={ `${IMAGE_API_URL}${strIngredient}-Small.png` }
            alt={ `${strIngredient}` }
            data-testid={ `${index}-card-img` }
          />
          <p
            key={ index }
            data-testid={ `${index}-card-name` }
          >
            {strIngredient}
          </p>
        </Link>)).splice(0, maxLength)}
    </>
  );
}

export default IngredientsMealsCards;
