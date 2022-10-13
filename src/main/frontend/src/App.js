import './App.css';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import NavbarMain from './Templete/NavbarMain';
import HamukjaHome from './View/HamukjaHome';
import Footer from './Templete/Footer';
import HamukjaRecipe from './View/HamukjaRecipe';
import HamukjaCommunity from './View/HamukjaCommunity';
import HamukjaNewRecipe from './View/HamukjaNewRecipe';
import HamukjaNewPost from './View/HamukjaNewPost';
import HamukjaRecipePage from './View/HamukjaRecipePage';
import HamukjaCommunityPage from './View/HamukjaCommunityPage';
import { useState } from 'react';
import HamukjaReviseRecipe from './View/HamukjaReviseRecipe';



function App() {

  const [recipeNumber, setRecipeNumber] = useState(0);
  const [postNumber, setPostNumber] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
      <NavbarMain />
        <Routes>
          <Route path='*' element={<HamukjaHome/>}></Route>
          <Route path='/recipes' element={<HamukjaRecipe setRecipeNumber={setRecipeNumber}/>}></Route>
          <Route path='/newrecipe' element={<HamukjaNewRecipe/>}></Route>
          <Route path='/revise-recipe' element={<HamukjaReviseRecipe recipeNumber={recipeNumber}/>}></Route>
          <Route path='/community' element={<HamukjaCommunity setPostNumber={setPostNumber}/>}></Route>
          <Route path='/newpost' element={<HamukjaNewPost/>}></Route>
          <Route path='/recipe-page' element={<HamukjaRecipePage recipeNumber={recipeNumber}/>}></Route>
          <Route path='/post' element={<HamukjaCommunityPage postNumber={postNumber}/>}></Route>
        </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
