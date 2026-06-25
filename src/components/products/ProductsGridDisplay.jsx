import "./products.css";
import ProductCard from "../card/ProductCard";

const ProductsGrid = ({ products, error, filter }) => {
  const sortProduct = filter
    ? products?.filter((item) => item.product_category.name === filter)
    : products;

  if (error || !products || !Array.isArray(products)) {
    return (
      <div>
        <header>
          <h2 className="text-center my-20 text-3xl font-normal">
            {" "}
            Something went wrong
          </h2>
        </header>
      </div>
    );
  }
  if (products.length < 1) {
    return (
      <div>
        <header>
          <h2 className="text-center my-20 text-3xl font-normal">
            {" "}
            No Item in this Collection.
          </h2>
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
