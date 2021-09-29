import React, { useEffect, useState } from 'react';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const MAX_RENDER = 12;

function IngredientsDrinksCards() {
  const [drinksIngredients, setDrinksIngredients] = useState([]);

  useEffect(() => {
    async function fetchMealsIngredients() {
      const { drinks } = await fetch(API_URL)
        .then((res) => res.json());
      setDrinksIngredients(drinks);
    }
    fetchMealsIngredients();
  }, []);

  return (
    <div>
      {drinksIngredients.map((elements, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-card` }
        >
          <img src={ `https://www.thecocktaildb.com/images/ingredients/${elements.strIngredient1}-Small.png` } alt={ `${elements.strIngredient1}` } data-testid={ `${index}-card-img` } />
          <p
            key={ index }
            data-testid={ `${index}-card-name` }
          >
            {elements.strIngredient1}
          </p>
        </div>)).splice(0, MAX_RENDER)}
    </div>
  );
}

export default IngredientsDrinksCards;
