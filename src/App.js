import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import "./styles/loader.css";
import { ToastContainer } from "react-toastify";
import useInitializeData from "./hooks/useInitializeData";
import MainLayout from "./components/layouts/main";
import MainAdmin from "./components/layouts/mainAdmin";

import MainInfoLayout from "./components/layouts/mainInfo";

import useResetPageLoction from "./hooks/resetPageLoction";
import LoaderModal from "./components/loader/Loader";
import { HelmetProvider } from "react-helmet-async";
import ImagePreview from "./components/products/ImagePreview";
import Invoice from "./components/invoice/Invoice";
import { getCartSum } from "./redux/actions/cart";
import AnimatedLoaded from "./components/animateLoad/AnimatedLoaded";
const Main = lazy(() => import("./pages/admin-page/dashBoard/Main"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));
const AdminSignUp = lazy(() => import("./pages/auth/AdminSignUp"));
const AdminLogin = lazy(() => import("./pages/auth/AdminLogin"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ReturnPolicy = lazy(() => import("./pages/resources/ReturnPolicy"));
const ShippingPolicy = lazy(() => import("./pages/resources/ShippingPolicy"));
const TermsOfServices = lazy(() => import("./pages/resources/TermsOfServices"));
const PrivacyPolicy = lazy(() => import("./pages/resources/PrivacyPolicy"));
const Accounts = lazy(() => import("./pages/resources/Accounts"));

const ShopHome = lazy(() => import("./pages/shop-page/Home"));
const Arrivals = lazy(() => import("./pages/shop-page/Arrivals"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ConfirmOrder = lazy(() => import("./pages/ConfirmOrder"));

const Directory = lazy(() => import("./pages/landing-page/Directory"));
const DeliveryFee = lazy(() => import("./pages/admin-page/delivery"));
const ViewDeliveryFee = lazy(
  () => import("./pages/admin-page/delivery/ViewDelivery"),
);

const ApparelsPage = lazy(() => import("./pages/shop-page/Apparels"));
const BagsPage = lazy(() => import("./pages/shop-page/BagsPage"));
const Cart = lazy(() => import("./pages/Cart"));
const Home = lazy(() => import("./pages/landing-page/Home"));

const ProductDetails = lazy(() => import("./pages/shop-page/ProductDetails"));
const ProductsPage = lazy(() => import("./pages/shop-page/ProductsPage"));
const ShoesPage = lazy(() => import("./pages/shop-page/Shoe"));

const Messages = lazy(() => import("./pages/admin-page/messages/Messages"));
const Orders = lazy(() => import("./pages/admin-page/orders/Orders"));
const Settings = lazy(() => import("./pages/admin-page/settings/Settings"));
const Analytics = lazy(() => import("./pages/admin-page/analytics/Analytics"));
const Customers = lazy(() => import("./pages/admin-page/customers/Customers"));
const AddProduct = lazy(
  () => import("./pages/admin-page/addproduct/AddProduct"),
);
const Reports = lazy(() => import("./pages/admin-page/reports/Reports"));
const Products = lazy(() => import("./pages/admin-page/products/Products"));
const AddCategory = lazy(
  () => import("./pages/admin-page/addcategory/AddCategory"),
);

const AccessoriesPage = lazy(() => import("./pages/shop-page/AccessoriesPage"));
const EditProduct = lazy(
  () => import("./pages/admin-page/addproduct/EditProduct"),
);
const About = lazy(() => import("./pages/landing-page/About"));
const Services = lazy(() => import("./pages/Services"));

const Contact = lazy(() => import("./pages/landing-page/Contact"));
const BecomeADistributor = lazy(() => import("./pages/BecomeADistributor"));
const Brands = lazy(() => import("./pages/Brands"));
const Confirmation = lazy(() => import("./pages/auth/confirmation"));

const ViewCustomer = lazy(
  () => import("./pages/admin-page/customers/ViewCustomer"),
);
const Padels = lazy(() => import("./pages/shop-page/padel/Padels"));
const BadmintonsPage = lazy(
  () => import("./pages/shop-page/Badminton/Badminton"),
);

const SearchPage = lazy(() => import("./pages/SearchPage"));
const ProfileAccountPage = lazy(() => import("./pages/ProfilePage"));

const SupportProgram = lazy(() => import("./pages/landing-page/TennisNGO"));
const EventDetails = lazy(() => import("./pages/landing-page/EventDetails"));
const EnrollChildForm = lazy(
  () => import("./pages/landing-page/SupportDetails"),
);

const CreateAgentForm = lazy(() => import("./pages/admin-page/agents/agents"));
const TennisPage = lazy(() => import("./pages/shop-page/tennis/tennis"));

const SalesPage = lazy(() => import("./pages/shop-page/sales"));

const ProfilePage = lazy(
  () => import("./pages/admin-page/settings/ProfilePage"),
);

const OrderDetails = lazy(
  () => import("./pages/admin-page/orders/OrderDetails"),
);
const OrderDetail = lazy(() => import("./pages/admin-page/orders/OrderDetail"));

const CommunityPage = lazy(() => import("./pages/Community"));

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const navigate = useNavigate();
  useResetPageLoction();

  useInitializeData();
  const dispatch = useDispatch();

  useEffect(() => {
    const { hostname } = window.location;
    // STORE DOMAIN
    if (
      hostname.startsWith("store.") &&
      !location.pathname.startsWith("/store")
    ) {
      navigate(`/store${location.pathname}`, { replace: true });
    }

    // ADMIN DOMAIN
    if (
      hostname.startsWith("admin.") &&
      !location.pathname.startsWith("/admin")
    ) {
      navigate(`/admin${location.pathname}`, { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    dispatch(getCartSum());
  }, [cartItems]);
  return (
    <Suspense fallback={<AnimatedLoaded />}>
      <ToastContainer />
      <LoaderModal />
      <HelmetProvider>
        <Routes>
          <Route
            path="/community"
            element={
              <MainLayout>
                <CommunityPage />
              </MainLayout>
            }
          />
          <Route
            path="products"
            element={
              <MainInfoLayout>
                <Services />
              </MainInfoLayout>
            }
          />
          <Route
            path="profile"
            element={
              <MainInfoLayout>
                <ProfileAccountPage />
              </MainInfoLayout>
            }
          />
          <Route
            path="contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />
          <Route
            path="distributor"
            element={
              <MainInfoLayout>
                <BecomeADistributor />
              </MainInfoLayout>
            }
          />
          <Route
            path="about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/profile-setting"
            element={
              <MainInfoLayout>
                <ProfilePage />
              </MainInfoLayout>
            }
          />
          <Route
            path="/brands"
            element={
              <MainLayout>
                <Brands />
              </MainLayout>
            }
          />
          <Route
            path="/court-directory"
            element={
              <MainLayout>
                <Directory />
              </MainLayout>
            }
          />
          <Route
            path="/support-the-program"
            element={
              <MainLayout>
                <SupportProgram />
              </MainLayout>
            }
          />
          <Route
            path="/enroll-a-child"
            element={
              <MainLayout>
                <EnrollChildForm />
              </MainLayout>
            }
          />
          <Route
            path="/upcoming-event"
            element={
              <MainLayout>
                <EventDetails />
              </MainLayout>
            }
          />

          <Route
            path="/search_page"
            element={
              <MainLayout>
                <SearchPage />
              </MainLayout>
            }
          />

          <Route
            path="/store"
            element={
              <MainLayout>
                <ShopHome />
              </MainLayout>
            }
          />
          <Route
            path="/"
            element={
              <MainLayout>
                <ShopHome />
              </MainLayout>
            }
          />
          <Route
            path="/arrivals"
            element={
              <MainLayout>
                <Arrivals />
              </MainLayout>
            }
          />
          <Route
            path="/racquets"
            element={
              <MainLayout>
                <ProductsPage />
              </MainLayout>
            }
          />
          <Route
            path="/sales"
            element={
              <MainLayout>
                <SalesPage />
              </MainLayout>
            }
          />

          <Route
            path="/padels"
            element={
              <MainLayout>
                <Padels />
              </MainLayout>
            }
          />
          <Route
            path="/tennis"
            element={
              <MainLayout>
                <TennisPage />
              </MainLayout>
            }
          />
          <Route
            path="/badminton"
            element={
              <MainLayout>
                <BadmintonsPage />
              </MainLayout>
            }
          />
          <Route
            path="/productdetails/:id"
            element={
              <MainLayout>
                <ProductDetails />
              </MainLayout>
            }
          />
          <Route
            path="/carts"
            element={
              <MainLayout>
                <Cart />
              </MainLayout>
            }
          />
          <Route
            path="/bags"
            element={
              <MainLayout>
                <BagsPage />
              </MainLayout>
            }
          />
          <Route
            path="/shoes"
            element={
              <MainLayout>
                <ShoesPage />
              </MainLayout>
            }
          />
          <Route
            path="/accessories"
            element={
              <MainLayout>
                <AccessoriesPage />
              </MainLayout>
            }
          />
          <Route
            path="/checkout"
            element={
              <MainLayout>
                <Checkout />
              </MainLayout>
            }
          />
          <Route
            path="/confirm-order"
            element={
              <MainLayout>
                <ConfirmOrder />
              </MainLayout>
            }
          />
          <Route
            path="/apparels"
            element={
              <MainLayout>
                <ApparelsPage />
              </MainLayout>
            }
          />

          <Route path="admin">
            <Route
              path="dashboard"
              element={
                <MainAdmin>
                  <Main />
                </MainAdmin>
              }
            />
            <Route
              path=""
              element={
                <MainAdmin>
                  <Main />
                </MainAdmin>
              }
            />
            <Route
              path="customers"
              element={
                <MainAdmin>
                  <Customers />
                </MainAdmin>
              }
            />
            <Route
              path="customers/:id"
              element={
                <MainAdmin>
                  <ViewCustomer />
                </MainAdmin>
              }
            />
            <Route
              path="analytics"
              element={
                <MainAdmin>
                  <Analytics />
                </MainAdmin>
              }
            />
            <Route
              path="messages"
              element={
                <MainAdmin>
                  <Messages />
                </MainAdmin>
              }
            />
            <Route
              path="orders"
              element={
                <MainAdmin>
                  <Orders />
                </MainAdmin>
              }
            />
            <Route
              path="orders/:id"
              element={
                <MainAdmin>
                  <OrderDetails />
                </MainAdmin>
              }
            />
            <Route
              path="products"
              element={
                <MainAdmin>
                  <Products />
                </MainAdmin>
              }
            />

            <Route
              path="agents"
              element={
                <MainAdmin>
                  <CreateAgentForm />
                </MainAdmin>
              }
            />
            <Route
              path="settings"
              element={
                <MainAdmin>
                  <Settings />
                </MainAdmin>
              }
            />
            <Route
              path="addproduct"
              element={
                <MainAdmin>
                  <AddProduct />
                </MainAdmin>
              }
            />
            <Route
              path="reports"
              element={
                <MainAdmin>
                  <Reports />
                </MainAdmin>
              }
            />
            <Route
              path="delivery-fee"
              element={
                <MainAdmin>
                  <DeliveryFee />
                </MainAdmin>
              }
            />
            <Route
              path="delivery-fee/:id"
              element={
                <MainAdmin>
                  <ViewDeliveryFee />
                </MainAdmin>
              }
            />

            <Route
              path="add_product_category"
              element={
                <MainAdmin>
                  <AddCategory />{" "}
                </MainAdmin>
              }
            />
            <Route
              path="edit/:editId"
              element={
                <MainAdmin>
                  <EditProduct />
                </MainAdmin>
              }
            />
          </Route>

          <Route path="/auth">
            <Route path="sign_up" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="confirmation" element={<Confirmation />} />
            <Route path="admin_sign_up" element={<AdminSignUp />} />
            <Route path="admin_login" element={<AdminLogin />} />
          </Route>
          <Route
            path="/preview"
            element={
              <MainLayout>
                <ImagePreview />
              </MainLayout>
            }
          />

          <Route
            path="*"
            element={
              <>
                <NotFound />
              </>
            }
          />
          <Route
            path="/return_policy"
            element={
              <MainLayout>
                <ReturnPolicy />
              </MainLayout>
            }
          />
          <Route
            path="/shipping_policy"
            element={
              <MainLayout>
                <ShippingPolicy />
              </MainLayout>
            }
          />
          <Route
            path="/terms_of_service"
            element={
              <MainLayout>
                <TermsOfServices />
              </MainLayout>
            }
          />
          <Route
            path="/privacy_policy"
            element={
              <MainLayout>
                <PrivacyPolicy />
              </MainLayout>
            }
          />
          <Route
            path="/my_account"
            element={
              <MainLayout>
                <Accounts />
              </MainLayout>
            }
          />
          <Route
            path="/invoice"
            element={
              <>
                <Invoice />
              </>
            }
          />
        </Routes>{" "}
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
