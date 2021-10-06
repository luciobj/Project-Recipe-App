import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';

function MealsCards() {
  const maxLength = 12;
  const { meals, search, mealsIngredients } = useContext(RecipesContext);

  if (meals === null || meals === undefined) {
    return global.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  }
  if (meals.length === 1 && search === 'bar') {
    return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
  }

  function mealsCards(item) {
    return (item.length > 0 ? item
      .map(({ idMeal, strMealThumb, strMeal, strCategory }, index) => (
        <Link
          key={ idMeal }
          to={ `/comidas/${idMeal}` }
        >
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h3
              data-testid={ `${index}-card-name` }
              category={ strCategory }
              id={ idMeal }
            >
              { strMeal }
            </h3>
          </div>
        </Link>
      )).slice(0, maxLength) : <p>Carregando comidas</p>);
  }

  return (
    <div>
      {mealsIngredients.length > 0 ? mealsCards(mealsIngredients) : mealsCards(meals)}
    </div>
  );
}

export default MealsCards;
