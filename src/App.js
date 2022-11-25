import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Nav from './components/nav/Nav';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ProductsPage from './pages/ProductsPage';
import { calculateTotal } from './redux/cart/cart';
// import cartItems from './service/cartItems';



function App() {
  const { cartItems} = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(calculateTotal())
  }, [cartItems])
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/racquets" element={<ProductsPage />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
