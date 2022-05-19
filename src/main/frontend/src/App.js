import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarMain from './Templete/NavbarMain';
import HamukjaHome from './View/HamukjaHome';
import Footer from './Templete/Footer';
import HamukjaRecipe from './View/HamukjaRecipe';
import HamukjaCommunity from './View/HamukjaCommunity';
import HamukjaNewRecipe from './View/HamukjaNewRecipe';
import HamukjaNewPost from './View/HamukjaNewPost';
import HamukjaRecipePage from './View/HamukjaRecipePage';
import { useState } from 'react';

/**
 * App
 * 메인 라우팅 컴포넌트
 * 
 * -state-
 * recipeItems : 레시피의 썸네일과 제목, 간략한 설명 등의 정보
 * 
 * @author 태욱
 * @version 1.0
 */
function App() {

  const [recipeNumber, setRecipeNumber] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
      <NavbarMain />
        <Routes>
          <Route path='*' element={<HamukjaHome/>}></Route>
          <Route path='/recipes' element={<HamukjaRecipe setRecipeNumber={setRecipeNumber}/>}></Route>
          <Route path='/newrecipe' element={<HamukjaNewRecipe/>}></Route>
          <Route path='/community' element={<HamukjaCommunity/>}></Route>
          <Route path='/newpost' element={<HamukjaNewPost/>}></Route>
          <Route path='/recipe-page' element={<HamukjaRecipePage recipeNumber={recipeNumber}/>}></Route>
        </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
