import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import logoShare from '../images/shareIcon.svg';
import logoFavorite from '../images/whiteHeartIcon.svg';
import logoFavoriteChecked from '../images/blackHeartIcon.svg';
import Carousel from '../Components/Carousel';

export default function DrinkDetail(props) {
  let favoriteRecipes = [];
  const STORED = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { history } = props;
  const [recipe, setRecipe] = useState({});
  const [foods, setFoods] = useState({});
  const [copied, setCopied] = useState(false);
  const [recipeFavorited, setRecipeFavorited] = useState(false);
  const [recipeFinished, setRecipeFinished] = useState(false);
  // const [recipeInProgress, setRecipeInProgress] = useState(false);

  function getIdRecipesDetails() {
    const id = history.location.pathname.replace('/bebidas/', '');
    const idDetails = Number(id.replace('/', ''));
    return idDetails;
  }
  const idRecipe = getIdRecipesDetails();

  useEffect(() => {
    const fetchRecipeByID = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
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

  useEffect(() => {
    const fetchRecommendedFoods = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const object = await response.json();
      setFoods(object);
    };
    fetchRecommendedFoods();
  }, []);

  const { drinks } = recipe;

  useEffect(() => {
    if (drinks) {
      drinks.map((drink) => {
        if (localStorage.getItem('favoriteRecipes')) {
          const idRecipeFavorite = JSON
            .parse(localStorage.getItem('favoriteRecipes'))[0].id;
          if (idRecipeFavorite === drink.idDrink) {
            setRecipeFavorited(true);
          } else {
            setRecipeFavorited(false);
          }
          return idRecipeFavorite;
        }
        return '';
      });
    }
  }, [drinks]);

  function handleInProgress() {
    const inProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress) {
      const keysInProgres = Object.keys(inProgress.cocktails);
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
      if (finishedRecipe) {
        setRecipeFinished(!recipeFinished);
      }
    }

    return (
      <button
        id="start-recipe"
        className="start-recipe"
        data-testid="start-recipe-btn"
        hidden={ recipeFinished }
        type="button"
        onClick={ () => {
          history.push(`/bebidas/${idRecipe}/in-progress`);
        } }
      >
        { handleInProgress() ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    );
  }

  return (
    <div>
      { drinks && drinks.map((recipeSelected) => (
        <div key={ recipeSelected.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ recipeSelected.strDrinkThumb }
            alt={ recipeSelected.strDrink }
          />
          <h1 data-testid="recipe-title">{ recipeSelected.strDrink }</h1>
          <h2 data-testid="recipe-category">{ recipeSelected.strAlcoholic }</h2>
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
                  id: recipeSelected.idDrink,
                  type: 'bebida',
                  area: '',
                  category: recipeSelected.strCategory,
                  alcoholicOrNot: recipeSelected.strAlcoholic,
                  name: recipeSelected.strDrink,
                  image: recipeSelected.strDrinkThumb,
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
        </div>
      )) }
      <h1>Recomendadas</h1>
      { foods.meals && <Carousel recipes={ foods } /> }
      { !recipeFinished && handleDoneRecipes() }
    </div>
  );
}

DrinkDetail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
