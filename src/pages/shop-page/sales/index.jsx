import React, { useState } from "react";
import Hero from "../../../components/banner/Hero";
import bannerImage from "../../../assets/images/banner/babolat-wimby-desktop-banner1.jpg";
import Loader from "../../Loader";

import { collections } from "../../../constants/variance";
import ProductsPageContainer from "../../../components/productItems/ProductItems";
import ProductsGrid from "../../../components/products/ProductsGridDisplay";
import useProducts from "../../../hooks/useProducts";
import Container from "../../../components/container";

const SalesPage = () => {
  const [collection, setCollections] = useState("");
  const [selectedLevels, setSelectedLevels] = useState([]);
  const {
    data: products,
    error,
    isLoading: loading,
  } = useProducts({
    discount: true,
    category: collection,
    levels: selectedLevels,
  });

  console.log(collection);

  return (
    <div className="product-container relative">
      <Container>
        <Hero image={bannerImage} title="Discounted Sales" />

        <ProductsPageContainer>
          <div className="bg-gray-900 space-y-3 p-4 rounded-2xl my-6">
            <p className="inline-block bg-red-900/20 px-4 py-2 rounded-sm text-red-500">
              SPECIAL OFFERS
            </p>
            <h2 className="text-2xl font-normal text-white">
              Discounts & Deals{" "}
            </h2>
            <p className="text-white text-base">Get more game for less.</p>
            <p className="text-gray-100 ">
              Explore our collection of discounted sales available for a limited
              time.
            </p>{" "}
          </div>

          <div className="flex flex-col md:gap-10">
            <div className="">
              <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                Collection
              </h6>
              <div className="space-x-5 my-4 py-4 flex flex-wr w-full overflow-x-auto gap-4 items-center">
                <button
                  className="px-4 py-2 text-nowrap bg-theme text-white rounded-2xl"
                  onClick={() => setCollections(null)}
                >
                  All Discount
                </button>
                {collections.map((item) => (
                  <button
                    key={item.value}
                    className="px-4 py-2 bg-theme text-white rounded-2xl"
                    onClick={() => setCollections(item.value)}
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div className="product-align w-full">
                <ProductsGrid products={products} error={error} />
              </div>
            )}
            <div />
          </div>
        </ProductsPageContainer>
      </Container>
    </div>
  );
};

export default SalesPage;
