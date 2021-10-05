import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipesProvider from '../context/recipesProvider';
import ExploreArea from '../Components/ExploreArea';

const OriginExplore = () => (
  <RecipesProvider>
    <div>
      <Header title="Explorar Origem" />
      <ExploreArea />
      <Footer />
    </div>
  </RecipesProvider>
);

export default OriginExplore;
