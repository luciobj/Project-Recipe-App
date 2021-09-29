import React from 'react';
import Header from '../Components/Header';
import FavoriteCards from '../Components/FavoritesCards'

const FavoriteRecipes = () => (
  <div>
    <Header title="Receitas Favoritas" containBtnSearch />
    <FavoriteCards />
  </div>
);

export default FavoriteRecipes;
