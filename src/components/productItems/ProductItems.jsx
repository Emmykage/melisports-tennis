import SimilarItemsSection from '../similarSection/SimilarItemSection';

const ProductsPageContainer = ({ children }) => (
  <div className="product-container">

    <div className="prod-page prod-page py-10 px-4 md:px-10  max-w-[1600px] m-auto">
      {children}

    </div>

    <div className="max-w- prod-page prod-page m-auto px-4">

      <SimilarItemsSection items={products} onSelect={() => navigate(`/productdetails/${item.id}`)} />
    </div>

  </div>
);

export default ProductsPageContainer;
