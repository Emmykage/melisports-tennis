import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Hero from "../../components/banner/Hero";
import { getProducts } from "../../redux/actions/product";
import bannerImage from "../../assets/images/banner/2021-Category-Banner-Tennis-Bags.jpg";
import Loader from "../Loader";
import ProductsGrid from "../../components/products/ProductsGridDisplay";
import Nav from "../../components/nav/Nav";
import { classSports } from "../../constants/categories";
import SideNav from "../../components/sideNav/SideNav";
import ProductsPageContainer from "../../components/productItems/ProductItems";
import useProducts from "../../hooks/useProducts";
import { useCategoryName } from "../../hooks/fetchHooks/useCategories";
import Container from "../../components/container";
import Header from "../../components/header/Header";
import { Helmet } from "react-helmet-async";
import CheckBox from "../../components/checkbox/checkbox";

const BagsPage = () => {
  const dispatch = useDispatch();

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const {
    data: products,
    error,
    isLoading: loading,
  } = useProducts({
    category: "bag",
    sport: selectedSports,
    levels: selectedLevels,
    features: selectedFeatures,
  });

  const { data: category } = useCategoryName({
    name: "bag",
  });
  const handleFilteredProducts = (sieve) => {
    const lowerCaseSieve = sieve.toLowerCase();
    dispatch(getProducts({ name: lowerCaseSieve }));
  };

  const handleFilteredActivities = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFeatures((prev) => [...prev, value]);
    } else {
      setSelectedFeatures((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleSportFilter = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedSports((prev) => [...prev, value]);
    } else {
      setSelectedSports((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <>
      <Container>
        <Helmet>
          <title>
            Tennis Bags and backpack Online Nigeria | Buy Quality Tennis Bags |
            Melisports
          </title>

          <meta
            name="description"
            content="
Shop tennis bags and backpacks online in Nigeria at Melisports.
Explore quality tennis bags from trusted brands including
Babolat, Wilson and more. Find beginner and performance enhanced apparels for every playing style.
"
          />

          <link rel="canonical" href="https://melisports.com/bags" />

          <meta
            property="og:title"
            content="Tennis Bags and backpacks Online Nigeria | Melisports"
          />

          <meta
            property="og:description"
            content="
Shop quality tennis bags and backpack online in Nigeria.
"
          />

          <meta property="og:image" content={bannerImage} />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",

              "@type": "CollectionPage",

              name: "Tennis Bags and backpack Online Nigeria",

              description:
                "Shop tennis bags and backpacks online in Nigeria from trusted brands like babolat.",

              url: "https://melisports.com/bags",

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

        <Hero image={bannerImage} title="Bags & Backpacks" />

        <ProductsPageContainer>
          <div className="prod-page prod-page py-10 px-4 md:px-10  max-w-[1600px] m-auto">
            <div className="cat-group justify-between max-w-md my-6">
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                onClick={() => dispatch(getProducts())}
              >
                All bags
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                onClick={() => handleFilteredProducts("backpack")}
              >
                {" "}
                Backpack
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                onClick={() => handleFilteredProducts("duffle")}
              >
                {" "}
                Duffle
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                onClick={() => handleFilteredProducts("racket holder")}
              >
                {" "}
                Racket holder
              </button>
            </div>

            <div className="flex md:gap-10">
              <SideNav>
                <div className="">
                  <h6 className="my-4">Activities</h6>
                </div>
                <div />
                <div className="">
                  {classSports.map((item) => (
                    <CheckBox
                      key={item.type}
                      label={item.label}
                      type="checkbox"
                      id={item.type}
                      value={item.type}
                      onChange={handleSportFilter}
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <h6 className="my-4">Capacity</h6>
                  <div className="space-y-2">
                    {[
                      {
                        value: "RH_X12",
                        label: "RH X12",
                      },
                      {
                        value: "RH_X9",
                        label: "RH X9",
                      },
                      {
                        value: "RH_X6",
                        label: "RH X6",
                      },
                      {
                        value: "RH_X6",
                        label: "RH X6",
                      },
                      {
                        value: "RH X3",
                        label: "RH X3",
                      },
                      {
                        value: "Duffle",
                        label: "Duffle",
                      },
                      {
                        value: "Backpack",
                        label: "Backpack",
                      },
                    ].map((item) => (
                      <CheckBox
                        key={item.value}
                        label={item.label}
                        type="checkbox"
                        id={item.value}
                        value={item.value}
                        className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleFilteredActivities}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="my-4">Series</h6>
                  <div className="space-y-2">
                    {[
                      {
                        value: "Pure Drive",
                        label: "pure drive",
                      },
                      {
                        value: "Pure aero",
                        label: "pure aero",
                      },
                      {
                        value: "Pure Strike",
                        label: "pure Strike",
                      },
                    ].map((item) => (
                      <CheckBox
                        key={item.value}
                        label={item.label}
                        type="checkbox"
                        id={item.value}
                        value={item.value}
                        onChange={handleFilteredActivities}
                      />
                    ))}
                  </div>
                </div>
              </SideNav>{" "}
              <div className="product-align w-full">
                {loading ? (
                  <Loader />
                ) : (
                  <ProductsGrid
                    products={products}
                    error={error}
                    filter="bag"
                  />
                )}
                <section className="product-details color-grey mt-16 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-8 md:p-12 shadow-sm">
                  <div className="max-w-5xl mx-auto">
                    {/* Intro */}
                    <div className="mb-10">
                      <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">
                        Buy Sports Bags and Backpacks Online in Nigeria
                      </h2>

                      <p className="text-gray-600 leading-8 text-base md:text-lg">
                        Explore our collection of durable sports bags and
                        backpacks designed for athletes, students, travellers
                        and everyday use. From tennis bags and gym bags to
                        versatile backpacks, Melisports offers quality storage
                        solutions from trusted brands to carry your sports gear
                        and essentials comfortably.
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-10" />

                    {/* Choosing Guide */}
                    <div>
                      <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">
                        Choose the Right Sports Bag or Backpack
                      </h2>

                      <p className="text-gray-600 leading-8 text-base md:text-lg mb-6">
                        The right bag helps keep your equipment organised and
                        protected. Choose a bag based on your sport, storage
                        needs and lifestyle. Whether you need space for rackets,
                        shoes, clothing or daily essentials, find a suitable
                        option from our collection.
                      </p>

                      {/* Feature Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                        <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                          <h3 className="font-normal text-gray-900 mb-2 text-base">
                            Sports & Training Bags
                          </h3>

                          <p className="text-sm text-gray-600 leading-6">
                            Spacious bags designed for athletes to carry sports
                            equipment, clothing and training essentials with
                            ease.
                          </p>
                        </div>

                        <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                          <h3 className="font-normal text-gray-900 mb-2 text-base">
                            Tennis & Equipment Bags
                          </h3>

                          <p className="text-sm text-gray-600 leading-6">
                            Protective bags designed to store rackets, balls and
                            other tennis accessories while travelling to games
                            and training sessions.
                          </p>
                        </div>

                        <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                          <h3 className="font-normal text-gray-900 mb-2 text-base">
                            Backpacks for Everyday Use
                          </h3>

                          <p className="text-sm text-gray-600 leading-6">
                            Comfortable and practical backpacks suitable for
                            school, work, travel and carrying daily essentials.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>{" "}
              </div>
            </div>
          </div>
        </ProductsPageContainer>
      </Container>
    </>
  );
};

export default BagsPage;
