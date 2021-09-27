import React from 'react';
import RecipesProvider from '../context/recipesProvider';
import SearchBar from '../components/SearchBar';
import MealsCards from '../components/MealsCards';

function MealPage() {
  return (
    <div>
      <RecipesProvider>
        <SearchBar />
        <MealsCards />
      </RecipesProvider>
    </div>
  );
}

export default MealPage;
