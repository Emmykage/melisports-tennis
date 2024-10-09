import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/loader.css';
import { calculateTotal } from './redux/cart/cart';
import Main from './components/admin/dashBoard/Main';
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
import LoadingPage from './components/feature/LoadingPage';
import ShopHome from './pages/shop-page/Home';
import Arrivals from './pages/shop-page/Arrivals';
import NotFound from './pages/NotFound';
import useInitializeData from './hooks/useInitializeData';

const ApparelsPage = lazy(() => import('./pages/shop-page/Apparels'));
const BagsPage = lazy(() => import('./pages/shop-page/BagsPage'));
const Cart = lazy(() => import('./pages/Cart'));
const Home = lazy(() => import('./pages/landing-page/Home'));

const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const ProductsPage = lazy(() => import('./pages/shop-page/ProductsPage'));
const ShoesPage = lazy(() => import('./pages/shop-page/Shoe'));
const MainLayout = lazy(() => import('./components/layouts/main'));
const MainAdmin = lazy(() => import('./components/layouts/mainAdmin'));
const Messages = lazy(() => import('./components/admin/messages/Messages'));
const Orders = lazy(() => import('./components/admin/orders/Orders'));
const Settings = lazy(() => import('./components/admin/settings/Settings'));
const Analytics = lazy(() => import('./components/admin/analytics/Analytics'));
const Customers = lazy(() => import('./components/admin/customers/Customers'));
const AddProduct = lazy(() => import('./components/admin/addproduct/AddProduct'));
const Reports = lazy(() => import('./components/admin/reports/Reports'));
const Products = lazy(() => import('./components/admin/products/Products'));
const AddCategory = lazy(() => import('./components/admin/addcategory/AddCategory'));
const AccessoriesPage = lazy(() => import('./pages/shop-page/AccessoriesPage'));
const EditProduct = lazy(() => import('./components/admin/addproduct/EditProduct'));
const About = lazy(() => import('./pages/landing-page/About'));
const Services = lazy(() => import('./pages/Services'));
const MainInfoLayout = lazy(() => import('./components/layouts/mainInfo'));
const Contact = lazy(() => import('./pages/landing-page/Contact'));
const BecomeADistributor = lazy(() => import('./pages/BecomeADistributor'));
const Brands = lazy(() => import('./pages/Brands'));
const Confirmation = lazy(() => import('./pages/auth/confirmation'));
const ViewCustomer = lazy(() => import('./components/admin/customers/ViewCustomer'));
const ImagePreview = lazy(() => import('./components/products/ImagePreview'));
const Padels = lazy(() => import('./pages/shop-page/padel/Padels'));
const BadmintonsPage = lazy(() => import('./pages/shop-page/Badminton/Badminton'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  // const { setcategoryModal } = useSelector((state) => state.modal_categories);
  useInitializeData()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  return (

    <Suspense fallback={ <LoadingPage />}>

      <Routes>
        {/* landing page  */}
        <Route path="/" element={<MainInfoLayout><Home /></MainInfoLayout>} />
        <Route path="products" element={<MainInfoLayout><Services /></MainInfoLayout>} />
        <Route path="contact" element={<MainInfoLayout><Contact /></MainInfoLayout>} />
        <Route path="distributor" element={<MainInfoLayout><BecomeADistributor /></MainInfoLayout>} />
        <Route path="about" element={<MainInfoLayout><About /></MainInfoLayout>} />
        <Route path="paymentform" element={<StripeContainer />} />
        <Route path="/brands" element={<MainLayout><Brands /></MainLayout>} />

        <Route path="/search_page" element={<MainLayout><SearchPage /></MainLayout>} />


        {/* store page  */}
        <Route path="/store" element={<MainLayout><ShopHome /></MainLayout>} />
        <Route path="/arrivals" element={<MainLayout><Arrivals /></MainLayout>} />
        <Route path="/racquets" element={<MainLayout><ProductsPage /></MainLayout>} />
        <Route path="/padels" element={<MainLayout><Padels /></MainLayout>} />
        <Route path="/badminton" element={<MainLayout><BadmintonsPage /></MainLayout>} />
        <Route path="/productdetails/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
        <Route path="/carts" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/bags" element={<MainLayout><BagsPage /></MainLayout>} />
        <Route path="/shoes" element={<MainLayout><ShoesPage /></MainLayout>} />
        <Route path="/accessories" element={<MainLayout><AccessoriesPage /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />

        <Route path="/apparels" element={<MainLayout><ApparelsPage /></MainLayout>} />
        <Route path="admin">
          <Route path="dashboard" element={<MainAdmin><Main /></MainAdmin>} />
          <Route path="" element={<MainAdmin><Main /></MainAdmin>} />
          <Route path="customers" element={<MainAdmin><Customers /></MainAdmin>} />
          <Route path="customers/:id" element={<MainAdmin><ViewCustomer /></MainAdmin>} />
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
        <Route path="/preview" element={<MainLayout><ImagePreview /></MainLayout>} />

        <Route path="*" element={<><NotFound /></>} />
        <Route path="/return_policy" element={<MainLayout><ReturnPolicy /></MainLayout>} />
        <Route path="/shipping_policy" element={<MainLayout><ShippingPolicy /></MainLayout>} />
        <Route path="/terms_of_service" element={<MainLayout><TermsOfServices /></MainLayout>} />
        <Route path="/privacy_policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
        <Route path="/my_account" element={<MainLayout><Accounts /></MainLayout>} />

      </Routes>
    </Suspense>

  // </>
  );
}

export default App;
