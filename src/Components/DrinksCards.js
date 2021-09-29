import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';

function DrinksCards() {
  const maxLength = 12;
  const { drinks, search } = useContext(RecipesContext);

  if (drinks === null || drinks === undefined) {
    return global.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  }
  if (drinks.length === 1 && search === 'bar') {
    return <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />;
  }

  return (
    <div>
      {drinks.length > 0 ? drinks
        .map(({ idDrink, strDrinkThumb, strDrink, strCategory }, index) => (
          <Link
            data-testid={ `${index}-recipe-card` }
            key={ idDrink }
            to={ `/bebidas/${idDrink}` }
          >
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
            <h3
              data-testid={ `${index}-card-name` }
              category={ strCategory }
              id={ idDrink }
            >
              { strDrink }
            </h3>
          </Link>
        )).slice(0, maxLength) : <p>Carregando bebidas</p> }
    </div>
  );
}

export default DrinksCards;
