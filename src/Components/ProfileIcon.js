import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

function ProfileIcon() {
  return (
    <button src={ profileIcon } data-testid="profile-top-btn" type="button">
      <Link to="/perfil">
        <img data-testid="user-icon" src={ profileIcon } alt="User icon" />
      </Link>
    </button>
  );
}

export default ProfileIcon;
