import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';

function MealsCards() {
  const maxLength = 12;
  const { meals } = useContext(RecipesContext);

  if (meals === null || meals === undefined) {
    return global.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  }
  if (meals.length === 1) {
    return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
  }

  return (
    <div>
      {meals.length > 0 ? meals
        .map(({ idMeal, strMealThumb, strMeal, strCategory }, index) => (
          <Link
            data-testid={ `${index}-recipe-card` }
            key={ idMeal }
            to={ `/comidas/${ idMeal }` }
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h3
              data-testid={ `${index}-card-name` }
              category={ strCategory }
              id={ idMeal }
            >{ strMeal }</h3>
          </Link>
        )).slice(0, maxLength) : <p>Carregando comidas</p>}
    </div>
  );
}

export default MealsCards;
