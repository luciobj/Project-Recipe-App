import React, { useEffect, useState } from 'react';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const MAX_RENDER = 12;

function IngredientsMealsCards() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      const { meals } = await fetch(API_URL)
        .then((res) => res.json());
      setIngredients(meals);
    }
    fetchIngredients();
  }, []);

  return (
    <div>
      {ingredients.map((elements, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-card` }
        >
          <img src={ `https://www.themealdb.com/images/ingredients/${elements.strIngredient}-Small.png` } alt={ `${elements.strIngredient}` } data-testid={ `${index}-card-img` } />
          <p
            key={ index }
            data-testid={ `${index}-card-name` }
          >
            {elements.strIngredient}
          </p>
        </div>)).splice(0, MAX_RENDER)}
    </div>
  );
}

export default IngredientsMealsCards;
