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

  const handleUnfavorite = ({ target }) => {
    const { id } = target;
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = localFavorites.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    alterLocalStorageChange((prevState) => !prevState);
  };

  const cardsMap = (array) => (
    array.map(({ id, type, area, category, alcoholicOrNot, name, image }, index) => (
      <div key={ id }>
        <Link to={ `/${type}s/${id}` }>
          <div data-testid={ `${index}-horizontal-card` }>
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
              width="200px"
              height="200px"
            />
            <div data-testid={ `${index}-horizontal-top-text` }>
              <p data-testid={ `${index}-horizontal-area` }>
                { `${area} - ${category}` }
              </p>
              <p data-testid={ `${index}-horizontal-alcoholic` }>{ alcoholicOrNot }</p>
            </div>
            <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
          </div>
        </Link>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => {
            const timer = 2000;
            navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
            setCopied(true);
            setTimeout(() => setCopied(false), timer);
          } }
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="Share Icon" />
          { copied && <p>Link copiado!</p> }
        </button>
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          id={ id }
          onClick={ handleUnfavorite }
          src={ likeIcon }
        >
          <img id={ id } src={ likeIcon } alt="Like Icon" />
        </button>
      </div>
    ))
  );

  useEffect(() => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavorites !== null && localFavorites !== undefined) {
      setFavorites(localFavorites);
    }
  }, [localStorageChange]);

  const handleFilters = ({ target }) => {
    const { name } = target;
    const types = {
      Todos: [],
      Comidas: (favorites.filter((recipe) => recipe.type === 'comida')),
      Bebidas: (favorites.filter((recipe) => recipe.type === 'bebida')),
    };
    setFiltered(types[name]);
  };

  return (
    <div>
      <div>
        <FavoriteFilters onClick={ handleFilters } text="Todos" />
        <FavoriteFilters onClick={ handleFilters } text="Comidas" />
        <FavoriteFilters onClick={ handleFilters } text="Bebidas" />
        { !favorites.length > 0 && <p>Você ainda não tem nenhuma receita favoritada!</p> }
        { !filtered.length > 0 && favorites.length > 0 && cardsMap(favorites) }
        { filtered.length > 0 && cardsMap(filtered) }
      </div>
    </div>
  );
}

export default FavoriteCards;
