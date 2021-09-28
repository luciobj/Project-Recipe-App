import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          id="search-input"
          name="search-input"
          placeholder="Buscar Receita"
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
          data-testid="first-letter-search-radio"
        />
        {' '}
        Primeira letra
      </label>
      <div>
        <button type="button" data-testid="exec-search-btn">
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
