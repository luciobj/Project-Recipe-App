import React from 'react';
import Categories from '../components/Categories';
import SearchBar from '../components/SearchBar';

function MealsPage() {
  return (
    <div>
      <SearchBar />
      { Categories('meal') }
    </div>
  );
}

export default MealsPage;
