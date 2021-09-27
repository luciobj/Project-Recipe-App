import React from 'react';
import Categories from '../components/Categories';
import SearchBar from '../components/SearchBar';

function MealsPage() {
  return (
    <div>
      <SearchBar />
      <Categories mealOrDrink="meal" />
    </div>
  );
}

export default MealsPage;
