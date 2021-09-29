import React from 'react';

function FavoriteCards() {
  const favorites = JSON.parse(localStorage.getItem(''))
  return (
    <div>
      {favorites
        .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p>{ strArea }</p>
            <p>{ strCategory }</p>
            <h4 data-testid={ `${index}-card-name` }>{ strDrink }</h4>
            <button type='button'>
              <img />
            </button>
            <button type='button'></button>
          </div>
        )).slice(0, maxLength)}
    </div>
  );
}

export default FavoriteCards;
