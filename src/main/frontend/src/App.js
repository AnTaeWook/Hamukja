import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarMain from './Templete/NavbarMain';
import HamukjaHome from './View/HamukjaHome';
import Footer from './Templete/Footer';
import HamukjaRecipe from './View/HamukjaRecipe';
import HamukjaCommunity from './View/HamukjaCommunity';
import HamukjaNewRecipe from './View/HamukjaNewRecipe';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarMain />
        <Routes>
          <Route path='*' element={<HamukjaHome/>}></Route>
          <Route path='/recipes' element={<HamukjaRecipe/>}></Route>
          <Route path='/newrecipe' element={<HamukjaNewRecipe/>}></Route>
          <Route path='/community' element={<HamukjaCommunity/>}></Route>
        </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
