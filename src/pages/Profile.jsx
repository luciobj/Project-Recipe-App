import React from 'react';
import PropTypes from 'prop-types';
import logoProfile from '../images/profileIcon.svg';
import logoDrink from '../images/drinkIcon.svg';
import logoExplore from '../images/exploreIcon.svg';
import logoMeal from '../images/mealIcon.svg';

export default function Profile(props) {
  function getEmail() {
    if (localStorage.getItem('user')) {
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      const { email } = user;
      return email;
    } return '';
  }
  // const user = localStorage.getItem('user');
  const { history } = props;
  return (
    <div>
      <header>
        <img src={ logoProfile } alt="icon-profile" />
        <h2>Perfil</h2>
      </header>
      <p data-testid="profile-email">{ getEmail() }</p>

      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => { history.push('/receitas-feitas'); } }
      >
        Receitas Feitas
      </button>

      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => { history.push('/receitas-favoritas'); } }

      >
        Receitas Favoritas
      </button>

      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          history.push('/');
          localStorage.clear();
        } }
      >
        Sair
      </button>

      <footer>
        <img src={ logoDrink } alt="drinks" />
        <img src={ logoExplore } alt="explore" />
        <img src={ logoMeal } alt="foods" />
      </footer>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
