import { useEffect, useState } from 'react';
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
import AdminHome from './pages/admin-page/AdminHome';
import MainLayout from './components/layouts/main';
import MainAdmin from './components/layouts/mainAdmin';
import Main from './components/admin/dashBoard/Main';
import Messages from './components/admin/messages/Messages';
import Orders from './components/admin/orders/Orders';
import Settings from './components/admin/settings/Settings';
import Analytics from './components/admin/analytics/Analytics';
import Customers from './components/admin/customers/Customers';
import AddProduct from './components/admin/addproduct/AddProduct';
import Reports from './components/admin/reports/Reports';
import Products from './components/admin/products/Products';
import AddCategory from './components/admin/addcategory/AddCategory';
import AccessoriesPage from './pages/AccessoriesPage';
import EditProduct from './components/admin/addproduct/EditProduct';
// import cartItems from './service/cartItems';
// import Modal from './components/modal/Modal'

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const {setcategoryModal} = useSelector((state) => state.product_categories)
  // const handleModal = () => {
  //     setViewModal(!viewModal)
  // }

  // const {isOpen} = useSelector((state) => state.modal)
  // console.log(isOpen)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  return (
    <>
      {/* {isOpen && <Modal />} */}
      {/* <Nav /> */}


      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/racquets" element={<MainLayout><ProductsPage /></MainLayout>} />
        <Route path="/productdetails/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
        <Route path="/carts" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/bags" element={<MainLayout><BagsPage /></MainLayout>} />
        <Route path="/shoes" element={<MainLayout><ShoesPage/></MainLayout>} />
        <Route path="/accessories" element={<MainLayout><AccessoriesPage/></MainLayout>} />

        <Route path='/apparels' element={<MainLayout><ApparelsPage/></MainLayout> } />
        {/* <Route path='/admin/dashboard' element={<AdminHome><Main /></AdminHome> } /> */}
        <Route path="admin" >
          <Route path='dashboard' element={<AdminHome><Main /></AdminHome> } />
          <Route path='' element={<AdminHome><Main /></AdminHome> } />

          <Route path='customers' element={<AdminHome><Customers /></AdminHome> } />
          <Route path='analytics' element={<AdminHome><Analytics/></AdminHome> } />
          <Route path='messages' element={<MainAdmin><Messages /></MainAdmin> } />
          <Route path='orders' element={<MainAdmin><Orders /></MainAdmin> } />
          <Route path='products' element={<MainAdmin><Products /></MainAdmin> } />
          <Route path='settings' element={<MainAdmin><Settings /></MainAdmin> } />
          <Route path='addproduct' element={<MainAdmin><AddProduct /></MainAdmin> }/>
          <Route path='reports' element={<MainAdmin><Reports /></MainAdmin> }/>
          <Route path='add_product_category' element={<MainAdmin><AddCategory/> </MainAdmin>} />
          <Route path='edit/:editId' element={<MainAdmin><EditProduct/></MainAdmin>}/>
        </Route>
      </Routes>

      

    </>
  );
}

export default App;
