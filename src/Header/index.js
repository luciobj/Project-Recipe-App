import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Index() {
  const [clickSearchIcon, setClickSearchIcon] = useState(false);

  if (clickSearchIcon) {
    return (
      <div>
        <button
          data-testid="search-top-btn"
          id="hide-button"
          onClick={ () => setClickSearchIcon(false) }
          type="button"
          className="btn-search"
        >
          <img data-testid="search-icon" src={ searchIcon } alt="Icone de pesquisa" />
        </button>
        <input type="text" data-testid="search-input" />
      </div>
    );
  }
  return (
    <header className="header">
      <button data-testid="profile-top-btn" type="button">
        <Link to="/perfil">
          <img data-testid="user-icon" src={ profileIcon } alt="User icon" />
        </Link>
      </button>
      <h1 data-testid="page-title">Comidas</h1>
      <button
        data-testid="search-top-btn"
        id="hide-button"
        onClick={ () => setClickSearchIcon(true) }
        type="button"
        className="btn-search"
      >
        <img src={ searchIcon } alt="Icone de pesquisa" />
      </button>
    </header>
  );
}

export default Index;
