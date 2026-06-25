import React, { useState, useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, getSimilarProducts } from "../../redux/actions/product";
import { closeList } from "../../redux/products/searched";
import Loader from "../Loader";
import ImagePreview from "../../components/products/ImagePreview";
import { nairaFormat } from "../../utils/nairaFormat";
import { pickColor } from "../../utils/get_colors";
import SimilarItemsSection from "../../components/similarSection/SimilarItemSection";
import { addToCart } from "../../redux/actions/cart";
import Container from "../../components/container";
import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sizes, setsizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [newInventory, setNewInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { product, loading } = useSelector((state) => state.product);
  const { id } = useParams();
  const {
    relatedProducts,
    status,
    loading: isLoading,
  } = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(closeList());
    dispatch(getProduct(id));
  }, [id]);
  const handleCart = () => {
    const cartArray = newInventory
      .filter((item) => item.count && item.count > 0)
      .map((item) => ({
        product_id: product?.id,
        id: item?.id,
        sku: item?.sku,
        image: product.photo_urls ? product.photo_urls[0] : product.image,
        ...(product.discount === "active_discount" && {
          discount_amount: product?.price,
        }),
        price:
          product.discount === "active_discount"
            ? product.discount_amount
            : product.price,
        quantity: item.count,
        product_name: product.name,
        size: item?.size,
        colours: product?.colours,
        category: product?.product_category?.name,
      }));

    // if(newInventory.every((item) => !item.count || item.count < 1)){
    // alert('You need to select a product');
    // return

    // }

    if (product.product_quantity > 0) {
      dispatch(addToCart(cartArray));
      setSelectedItem(null);
    } else {
      alert("Out of Stock");
    }
  };

  useEffect(() => {
    setCount(sizes.length);
  }, [sizes]);
  useEffect(() => {
    const total = newInventory.reduce((acc, item) => {
      acc += item.count || 0;
      return acc;
    }, 0);
    setTotalCount(total);
  }, [newInventory]);

  useEffect(() => {
    setSelectedColors(product?.colours);
  }, [product]);

  useEffect(() => {
    dispatch(getSimilarProducts({ product_id: id }));
  }, []);
  const increase = () => {
    setCount((setPrev) => Math.min(setPrev + 1, product.product_quantity));
  };

  const handleItemCount = (item, sign) => {
    setNewInventory((prev) => {
      const updatedInventory = prev.map((s) => {
        if (item.id == s.id) {
          return {
            ...s,
            count:
              sign == "+"
                ? Math.min((s.count || 0) + 1, item.quantity)
                : Math.max(s.count - 1 || 0, 0),
          };
        }
        return s;
      });
      return updatedInventory;
    });
  };
  const decrease = () => {
    setCount((setPrev) => Math.max(setPrev - 1, 0));
  };

  useEffect(() => {
    const newArray = [];

    product.product_inventories?.forEach((inventory, index) => {
      const exists = newArray.some((n) => n.size == inventory.size);
      if (!exists) {
        newArray.push(inventory);
      }
    });

    setNewInventory(newArray);
  }, [product]);

  if (loading) {
    return <Loader />;
  }
  const categoryKeyword = {
    racquet: "Tennis Rackets",
    shoe: "Sports Shoes",
    apparel: "Sports Wear",
    bag: "Sports Bags",
  };

  const seoCategory =
    categoryKeyword[product.product_category?.name] ||
    product.product_category?.name;

  return (
    <Container>
      <Helmet>
        Buy {seoCategory} Online in Nigeria | {product.name} | Melisports
        <meta
          name="description"
          content={`
Buy ${product.name} online in Nigeria from Melisports.
Shop quality ${seoCategory.toLowerCase()} and sports equipment
at competitive prices.
`}
        />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta
          property="og:image"
          content={product.photo_urls?.[0] || product.image}
        />
        <meta property="og:type" content="product" />
        <link
          rel="canonical"
          href={`https://melisports.com/productdetails/${product.id}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",

            name: product.name,

            image: product.photo_urls || [product.image],

            description: product.description,

            brand: {
              "@type": "Brand",
              name: "Melisports",
            },

            offers: {
              "@type": "Offer",

              url: `https://melisports.com/productdetails/${product.id}`,

              priceCurrency: "NGN",

              price:
                product.discount === "active_discount"
                  ? product.discount_amount
                  : product.price,

              availability:
                product.product_quantity > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
          })}
        </script>
      </Helmet>

      <div className="p-container shadow-lg p-6 rounded-xl bg-white max-w-[1600px] m-auto">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-2 border-b pb-10 mb-10">
          {/* Product Images */}
          <div className="flex justify-center items-center">
            {product.photo_urls ? (
              <ImagePreview images={product.photo_urls} />
            ) : (
              <img
                loading="lazy"
                src={product.image}
                alt={product.name}
                className="w-full max-h-[500px] object-contain rounded-lg"
              />
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl capitalize font-normal text-gray-800">
                {product?.name}
              </h1>
              <p className="mt-2 text-gray-500 text-sm uppercase tracking-wide">
                Tennis • {product?.product_category?.name}
              </p>
              <p className="mt-2 text-gray-500 text-sm uppercase tracking-wide">
                Buy premium {product.product_category?.name} from Melisports.
                Authentic sports equipment available in Nigeria.{" "}
              </p>

              {/* <div className="mt-4 text-2xl font-bold text-primary">
                  {nairaFormat(product.price)}
                </div> */}

              <div className="mt-4 flex items-center gap-3">
                {product.discount === "active_discount" ? (
                  <>
                    {/* Original Price (crossed out) */}
                    <span className="text-xl text-gray-400 line-through">
                      {nairaFormat(product.price)}
                    </span>

                    {/* Discounted Price */}
                    <span className="text-2xl font-bold text-green-600">
                      {nairaFormat(product.discount_amount)}
                    </span>

                    {/* Optional discount badge */}
                    {product.discount === "active_discount" && (
                      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        -{product.discount_percentage}%
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary">
                    {nairaFormat(product.price)}
                  </span>
                )}
              </div>

              {/* Colors */}
              {product?.colours?.length > 0 && (
                <div className="mt-6">
                  <span className="block text-lg font-semibold text-gray-700 mb-2">
                    Colour
                  </span>
                  <div className="flex w-8 h-8 gap-3  ">
                    {/* {product.colours.map((color) =>
                      pickColor(color).length === 1 ? (
                        <span
                          key={color}
                          className={`w-8 h-8 rounded-full border border-gray-300 ${pickColor(color)[0]}`}
                        />
                      ) : (
                        <div className="w-8 h-8 relative border border-gray-700 overflow-hidden rounded-full">
                          <span
                            onClick={() => {
                              setSelectedColors((prev) => {
                                const exists = prev.some((s) => s === color);
                                const newArray = exists
                                  ? prev.filter((s) => s !== color)
                                  : [...prev, color];
                                return newArray;
                              });
                            }}
                            key={color}
                            className={`w-8 h-7  absolute  diagonal-top top-0 left-0  flex justify-center items-center ${pickColor(color)[0]}`}
                          ></span>
                          <span
                            className={`w-8 h-7  absolute bottom-0 right-0 diagonal-bottom bottom-0 diagonal-bottom  ${pickColor(color)[1]}`}
                          />
                        </div>
                      ),
                    )} */}

                    {product.colours.length === 2 ? (
                      <span
                        style={{
                          background: `linear-gradient(135deg, ${pickColor(product.colours[0])}  50%, ${pickColor(product.colours[1])} 50%)`,
                        }}
                        // key={color}
                        className={`w-8 h-8 rounded-full border border-gray-300 `}
                      />
                    ) : (
                      <span
                        style={{
                          background: pickColor(product.colours[0]),
                        }}
                        // key={color}
                        className={`w-8 h-8 rounded-full border border-gray-300 `}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product?.product_inventories?.length > 0 && (
                <div className="mt-6">
                  <span className="block text-lg font-semibold text-gray-700 mb-2">
                    {product?.product_category?.name === "racquet"
                      ? "Grip Size"
                      : "Size"}
                  </span>
                  <div className="flex gap-3 flex-wrap">
                    {newInventory.map((inventory) => (
                      <button
                        key={inventory.size}
                        onClick={() => {
                          setSelectedItem((prev) =>
                            prev == inventory?.id ? null : inventory.id,
                          );
                        }}
                        className={`px-5 py-2 relative rounded-lg border text-sm font-medium transition-all ${
                          inventory.count > 0
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        {selectedItem && inventory.id == selectedItem && (
                          <QuantityAdjuster
                            count={inventory?.count || 0}
                            increase={() => handleItemCount(inventory, "+")}
                            quantity={inventory.quantity}
                            decrease={() => handleItemCount(inventory, "-")}
                          />
                        )}

                        {inventory.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}

              {newInventory?.length == 1 ? (
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center border rounded-lg">
                    <button
                      type="button"
                      className="px-3 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200"
                      onClick={() => handleItemCount(newInventory[0], "-")}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-gray-900 font-medium">
                      {totalCount}
                    </span>
                    <button
                      type="button"
                      className="px-3 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200"
                      onClick={() => handleItemCount(newInventory[0], "+")}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Av Qty: {newInventory[0]?.quantity}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center border rounded-lg">
                    <button
                      type="button"
                      className="px-3 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200"
                      onClick={decrease}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-gray-900 font-medium">
                      {totalCount}
                    </span>
                    <button
                      type="button"
                      className="px-3 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200"
                      onClick={increase}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Av Qty: {product.product_quantity}
                  </p>
                </div>
              )}

              {/* Add to Cart */}
              <div className="mt-6">
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    product.quantity === 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                  onClick={handleCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="description-details">
          <div className="grid md:grid-cols-2">
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Description
              </h2>
              {product.description_body ? (
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description_body }}
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>
            <div className="bg-0" />
          </div>
        </div>

        {/* Technical Details */}
        <div className="technical-details mb-10">
          <h2 className="text-2xl font-normal text-gray-800 mb-6">
            Technical Characteristics
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {product?.head_size && product.head_size !== "null" && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Head Size</span>
                <span className="text-gray-600">{product.head_size} ㎠</span>
              </div>
            )}
            {product?.head_shape && product.head_shape !== "null" && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Head Shape</span>
                <span className="text-gray-600">{product.head_shape} </span>
              </div>
            )}
            {product?.weight && product.weight !== "null" && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Weight</span>
                <span className="text-gray-600">{product.weight} g ± 7 g</span>
              </div>
            )}
            {product?.size && product.size !== "null" && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Size</span>
                <span className="text-gray-600">{product.size}</span>
              </div>
            )}
            {product?.length && product.length !== "null" && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Length</span>
                <span className="text-gray-600">{product.length} mm</span>
              </div>
            )}
            {product?.composition && product.composition !== "null" && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Composition</span>
                <span className="text-gray-600">{product.composition}</span>
              </div>
            )}
            {product?.strung && product.strung !== "null" && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">
                  Strung/Unstrung
                </span>
                <span className="text-gray-600">{product.strung}</span>
              </div>
            )}
            {product?.tension && product.tension !== "null" && (
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">
                  Recommended Tension
                </span>
                <span className="text-gray-600">{product.tension} kg</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </section> */}

      <div className="max-w-[1400px] m-auto px-4 my-12">
        <SimilarItemsSection
          items={relatedProducts}
          loading={isLoading}
          onSelect={({ id }) => navigate(`/productdetails/${id}`)}
        />
      </div>
    </Container>
  );
};

const QuantityAdjuster = ({
  onClick,
  decrease,
  count,
  increase,
  quantity = 0,
}) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className="flex absolute items-center gap-4 bg-white rounded-lg p-4 -mt-16 left-0  border shadow  -top-full"
  >
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
    <p className="text-sm text-gray-600 text-nowrap">Max Qty: {quantity}</p>
  </div>

  // </div>
);

export default ProductDetails;
