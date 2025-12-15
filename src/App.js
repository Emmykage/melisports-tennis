import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/loader.css';
import { ToastContainer } from 'react-toastify';
import Main from './pages/admin-page/dashBoard/Main';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import AdminSignUp from './pages/auth/AdminSignUp';
import AdminLogin from './pages/auth/AdminLogin';
import Checkout from './pages/Checkout';
import ReturnPolicy from './pages/resources/ReturnPolicy';
import ShippingPolicy from './pages/resources/ShippingPolicy';
import TermsOfServices from './pages/resources/TermsOfServices';
import PrivacyPolicy from './pages/resources/PrivacyPolicy';
import Accounts from './pages/resources/Accounts';

import ShopHome from './pages/shop-page/Home';
import Arrivals from './pages/shop-page/Arrivals';
import NotFound from './pages/NotFound';
import useInitializeData from './hooks/useInitializeData';
import ConfirmOrder from './pages/ConfirmOrder';
import OrderDetails from './pages/admin-page/OrderDetails';
import Directory from './pages/landing-page/Directory';
import Delivery from './pages/admin-page/delivery';
import DeliveryFee from './pages/admin-page/delivery';
import ViewDeliveryFee from './pages/admin-page/delivery/ViewDelivery';
import LoaderModal from './components/loader/Loader';
import ApparelsPage from './pages/shop-page/Apparels';
import BagsPage from './pages/shop-page/BagsPage';
import Cart from './pages/Cart';
import Home from './pages/landing-page/Home';

