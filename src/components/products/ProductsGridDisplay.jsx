import './products.css';
import ProductCard from '../card/ProductCard';

const ProductsGrid = ({ products, error, filter }) => {
  const sortProduct = filter ? products?.filter((item) => item.product_category.name === filter) : products;
  if (error) {
    return (
      <div className="text-center">
        <h2>
          {' '}
          {error}
        </h2>
      </div>
    );
  }

  if (!products || !Array.isArray(products)) {
    return (
      <div>
        <header>

          <h1 className="font-sans text-center text-3xl font-normal"> Something went wrong</h1>
        </header>
      </div>
    );
  }
  if (products.length < 1) {
    return (
      <div>
        <header>

          <h1 className="font-sans text-center text-3xl font-normal"> No Item in this Collection</h1>
        </header>
      </div>
    );
  }

  return (

    <div className="grid gap-[2%] gap-y-2 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">

      {sortProduct.map((product) => (
        <ProductCard key={product.id} product={product} />

      ))}

    </div>
  );
};

export default ProductsGrid;
