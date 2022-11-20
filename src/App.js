import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Nav from './components/nav/Nav';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
 

function App() {
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/products' element={<ProductsPage />} />
        
      </Routes>
     

      <Footer/>

    </div>
  );
}

export default App;
