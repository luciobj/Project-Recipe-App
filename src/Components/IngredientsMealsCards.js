import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const maxLength = 12;

function IngredientsMealsCards() {
  // const history = useHistory();
  const { setMealsIngredients } = useContext(RecipesContext);
  const [mealsItems, setMealsItems] = useState([]);

  const IMAGE_API_URL = 'https://www.themealdb.com/images/ingredients/';

  useEffect(() => {
    async function fetchMealsIngredients() {
      const { meals } = await fetch(API_URL)
        .then((res) => res.json());
      setMealsItems(meals);
    }
    fetchMealsIngredients();
  }, []);

  // function handleClick(item) {
  //   if (item) {
  //     setMealsIngredients(item);
  //     // history.push('/comidas');
  //     console.log(mealsIngredients);
  //   }
  // }

  return (
    <>
      {mealsItems.map(({ strIngredient }, index) => (
        <Link
          to="/comidas"
          key={ index }
          value={ strIngredient }
          data-testid={ `${index}-ingredient-card` }
          onClick={ ({ target }) => setMealsIngredients(target.value) }
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
