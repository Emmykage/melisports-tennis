import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, getSimilarProducts } from '../../redux/actions/product';
// import { addCart } from '../redux/actions/cart';
import { updater } from '../../redux/cart/cart';
import { closeList } from '../../redux/products/searched';
import { addCart } from '../../redux/cart/cart';
import Loader from '../Loader';
import ImagePreview from '../../components/products/ImagePreview';
import { nairaFormat } from '../../utils/nairaFormat';
import { pickColor } from '../../utils/get_colors';
import Nav from '../../components/nav/Nav';
import SimilarItemsSection from '../../components/similarSection/SimilarItemSection';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [sizes, setsizes] = useState([]);
  const [selectedSize, setSelectedSIze] = useState(null);
  const { product, loading } = useSelector((state) => state.product);
  const { id } = useParams();
  const { relatedProducts, status, loading: isLoading } = useSelector((state) => state.products);
  const navigate = useNavigate();

  console.log(relatedProducts, 'related products');

  useEffect(() => {
    dispatch(closeList());
    dispatch(getProduct(id));
  }, [id]);
  const handleCart = () => {
    if (product.product_quantity > 0) {
      dispatch(addCart({
        product_id: id, image: product.photo_urls ? product.photo_urls[0] : product.image, price: product.price, quantity: count, product_name: product.name, sizes,
      }));

      dispatch(updater());
    } else {
      alert('Out of Stock');
    }
  };

  useEffect(() => {
    dispatch(getSimilarProducts({ product_id: id }));
  }, []);
  const increase = () => {
    setCount((setPrev) => Math.min(setPrev + 1, product.product_quantity));
  };
  const decrease = () => {
    setCount((setPrev) => Math.max(setPrev - 1, 0));
  };

  if (loading) {
    return (<Loader />);
  }

  return (
    <>

      <section className="bg-gray-50">
        <Nav />

        {/* Product Container */}
        <div className="p-container shadow-lg p-6 rounded-xl bg-white max-w-[1600px] m-auto">
          {/* Top Section */}
          <div className="grid gap-10 md:grid-cols-2 border-b pb-10 mb-10">

            {/* Product Images */}
            <div className="flex justify-center items-center">
              {product.photo_urls ? (
                <ImagePreview images={product.photo_urls} />
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-h-[500px] object-contain rounded-lg"
                />
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-normal text-gray-800">{product?.name}</h2>
                <p className="mt-2 text-gray-500 text-sm uppercase tracking-wide">
                  Tennis •
                  {' '}
                  {product?.product_category?.name}
                </p>

                <div className="mt-4 text-2xl font-bold text-primary">
                  {nairaFormat(product.price)}
                </div>

                {/* Colors */}
                {product?.colours?.length > 0 && (
                <div className="mt-6">
                  <span className="block text-lg font-semibold text-gray-700 mb-2">Colours</span>
                  <div className="flex gap-3">
                    {product.colours.map((color) => (pickColor(color).length === 1 ? (
                      <span
                        key={color}
                        className={`w-8 h-8 rounded-full border border-gray-300 ${pickColor(color)[0]}`}
                      />
                    ) : (
                      <span
                        key={color}
                        className={`w-8 h-8 rounded-full border flex justify-center items-center ${pickColor(color)[0]}`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border ${pickColor(color)[1]}`}
                        />
                      </span>
                    )))}
                  </div>
                </div>
                )}

                {/* Sizes */}
                {product?.product_inventories?.length > 0 && (
                <div className="mt-6">
                  <span className="block text-lg font-semibold text-gray-700 mb-2">
                    {product?.product_category?.name === 'racquet' ? 'Grip Size' : 'Size'}
                  </span>
                  <div className="flex gap-3 flex-wrap">
                    {product?.product_sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSIze(size);
                          setsizes([size]);
                        }}
                        className={`px-5 py-2 rounded-lg border text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-primary text-white border-primary'
                            : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center border rounded-lg">
                    <button
                      type="button"
                      className="px-3 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200"
                      onClick={decrease}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-gray-900 font-medium">{count}</span>
                    <button
                      type="button"
                      className="px-3 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200"
                      onClick={increase}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Av Qty:
                    {' '}
                    {product.product_quantity}
                  </p>
                </div>

                {/* Add to Cart */}
                <div className="mt-6">
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      product.quantity === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                    onClick={handleCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="technical-details mb-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Technical Characteristics
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {product?.head_size && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Head Size</span>
                <span className="text-gray-600">
                  {product.head_size}
                  {' '}
                  ㎠
                </span>
              </div>
              )}
              {product?.weight && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Weight</span>
                <span className="text-gray-600">
                  {product.weight}
                  {' '}
                  g ± 7 g
                </span>
              </div>
              )}
              {product?.size && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Size</span>
                <span className="text-gray-600">{product.size}</span>
              </div>
              )}
              {product?.length && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Length</span>
                <span className="text-gray-600">
                  {product.length}
                  {' '}
                  mm
                </span>
              </div>
              )}
              {product?.composition && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Composition</span>
                <span className="text-gray-600">{product.composition}</span>
              </div>
              )}
              {product?.strung && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Strung/Unstrung</span>
                <span className="text-gray-600">{product.strung}</span>
              </div>
              )}
              {product?.tension && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Recommended Tension</span>
                <span className="text-gray-600">
                  {product.tension}
                  {' '}
                  kg
                </span>
              </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="description-details">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
            {product.description_body ? (
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description_body }}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Related Items */}
      <div className="max-w-[1400px] m-auto px-4 my-12">
        <SimilarItemsSection
          items={relatedProducts}
          loading={isLoading}
          onSelect={({ id }) => navigate(`/productdetails/${id}`)}
        />
      </div>

    </>

  );
};

export default ProductDetails;
