import React from 'react';
import './App.css';
import { Home } from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { SearchView } from './Views/SearchView/SearchView';
import { DetailsRecipe } from './Views/DetailsRecipeView/DetailsRecipe';

function App() {
  return (
    <BrowserRouter>
       <Header />
      <Routes>
        <Route path='https://marcoduarte21.github.io/mealswebsite' element={<Home />} />
        <Route path='/search/:query' element={<SearchView />} />
        <Route path='/recipe/:id' element={<DetailsRecipe />} />
      </Routes>
     </BrowserRouter>
  );
}

export default App;
