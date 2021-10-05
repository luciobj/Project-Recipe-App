import React, { useState } from 'react';
import '../styles/Header.css';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import ProfileIcon from './ProfileIcon';

function Header({ title, containBtnSearch = false }) {
  const [clickSearchIcon, setClickSearchIcon] = useState(false);
  if (clickSearchIcon) {
    return (
      <div>
        <button
          data-testid="search-top-btn"
          id="hide-button"
          src={ searchIcon }
          onClick={ () => setClickSearchIcon(false) }
          type="button"
          className="btn-search"
        >
          <img
            data-testid="search-icon"
            src={ searchIcon }
            alt="Icone de pesquisa"
          />
        </button>
        <SearchBar />
      </div>
    );
  }

  if (containBtnSearch) {
    return (
      <header className="header">
        <ProfileIcon />
        <h1 data-testid="page-title">{title}</h1>
      </header>
    );
  }

  return (
    <header className="header">
      <ProfileIcon />
      <h1 data-testid="page-title">{title}</h1>
      <button
        data-testid="search-top-btn"
        id="hide-button"
        onClick={ () => setClickSearchIcon(true) }
        type="button"
        src={ searchIcon }
        className="btn-search"
      >
        <img src={ searchIcon } alt="Icone de pesquisa" />
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  containBtnSearch: PropTypes.bool.isRequired,
};

export default Header;
