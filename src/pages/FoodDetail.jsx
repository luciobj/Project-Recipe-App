import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import logoShare from '../images/shareIcon.svg';
import logoFavorite from '../images/whiteHeartIcon.svg';
import '../Styles/FoodDetail.css';

export default function FoodDetail(props) {
  const { history } = props;
  const [recipe, setRecipe] = useState({});
  const [drinks, setDrinks] = useState({});


  function getIdRecipesDetails() {
    const id = history.location.pathname.replace('/comidas/', '');
    const idDetails = Number(id.replace('/', ''));
    return idDetails;
  }
  const idRecipe = getIdRecipesDetails();

  useEffect(() => {
    const fetchRecipeByID = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
      const object = await response.json();
      setRecipe(object);
    };
    fetchRecipeByID();
  }, [idRecipe]);

  function setIngredientsByQuantity(searchRecipe) {
    const maxIngredients = 15;
    const ingredients = [];
    const quantity = [];
    const infoRecipe = {
      listIngredient: [],
      listQuantity: [],
    };
    const ingredientsByQuantity = [];
    for (let index = 1; index <= maxIngredients; index += 1) {
      if (searchRecipe[`strIngredient${index}`]) {
        quantity.push(searchRecipe[`strMeasure${index}`]);
        ingredients.push(searchRecipe[`strIngredient${index}`]);
      }
    }
    infoRecipe.listIngredient = ingredients;
    infoRecipe.listQuantity = quantity;
    ingredientsByQuantity.push(infoRecipe);
    return ingredientsByQuantity;
  }

  function getIdvideo(urlVideo) {
    const idVideo = urlVideo.replace('https://www.youtube.com/watch?v=', '');
    return idVideo;
  }

  // async function fetchRecommendedDrinks() {
  //   const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  //   const object = await response.json();
  //   setDrinks(object);
  //   console.log(drinks);
  // }

  useEffect(() => {
    const fetchRecommendedDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const object = await response.json();
      setDrinks(object);
    };
    fetchRecommendedDrinks();
  }, []);


  const { meals } = recipe;

  return (
    <div>
      { meals && meals.map((recipeSelected) => (
        <div key={ recipeSelected.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ recipeSelected.strMealThumb }
            alt={ recipeSelected.strMeal }
          />
          <h1 data-testid="recipe-title">{ recipeSelected.strMeal }</h1>
          <h2 data-testid="recipe-category">{ recipeSelected.strCategory }</h2>
          <input
            data-testid="share-btn"
            type="image"
            src={ logoShare }
            alt="share-icon"
          />
          <input
            data-testid="favorite-btn"
            type="image"
            src={ logoFavorite }
            alt="favorite-icon"
          />

          <h1>Ingredients:</h1>
          {
            setIngredientsByQuantity(recipeSelected)
              .map((infoRecipes) => (
                infoRecipes.listIngredient.map((infoIngredient, index) => (
                  <p
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    { `- ${infoIngredient} - ${infoRecipes.listQuantity[index]}` }
                  </p>
                ))
              ))
          }
          <p data-testid="instructions">{ recipeSelected.strInstructions }</p>
          <h1>Video</h1>
          <div className="video-responsive">
            <iframe
              data-testid="video"
              src={ `https://www.youtube.com/embed/${getIdvideo(recipeSelected.strYoutube)}` }
              title="Embedded youtube"
            />
          </div>
        </div>
      )) }
      <h1>Recomendadas</h1>
      <div>
        {
          drinks['drinks'] && drinks['drinks'].map((drink) => (
            <div key={ drink.idDrink }>
              <img src={drink.strDrinkThumb} alt={drink.strDrink} />
            </div>
          ))
        }
      </div>
      <button
        id="start-recipe"
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

FoodDetail.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
