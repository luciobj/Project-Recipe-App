import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipesProvider from '../context/recipesProvider';

const OriginExplore = () => (
  <RecipesProvider>
    <div>
      <Header title="Explorar Origem" />
      <Footer />
    </div>
  </RecipesProvider>
);

export default OriginExplore;
