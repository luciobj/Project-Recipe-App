import React, { useContext, useState } from 'react';
import RecipesContext from '../context/recipesContext';
import {
  fetchMealByIngredient,
  fetchMealByName,
  fetchMealByFirstLetter,
} from '../services/mealsAPI';
import {
  fetchDrinkByIngredient,
  fetchDrinkByName,
  fetchDrinkByFirstLetter,
} from '../services/drinksAPI';

function SearchBar() {
  // ref pra pegar o pathname: https://surajsharma.net/blog/current-url-in-react
  // podemos utilizar o pathname pra renderizar as comidas e as bebidas quando estivermos em suas respectivas páginas;
  const url = window.location.pathname.replace('/', '');
  // declarei a variável 'firstLetter pois o lint reclamou que a string estava sendo duplicada;
  const firstLetter = 'first-letter';

  const { setMeals, setDrinks, setSearch } = useContext(RecipesContext);
  const [searchWord, setSearchWord] = useState('');
  const [typeOfFilter, setTypeOfFilter] = useState('');

  const getMeals = async () => {
    if (typeOfFilter === firstLetter && searchWord.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (typeOfFilter === 'ingredient') {
      const data = await fetchMealByIngredient(searchWord);
      setMeals(data);
      setSearch('bar');
    }
    if (typeOfFilter === 'name') {
      const data = await fetchMealByName(searchWord);
      setMeals(data);
      setSearch('bar');
    }
    if (typeOfFilter === firstLetter) {
      const data = await fetchMealByFirstLetter(searchWord);
      setMeals(data);
      setSearch('bar');
    }
  };

  const getDrinks = async () => {
    if (typeOfFilter === firstLetter && searchWord.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (typeOfFilter === 'ingredient') {
      const data = await fetchDrinkByIngredient(searchWord);
      setDrinks(data);
      setSearch('bar');
    }
    if (typeOfFilter === 'name') {
      const data = await fetchDrinkByName(searchWord);
      setDrinks(data);
      setSearch('bar');
    }
    if (typeOfFilter === firstLetter) {
      const data = await fetchDrinkByFirstLetter(searchWord);
      setDrinks(data);
      setSearch('bar');
    }
  };

  const handleClick = () => {
    if (url === 'comidas') getMeals();
    if (url === 'bebidas') getDrinks();
  };

  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          id="search-input"
          name="search-input"
          placeholder="Buscar Receita"
          onChange={ ({ target }) => setSearchWord(target.value) }
          data-testid="search-input"
        />
      </label>
      <br />
      <label htmlFor="radio-search">
        <input
          id="ingredient-search-radio"
          type="radio"
          name="radio-search"
          value="ingredient"
          onChange={ ({ target }) => setTypeOfFilter(target.value) }
          data-testid="ingredient-search-radio"
        />
        {' '}
        Ingrediente
      </label>
      {' '}
      <label htmlFor="radio-search">
        <input
          id="name-search-radio"
          type="radio"
          name="radio-search"
          value="name"
          onChange={ ({ target }) => setTypeOfFilter(target.value) }
          data-testid="name-search-radio"
        />
        {' '}
        Nome
      </label>
      {' '}
      <label htmlFor="radio-search">
        <input
          id="first-letter-search-radio"
          type="radio"
          name="radio-search"
          value="first-letter"
          onChange={ ({ target }) => setTypeOfFilter(target.value) }
          data-testid="first-letter-search-radio"
        />
        {' '}
        Primeira letra
      </label>
      <div>
        <button type="button" onClick={ handleClick } data-testid="exec-search-btn">
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
