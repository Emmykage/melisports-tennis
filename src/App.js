import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/loader.css';
import ApparelsPage from './pages/Apparels';
import BagsPage from './pages/BagsPage';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ProductsPage from './pages/ProductsPage';
import ShoesPage from './pages/Shoe';
import { calculateTotal } from './redux/cart/cart';
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
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import AdminSignUp from './pages/auth/AdminSignUp';
import AdminLogin from './pages/auth/AdminLogin';
import Checkout from './pages/Checkout';
import Loader from './pages/Loader';
import StripeContainer from './pages/StripeContainer';
import ReturnPolicy from './pages/resources/ReturnPolicy';
import ShippingPolicy from './pages/resources/ShippingPolicy';
import TermsOfServices from './pages/resources/TermsOfServices';
import PrivacyPolicy from './pages/resources/PrivacyPolicy';
import Accounts from './pages/resources/Accounts';
import Services from './pages/Services';
import MainInfoLayout from './components/layouts/mainInfo';
import Contact from './pages/Contact';
import About from './pages/About';
import BecomeADistributor from './pages/BecomeADistributor';
import Brands from './pages/Brands';
import Confirmation from './pages/auth/confirmation';

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  // const { setcategoryModal } = useSelector((state) => state.modal_categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  return (
    <>

      <Routes>
        <Route path="/" element={<MainInfoLayout><Home /></MainInfoLayout>} />
        <Route path="products" element={<MainInfoLayout><Services /></MainInfoLayout>} />
        <Route path="contact" element={<MainInfoLayout><Contact /></MainInfoLayout>} />
        <Route path="distributor" element={<MainInfoLayout><BecomeADistributor /></MainInfoLayout>} />
        <Route path="about" element={<MainInfoLayout><About /></MainInfoLayout>} />
        <Route path="paymentform" element={<StripeContainer />} />
        <Route path="/brands" element={<MainLayout><Brands /></MainLayout>} />

        <Route path="/store" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/racquets" element={<MainLayout><ProductsPage /></MainLayout>} />
        <Route path="/productdetails/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
        <Route path="/carts" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/bags" element={<MainLayout><BagsPage /></MainLayout>} />
        <Route path="/shoes" element={<MainLayout><ShoesPage /></MainLayout>} />
        <Route path="/accessories" element={<MainLayout><AccessoriesPage /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />

        <Route path="/apparels" element={<MainLayout><ApparelsPage /></MainLayout>} />
        {/* <Route path='/admin/dashboard' element={<AdminHome><Main /></AdminHome> } /> */}
        <Route path="admin">
          <Route path="dashboard" element={<MainAdmin><Main /></MainAdmin>} />
          <Route path="" element={<MainAdmin><Main /></MainAdmin>} />
          <Route path="customers" element={<MainAdmin><Customers /></MainAdmin>} />
          <Route path="analytics" element={<MainAdmin><Analytics /></MainAdmin>} />
          <Route path="messages" element={<MainAdmin><Messages /></MainAdmin>} />
          <Route path="orders" element={<MainAdmin><Orders /></MainAdmin>} />
          <Route path="products" element={<MainAdmin><Products /></MainAdmin>} />
          <Route path="settings" element={<MainAdmin><Settings /></MainAdmin>} />
          <Route path="addproduct" element={<MainAdmin><AddProduct /></MainAdmin>} />
          <Route path="reports" element={<MainAdmin><Reports /></MainAdmin>} />
          <Route
            path="add_product_category"
            element={(
              <MainAdmin>
                <AddCategory />
                {' '}
              </MainAdmin>
)}
          />
          <Route path="edit/:editId" element={<MainAdmin><EditProduct /></MainAdmin>} />
        </Route>
        <Route path="/auth">
          <Route path="sign_up" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="admin_sign_up" element={<AdminSignUp />} />
          <Route path="admin_login" element={<AdminLogin />} />

        </Route>

        <Route path="/loader" element={<MainLayout><Loader /></MainLayout>} />
        <Route path="/return_policy" element={<MainLayout><ReturnPolicy /></MainLayout>} />
        <Route path="/shipping_policy" element={<MainLayout><ShippingPolicy /></MainLayout>} />
        <Route path="/terms_of_service" element={<MainLayout><TermsOfServices /></MainLayout>} />
        <Route path="/privacy_policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
        <Route path="/my_account" element={<MainLayout><Accounts /></MainLayout>} />

      </Routes>

    </>
  );
}

export default App;
