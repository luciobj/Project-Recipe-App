import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/Carousel.css';

export default function Carousel(props) {
  const { recipes } = props;
  const maxRecomendations = 5;
  function recomendations() {
    const recipesRecommended = [];
    for (let index = 0; index <= maxRecomendations; index += 1) {
      // console.log(recipes[index]);
      if (recipes.meals) {
        recipesRecommended.push(recipes.meals[index]);
      } else {
        recipesRecommended.push(recipes.drinks[index]);
      }
    }
    return recipesRecommended;
  }

  if (recipes.meals) {
    return (
      <div className="carousel">
        {
          recipes.meals && recomendations().map((recipe, index) => (
            <div
              className="card-recomended"
              data-testid={ `${index}-recomendation-card` }
              key={ recipe.idMeal }
            >
              <img
                className="image-recomended"
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
              />
              <h2
                data-testid={ `${index}-recomendation-title` }
              >
                { recipe.strMeal }
              </h2>
              <p>{ recipe.strCategory }</p>
            </div>
          ))
        }
      </div>
    );
  } return (
    <div className="carousel">
      {
        recipes.drinks && recomendations().map((recipe, index) => (
          <div
            className="card-recomended"
            data-testid={ `${index}-recomendation-card` }
            key={ recipe.idDrink }
          >
            <img
              className="image-recomended"
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />
            <h2
              data-testid={ `${index}-recomendation-title` }
            >
              { recipe.strDrink }
            </h2>
            <p>{ recipe.strCategory }</p>
          </div>
        ))
      }
    </div>
  );
}

Carousel.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
