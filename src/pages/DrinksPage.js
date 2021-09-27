import React from 'react';
import SearchBar from '../components/SearchBar';
import DrinksCards from '../components/DrinksCards';
import RecipesProvider from '../context/recipesProvider';

function DrinksPage() {
  return (
    <div>
      <RecipesProvider>
        <SearchBar />
        <DrinksCards />
      </RecipesProvider>
    </div>
  );
}

export default DrinksPage;
