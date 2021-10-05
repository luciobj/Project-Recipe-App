import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const maxLength = 12;

function IngredientsMealsCards() {
  const [mealsIngredients, setMealsIngredients] = useState([]);
  const { setMeals } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchMealsIngredients() {
      const { meals } = await fetch(API_URL)
        .then((res) => res.json());
      setMealsIngredients(meals);
    }
    fetchMealsIngredients();
  }, []);

  return (
    <>
      {mealsIngredients.map((elements, index) => (
        <Link
          to="/comidas"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => setMeals(elements.strIngredient) }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${elements.strIngredient}-Small.png` }
            alt={ `${elements.strIngredient}` }
            data-testid={ `${index}-card-img` }
          />
          <p
            key={ index }
            data-testid={ `${index}-card-name` }
          >
            {elements.strIngredient}
          </p>
        </Link>)).splice(0, maxLength)}
    </>
  );
}

export default IngredientsMealsCards;
