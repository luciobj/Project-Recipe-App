import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/blackHeartIcon.svg';
import FavoriteFilters from './FavoriteFilters';

function FavoriteCards() {
  const [favorites, setFavorites] = useState([]);
  const [localStorageChange, alterLocalStorageChange] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filtered, setFiltered] = useState([]);

  // const favoritesMock = [{
  //   id: "11007",
  //   type: "bebida",
  //   area: "",
  //   category: "Ordinary Drink",
  //   alcoholicOrNot: "Alcoholic",
  //   name: "Margarita",
  //   image: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
  // }, {
  //   id: "53015",
  //   type: "comida",
  //   area: "American",
  //   category: "Dessert",
  //   alcoholicOrNot: "",
  //   name: "Krispy Kreme Donut",
  //   image: "https://www.themealdb.com/images/media/meals/4i5cnx1587672171.jpg"
  // }, {
  //   id: "12776",
  //   type: "bebida",
  //   area: "",
  //   category: "Coffee / Tea",
  //   alcoholicOrNot: "Non alcoholic",
  //   name: "Coffee mug",
  //   image: "https://www.thecocktaildb.com/images/media/drink/xwtptq1441247579.jpg"
  // }];
  // localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesMock));

  const cardsMap = (array) => {
    return (
      array.map(({ id, type, area, category, alcoholicOrNot, name, image }, index) => (
        <div key={ id }>
          <Link to={`/${type}s/${id}`}>
            <div data-testid={ `${index}-horizontal-card` }>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
                width= "200px"
                height= "200px"
              />
              <div data-testid={ `${index}-horizontal-top-text` }>
                <p data-testid={ `${index}-horizontal-area` }>{ area } - { category }</p>
                <p data-testid={ `${index}-horizontal-alcoholic` }>{ alcoholicOrNot }</p>
              </div>
              <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
            </div>
          </Link>
          <button
            type='button'
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => {
              const timer = 2000;
              navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
              setCopied(true);
              setTimeout(() => setCopied(false), timer);
            } }
            src={ shareIcon }
          >
            { copied && <p>Link copiado!</p> }
          </button>
          <button
            type='button'
            data-testid={ `${index}-horizontal-favorite-btn` }
            id={ id } 
            onClick={ handleUnfavorite }
            src={ likeIcon }
          />
        </div>
      ))
    );
  };

  const updateFavorites = () => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(localFavorites);
  };

  useEffect(() => {
    updateFavorites();
  }, [localStorageChange]);

  const handleFilters = ({ target }) => {
    const { name } = target;
    const types = {
      "Todos": [],
      "Comidas":  () => {
        return favorites.filter((recipe) => recipe.type === "comida")
      },
      "Bebidas":  () => {
        return favorites.filter((recipe) => recipe.type === "bebida")
      },
    };
    const filter = types[name];
    return setFiltered(filter);
  };

  const handleUnfavorite = ({ target }) => {
    const { id } = target;
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = localFavorites.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    alterLocalStorageChange((prevState) => !prevState);
  };

  return (
    <div>
      <div>
        <FavoriteFilters onClick={ handleFilters } text="Todos" />
        <FavoriteFilters onClick={ handleFilters } text="Comidas" />
        <FavoriteFilters onClick={ handleFilters } text="Bebidas" />
        { favorites.length > 0 ?
          (filtered.length > 0 ? cardsMap(filtered) : cardsMap(favorites)) :
          <p>Você ainda não tem nenhuma receita favoritada!</p> }
      </div>
    </div>
  );
}

export default FavoriteCards;