import ProductDetails from './pages/shop-page/ProductDetails';
import ProductsPage from './pages/shop-page/ProductsPage';
import ShoesPage from './pages/shop-page/Shoe';
import MainLayout from './components/layouts/main';
import MainAdmin from './components/layouts/mainAdmin';
import Messages from './pages/admin-page/messages/Messages';
import Orders from './pages/admin-page/orders/Orders';
import Settings from './pages/admin-page/settings/Settings';
import Analytics from './pages/admin-page/analytics/Analytics';
import Customers from './pages/admin-page/customers/Customers';
import AddProduct from './pages/admin-page/addproduct/AddProduct';
import Reports from './pages/admin-page/reports/Reports';
import Products from './pages/admin-page/products/Products';
import AddCategory from './pages/admin-page/addcategory/AddCategory';
import AccessoriesPage from './pages/shop-page/AccessoriesPage';
import EditProduct from './pages/admin-page/addproduct/EditProduct';
import About from './pages/landing-page/About';
import Services from './pages/Services';
import MainInfoLayout from './components/layouts/mainInfo';
import Contact from './pages/landing-page/Contact';
import BecomeADistributor from './pages/BecomeADistributor';
import Brands from './pages/Brands';
import Confirmation from './pages/auth/confirmation';
import ViewCustomer from './pages/admin-page/customers/ViewCustomer';
import ImagePreview from './components/products/ImagePreview';
import Padels from './pages/shop-page/padel/Padels';
import BadmintonsPage from './pages/shop-page/Badminton/Badminton';
import SearchPage from './pages/SearchPage';
import ProfileAccountPage from './pages/ProfilePage';
import SupportProgram from './pages/landing-page/TennisNGO';
import EventDetails from './pages/landing-page/EventDetails';
import EnrollChildForm from './pages/landing-page/SupportDetails';
import Invoice from './components/invoice/Invoice';
import CreateAgentForm from './pages/admin-page/agents/agents';
import TennisPage from './pages/shop-page/tennis/tennis';
import useResetPageLoction from './hooks/resetPageLoction';
import { getCartSum } from './redux/actions/cart';
import SalesPage from './pages/shop-page/sales';

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  useResetPageLoction();
  useInitializeData();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartSum());
  }, [cartItems]);
  return (
    <>
      <ToastContainer />
      <LoaderModal />

      <Routes>

        <Route path="/" element={<MainInfoLayout><Home /></MainInfoLayout>} />
        <Route path="products" element={<MainInfoLayout><Services /></MainInfoLayout>} />
        <Route path="profile" element={<MainInfoLayout><ProfileAccountPage /></MainInfoLayout>} />
        <Route path="contact" element={<MainInfoLayout><Contact /></MainInfoLayout>} />
        <Route path="distributor" element={<MainInfoLayout><BecomeADistributor /></MainInfoLayout>} />
        <Route path="about" element={<MainInfoLayout><About /></MainInfoLayout>} />
        <Route path="/brands" element={<MainLayout><Brands /></MainLayout>} />
        <Route path="/court-directory" element={<MainLayout><Directory /></MainLayout>} />
        <Route path="/support-the-program" element={<MainLayout><SupportProgram /></MainLayout>} />
        <Route path="/enroll-a-child" element={<MainLayout><EnrollChildForm /></MainLayout>} />
        <Route path="/upcoming-event" element={<MainLayout><EventDetails /></MainLayout>} />

        <Route path="/search_page" element={<MainLayout><SearchPage /></MainLayout>} />

        <Route path="/store" element={<MainLayout><ShopHome /></MainLayout>} />
        <Route path="/arrivals" element={<MainLayout><Arrivals /></MainLayout>} />
        <Route path="/racquets" element={<MainLayout><ProductsPage /></MainLayout>} />
        <Route path="/sales" element={<MainLayout><SalesPage /></MainLayout>} />

        <Route path="/padels" element={<MainLayout><Padels /></MainLayout>} />
        <Route path="/tennis" element={<MainLayout><TennisPage /></MainLayout>} />
        <Route path="/badminton" element={<MainLayout><BadmintonsPage /></MainLayout>} />
        <Route path="/productdetails/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
        <Route path="/carts" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/bags" element={<MainLayout><BagsPage /></MainLayout>} />
        <Route path="/shoes" element={<MainLayout><ShoesPage /></MainLayout>} />
        <Route path="/accessories" element={<MainLayout><AccessoriesPage /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
        <Route path="/confirm-order" element={<MainLayout><ConfirmOrder /></MainLayout>} />

        <Route path="/apparels" element={<MainLayout><ApparelsPage /></MainLayout>} />
        <Route path="admin">
          <Route path="dashboard" element={<MainAdmin><Main /></MainAdmin>} />
          <Route path="" element={<MainAdmin><Main /></MainAdmin>} />
          <Route path="customers" element={<MainAdmin><Customers /></MainAdmin>} />
          <Route path="customers/:id" element={<MainAdmin><ViewCustomer /></MainAdmin>} />
          <Route path="analytics" element={<MainAdmin><Analytics /></MainAdmin>} />
          <Route path="messages" element={<MainAdmin><Messages /></MainAdmin>} />
          <Route path="orders" element={<MainAdmin><Orders /></MainAdmin>} />
          <Route path="orders/:id" element={<MainAdmin><OrderDetails /></MainAdmin>} />
          <Route path="products" element={<MainAdmin><Products /></MainAdmin>} />

          <Route path="agents" element={<MainAdmin><CreateAgentForm /></MainAdmin>} />
          <Route path="settings" element={<MainAdmin><Settings /></MainAdmin>} />
          <Route path="addproduct" element={<MainAdmin><AddProduct /></MainAdmin>} />
          <Route path="reports" element={<MainAdmin><Reports /></MainAdmin>} />
          <Route path="delivery-fee" element={<MainAdmin><DeliveryFee /></MainAdmin>} />
          <Route path="delivery-fee/:id" element={<MainAdmin><ViewDeliveryFee /></MainAdmin>} />

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
        <Route path="/preview" element={<MainLayout><ImagePreview /></MainLayout>} />

        <Route path="*" element={<><NotFound /></>} />
        <Route path="/return_policy" element={<MainLayout><ReturnPolicy /></MainLayout>} />
        <Route path="/shipping_policy" element={<MainLayout><ShippingPolicy /></MainLayout>} />
        <Route path="/terms_of_service" element={<MainLayout><TermsOfServices /></MainLayout>} />
        <Route path="/privacy_policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
        <Route path="/my_account" element={<MainLayout><Accounts /></MainLayout>} />
        <Route path="/invoice" element={<><Invoice /></>} />

      </Routes>

    </>
  );
}

export default App;
