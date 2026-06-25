import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Hero from "../../components/banner/Hero";
import { getProducts } from "../../redux/actions/product";
import bannerImage from "../../assets/images/banner/2023-01_BAB_Banner_70_pourcents_Propulse_Fury_1365x510px-2.avif";
import Loader from "../Loader";

import ProductsGrid from "../../components/products/ProductsGridDisplay";
import Nav from "../../components/nav/Nav";

import useFilter from "../../hooks/useFilter";
import {
  classSports,
  genderItems,
  itemsFeatures,
} from "../../constants/categories";
import SideNav from "../../components/sideNav/SideNav";
import ProductsPageContainer from "../../components/productItems/ProductItems";
import useProducts from "../../hooks/useProducts";
import Container from "../../components/container";
import Header from "../../components/header/Header";
import { Helmet } from "react-helmet-async";

const ShoesPage = () => {
  const dispatch = useDispatch();

  const [selectedCapacities, setSelectedCapacities] = useState([]);

  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const {
    data: products,
    error,
    isError,
    isLoading: loading,
  } = useProducts({
    category: "shoe",
    selectedSports,
    selectedLevels,
    selectedFeatures,
    selectedGenders,
  });
  const { product_categories } = useSelector(
    (state) => state.product_categories,
  );

  const category = product_categories?.find((cat) => cat.name === "shoe");

  const handleFilteredCapacities = (e) => {
    const { checked, value } = e.target;
    checked
      ? setSelectedCapacities((prev) => [...prev, value])
      : setSelectedCapacities((prev) => prev.filter((item) => item !== value));
  };

  const handleSportFilter = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedSports((prev) => [...prev, value]);
    } else {
      setSelectedSports((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleGenderFilter = (e) => {
    const { checked, value } = e.target;
    console.log(value);

    if (checked) {
      setSelectedGenders((prev) => [...prev, value]);
    } else {
      setSelectedGenders((prev) => prev.filter((item) => item !== value));
    }
  };
  const handleSportsFilter = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSports((prev) => [...prev, value]);
    } else {
      setSelectedSports((prev) => prev.filter((item) => item !== value));
    }
  };
  const handleFilteredFeatures = (e) => {
    const { checked, value } = e.target;
    checked
      ? setSelectedFeatures((prev) => [...prev, value])
      : setSelectedFeatures((prev) => prev.filter((item) => item !== value));
  };

  return (
    <>
      <Container>
        <Helmet>
          <title>
            Tennis Shoes Online Nigeria | Buy Quality Tennis Shoes | Melisports
          </title>

          <meta
            name="description"
            content="
Shop tennis shoes online in Nigeria at Melisports.
Explore quality tennis shoes from trusted brands including
Babolat, Wilson and more. Find beginner and performance shoes
for every playing style.
"
          />

          <link rel="canonical" href="https://melisports.com/shoes" />

          <meta
            property="og:title"
            content="Tennis Shoes Online Nigeria | Melisports"
          />

          <meta
            property="og:description"
            content="
Shop quality tennis shoes and racquets online in Nigeria.
"
          />

          <meta property="og:image" content={bannerImage} />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",

              "@type": "CollectionPage",

              name: "Tennis Shoes Online Nigeria",

              description:
                "Shop tennis and sport and shoes online in Nigeria from trusted brands like babolat.",

              url: "https://melisports.com/shoes",

              mainEntity: {
                "@type": "ItemList",

                itemListElement: products
                  ?.slice(0, 10)
                  .map((product, index) => ({
                    "@type": "ListItem",

                    position: index + 1,

                    name: product.name,

                    url: `https://melisports.com/productdetails/${product.id}`,
                  })),
              },
            })}
          </script>
        </Helmet>

        <Hero image={bannerImage} title="Shoes" />
        <ProductsPageContainer>
          <div className="cat-group gap-6  max-w-md my-6">
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => dispatch(getProducts({ category: "shoe" }))}
            >
              All shoes
            </button>

            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts("men")}
            >
              {" "}
              Men
            </button>
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts("women")}
            >
              {" "}
              Women
            </button>
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts("kids")}
            >
              {" "}
              Kids
            </button>
          </div>
          <div className="flex md:gap-10">
            <SideNav>
              {/* Section: Racket Type */}
              <div>
                <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                  Racket Type
                </h6>

                <div className="">
                  {classSports.map((item) => (
                    <div className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        onChange={handleSportsFilter}
                        id={item.type}
                        value={item.type}
                        className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />

                      <label
                        htmlFor={item.type}
                        style={{ fontSize: "1rem" }}
                        className="flex items-center"
                      >
                        <span>{item.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h6>Category</h6>

                {genderItems.map((item) => (
                  <div className="flex items-center">
                    <label htmlFor={item.type} style={{ fontSize: "1rem" }}>
                      <input
                        type="checkbox"
                        id={item.type}
                        value={item.type}
                        className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleGenderFilter}
                      />

                      {item.label}
                    </label>
                  </div>
                ))}
              </div>

              <div />

              <div className="mt-4">
                <h6>Court Type</h6>

                {itemsFeatures.map((item) => (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={item.type}
                      value={item.type}
                      className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={handleFilteredFeatures}
                    />

                    <label htmlFor={item.type} style={{ fontSize: "1rem" }}>
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <h6>Brand</h6>
                <div className="flex items-center">
                  <input
                    //  onChange={handleFilteredActivities}
                    value="babolat"
                    type="checkbox"
                    id="babolat"
                    className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="activity" style={{ fontSize: "1rem" }}>
                    babolat
                  </label>
                </div>
              </div>
            </SideNav>
            <div className="product-align w-full">
              {loading ? (
                <Loader />
              ) : (
                <ProductsGrid
                  products={products}
                  status={status}
                  error={error}
                />
              )}
              <section className="product-details color-grey mt-16 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-8 md:p-12 shadow-sm">
                <div className="max-w-5xl mx-auto">
                  {/* Intro */}
                  <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">
                      Buy Sports Shoes Online in Nigeria
                    </h2>

                    <p className="text-gray-600 leading-8 text-base md:text-lg">
                      Explore our collection of quality sports shoes from
                      trusted brands designed for athletes, fitness enthusiasts
                      and everyday active lifestyles. Whether you need running
                      shoes, tennis shoes, training footwear or performance
                      sneakers, Melisports offers comfortable and durable
                      options for different sports and activities.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 my-10" />

                  {/* Choosing Guide */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">
                      Choose the Right Sports Shoes
                    </h2>

                    <p className="text-gray-600 leading-8 text-base md:text-lg mb-6">
                      Finding the right footwear improves comfort, support and
                      performance. Choose shoes based on your sport, playing
                      style and activity level.
                    </p>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                      <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                        <h3 className="font-normal text-gray-900 mb-2 text-base">
                          Running & Training Shoes
                        </h3>

                        <p className="text-sm text-gray-600 leading-6">
                          Lightweight footwear designed for movement, comfort
                          and everyday training sessions.
                        </p>
                      </div>

                      <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                        <h3 className="font-normal text-gray-900 mb-2 text-base">
                          Court & Sports Shoes
                        </h3>

                        <p className="text-sm text-gray-600 leading-6">
                          Performance shoes built for sports like tennis,
                          basketball and other court activities requiring
                          stability and grip.
                        </p>
                      </div>

                      <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                        <h3 className="font-normal text-gray-900 mb-2 text-base">
                          Quality Sports Brands
                        </h3>

                        <p className="text-sm text-gray-600 leading-6">
                          Shop reliable footwear from recognised brands trusted
                          by athletes around the world.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>{" "}
            </div>
          </div>
        </ProductsPageContainer>
      </Container>
    </>
  );
};

export default ShoesPage;
