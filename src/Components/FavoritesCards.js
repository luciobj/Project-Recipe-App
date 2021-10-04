import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/blackHeartIcon.svg';

function FavoriteCards() {
  // const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favorites = [{
      id: "11007",
      type: "bebida",
      area: "",
      category: "Ordinary Drink",
      alcoholicOrNot: "Alcoholic",
      name: "Margarita",
      image: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
    }]
  return (
    <div>
      { favorites && favorites
        .map(({ id, area, category, alcoholicOrNot, name, image }, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ id }>
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-card-img` }
              width= "200px"
              height= "200px"
            />
            <p>{ area }</p>
            <p>{ category }</p>
            <h4 data-testid={ `${index}-card-name` }>{ name }</h4>
            <p>{ alcoholicOrNot }</p>
            <button type='button'>
              <img src={ shareIcon } alt="Share icon" />
            </button>
            <button type='button'>
              <img src={ likeIcon } alt="Liked icon" />
            </button>
          </div>
        )) }
    </div>
  );
}

export default FavoriteCards;
