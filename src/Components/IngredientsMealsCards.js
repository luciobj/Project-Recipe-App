import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';
import { fetchMealByIngredient } from '../services/mealsAPI';

const apiUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const imageApiUrl = 'https://www.themealdb.com/images/ingredients/';
const maxLength = 12;

function IngredientsMealsCards() {
  const { setMealsIngredients } = useContext(RecipesContext);
  const [mealsItems, setMealsItems] = useState([]);

  useEffect(() => {
    async function fetchMealsIngredients() {
      const { meals } = await fetch(apiUrl)
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
            src={ `${imageApiUrl}${strIngredient}-Small.png` }
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
