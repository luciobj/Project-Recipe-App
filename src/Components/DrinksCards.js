import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import RecipesContext from '../context/recipesContext';
import PropTypes from 'prop-types';

function DrinksCards(props) {
  const maxLength = 12;
  const { drinks } = useContext(RecipesContext);

  if (drinks === null || drinks === undefined) {
    return global.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  }
  if (drinks.length === 1) {
    return <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />;
  }

  const { history } = props;

  return (
    <div>
      {drinks.length > 0 ? drinks
        .map(({ idDrink, strDrinkThumb, strDrink, strCategory }, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ idDrink }
            onClick={ () => history.push(`/bebidas/${idDrink}`) }
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
            >{ strDrink }</h3>
          </div>
        )).slice(0, maxLength) : <p>Carregando bebidas</p> }
    </div>
  );
}

export default DrinksCards;

DrinksCards.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
