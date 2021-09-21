import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Index() {
  return (
    <header>
      <button data-testid="profile-top-btn" type="button" className="">
        <img src={ profileIcon } alt="Icone de usuario" />
      </button>
      <h1 data-testid="page-title">
        Comidas
      </h1>
      <button data-testid="search-top-btn" type="button" className="">
        <img src={ searchIcon } alt="Icone de pesquisa" />
      </button>
    </header>
  );
}

export default Index;
