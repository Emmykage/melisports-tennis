import './App.css';
import Footer from './components/footer/Footer';
import Nav from './components/nav/Nav';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
 

function App() {
  return (
    <div className="container">
      <Nav />
      <Home />
      <ProductsPage />

      <Footer/>

    </div>
  );
}

export default App;
