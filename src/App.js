import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
// import Modal from './components/modal/Modal';
import Nav from './components/nav/Nav';
import ApparelsPage from './pages/Apparels';
import BagsPage from './pages/BagsPage';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ProductsPage from './pages/ProductsPage';
import ShoesPage from './pages/Shoe';
import { calculateTotal } from './redux/cart/cart';
// import cartItems from './service/cartItems';
// import Modal from './components/modal/Modal'

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  // const {isOpen} = useSelector((state) => state.modal)
  // console.log(isOpen)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  return (
    <div className="container">
      {/* {isOpen && <Modal />} */}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/racquets" element={<ProductsPage />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/bags" element={<BagsPage />} />
        <Route path="/shoes" element={<ShoesPage/>} />
        <Route path='/apparels' element={<ApparelsPage/>} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
