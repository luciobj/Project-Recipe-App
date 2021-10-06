import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import logoShare from '../images/shareIcon.svg';
import logoFavorite from '../images/whiteHeartIcon.svg';
import logoFavoriteChecked from '../images/blackHeartIcon.svg';
import Carousel from '../Components/Carousel';
import '../styles/FoodDetail.css';

export default function FoodDetail(props) {
  let favoriteRecipes = [];
  const STORED = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { history } = props;
  const [recipe, setRecipe] = useState({});
  const [drinks, setDrinks] = useState({});
  const [copied, setCopied] = useState(false);
  const [recipeFavorited, setRecipeFavorited] = useState(false);
  const [recipeFinished, setRecipeFinished] = useState(false);
  // const [recipeInProgress, setRecipeInProgress] = useState(false);

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

  useEffect(() => {
    const fetchRecommendedDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const object = await response.json();
      setDrinks(object);
    };
    fetchRecommendedDrinks();
  }, []);

  const { meals } = recipe;

  useEffect(() => {
    if (meals) {
      meals.map((meal) => {
        if (localStorage.getItem('favoriteRecipes')) {
          const idRecipeFavorite = JSON
            .parse(localStorage.getItem('favoriteRecipes'))[0].id;
          if (idRecipeFavorite === meal.idMeal) {
            setRecipeFavorited(true);
          } else {
            setRecipeFavorited(false);
          }
          return idRecipeFavorite;
        }
        return '';
      });
    }
  }, [meals]);

  function handleInProgress() {
    const inProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress) {
      const keysInProgres = Object.keys(inProgress.meals);
      if (keysInProgres) {
        if (keysInProgres.filter((key) => Number(key) === idRecipe)) {
          return true;
        }
        return false;
      }
    } else {
      return false;
    }
  }

  function handleDoneRecipes() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const finishedRecipe = doneRecipes
        .filter((finished) => Number(finished.id) === idRecipe);
      if (finishedRecipe.length !== 0) {
        setRecipeFinished(true);
      }
    }
    return (
      <button
        id="start-recipe"
        className="start-recipe"
        hidden={ recipeFinished }
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => {
          history.push(`/comidas/${idRecipe}/in-progress`);
        } }
      >
        { handleInProgress() ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    );
  }

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
            // Referência para implementar link de compartilhar:  https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard?rq=1
            onClick={ () => {
              const timer = 2000;
              const path = history.location.pathname;
              navigator.clipboard.writeText(`http://localhost:3000${path}`);
              setCopied(true);
              setTimeout(() => setCopied(false), timer);
            } }
          />
          {
            !recipeFavorited ? <input
              data-testid="favorite-btn"
              type="image"
              src={ logoFavorite }
              onClick={ () => {
                const newFavorited = {
                  id: recipeSelected.idMeal,
                  type: 'comida',
                  area: recipeSelected.strArea,
                  category: recipeSelected.strCategory,
                  alcoholicOrNot: '',
                  name: recipeSelected.strMeal,
                  image: recipeSelected.strMealThumb,
                };
                if (STORED) {
                  favoriteRecipes = [...STORED, newFavorited];
                  localStorage
                    .setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
                  setRecipeFavorited(!recipeFavorited);
                } else {
                  favoriteRecipes.push(newFavorited);
                  localStorage
                    .setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
                  setRecipeFavorited(!recipeFavorited);
                }
              } }
              alt="favorite-icon"
            /> : <input
              data-testid="favorite-btn"
              type="image"
              src={ logoFavoriteChecked }
              onClick={ () => {
                if (STORED) {
                  const updateStorage = STORED
                    .filter((favorite) => Number(favorite.id) !== idRecipe);
                  localStorage
                    .setItem('favoriteRecipes', JSON.stringify(updateStorage));
                  setRecipeFavorited(!recipeFavorited);
                }
              } }
              alt="favorite-icon"
            />
          }

          { copied && <p>Link copiado!</p> }

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
          <h3>Instructions:</h3>
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
      { drinks.drinks && <Carousel recipes={ drinks } /> }
      { !recipeFinished && handleDoneRecipes() }
    </div>
  );
}

FoodDetail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
