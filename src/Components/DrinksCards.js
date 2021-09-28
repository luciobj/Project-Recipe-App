import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import RecipesContext from '../context/recipesContext';

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
      {drinks
        .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
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
            <h3 data-testid={ `${index}-card-name` }>{ strDrink }</h3>
          </div>
        )).slice(0, maxLength)}
    </div>
  );
}

export default DrinksCards;
