import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Hero from "../../components/banner/Hero";
import bannerImage from "../../assets/images/banner/racquet-banner.jpg";
import { getProducts } from "../../redux/actions/product";

import Loader from "../Loader";

import Nav from "../../components/nav/Nav";
import { classLevels, classSports } from "../../constants/categories";
import useFilter from "../../hooks/useFilter";
import SideNav from "../../components/sideNav/SideNav";
import ProductsPageContainer from "../../components/productItems/ProductItems";
import ProductsGrid from "../../components/products/ProductsGridDisplay";
import useProducts from "../../hooks/useProducts";
import { featureItems } from "../../constants/variance";
import { useCategoryName } from "../../hooks/fetchHooks/useCategories";
import Container from "../../components/container";
import Header from "../../components/header/Header";
import { Helmet } from "react-helmet-async";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const q = useProducts({
    productCategory: "racquet",
    // selectedSports: 'Tennis',
    selectedLevels,
    selectedFeatures,
  });

  const {
    data: products,
    error,
    isLoading: loading,
    isFetching,
    isError,
    refetch,
    status,
  } = q;

  const { data: category } = useCategoryName({
    name: "racquet",
  });

  const handleFilteredProducts = (seive) => {
    console.log("[Initiate filter]: Filter initatiang with seive:", seive);
    const lowerCaseSieve = seive.toLowerCase();

    dispatch(
      getProducts({
        name: lowerCaseSieve,
      }),
    );
  };

  const handleFilteredLevels = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedLevels((prev) => [...prev, value]);
    } else {
      setSelectedLevels((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleFilteredFeatures = (e) => {
    const { checked, value } = e.target;
    checked
      ? setSelectedFeatures((prev) => [...prev, value])
      : setSelectedFeatures((prev) => prev.filter((item) => item !== value));
  };

  const handleSportFilter = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedSports((prev) => [...prev, value]);
    } else {
      setSelectedSports((prev) => prev.filter((item) => item !== value));
    }
  };

  console.log(products, "Error register =>", isError, error);

  return (
    <>
      <Container>
        <Helmet>
          <title>
            Tennis Rackets Online Nigeria | Buy Quality Racquets | Melisports
          </title>

          <meta
            name="description"
            content="
Shop tennis rackets online in Nigeria at Melisports.
Explore quality tennis racquets from trusted brands including
Babolat, Wilson and more. Find beginner and performance rackets
for every playing style.
"
          />

          <link rel="canonical" href="https://melisports.com/racquets" />

          <meta
            property="og:title"
            content="Tennis Rackets Online Nigeria | Melisports"
          />

          <meta
            property="og:description"
            content="
Shop quality tennis rackets and racquets online in Nigeria.
"
          />

          <meta property="og:image" content={bannerImage} />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",

              "@type": "CollectionPage",

              name: "Tennis Rackets Online Nigeria",

              description:
                "Shop tennis rackets and racquets online in Nigeria from trusted brands.",

              url: "https://melisports.com/racquets",

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

        <Hero image={bannerImage} title="Sport Rackets" />
        <ProductsPageContainer>
          <div className="flex flex-wrap gap-3 md:gap-6 max-w-lg my-6">
            <button
              onClick={() => dispatch(getProducts({ category: "racquet" }))}
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              All Rackets
            </button>

            <button
              onClick={() => handleFilteredProducts("pure aero")}
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              Pure Aero
            </button>

            <button
              onClick={() => handleFilteredProducts("pure strike")}
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              Pure Strike
            </button>

            <button
              onClick={() => handleFilteredProducts("pure drive")}
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              Pure Drive
            </button>
          </div>

          <div className="flex md:gap-10">
            <SideNav>
              <div>
                <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                  Racket Type
                </h6>
                <div className="space-y-2">
                  {featureItems.map((item) => (
                    <label
                      key={item.type}
                      htmlFor={item.type}
                      className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={item.type}
                        value={item.type}
                        onChange={handleFilteredFeatures}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-base">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section: Skill Level */}
              <div className="mt-4">
                <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                  Skill Level
                </h6>
                <div className="space-y-2">
                  {classLevels.map((level) => (
                    <label
                      key={level.level}
                      htmlFor={level.level}
                      className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={level.level}
                        value={level.level}
                        checked={selectedLevels.includes(level.level)}
                        onChange={handleFilteredLevels}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-base">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section: Brand */}
              <div>
                <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                  Brand
                </h6>
                <div className="space-y-2">
                  <label
                    htmlFor="babolat"
                    className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id="babolat"
                      value="babolat"
                      onChange={() => {}}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-base">Babolat</span>
                  </label>
                </div>
              </div>
            </SideNav>

            {loading ? (
              <Loader />
            ) : (
              <div className="product-align w-full">
                <ProductsGrid
                  products={products}
                  error={isError}
                  filter="racquet"
                />

                <section className="product-details color-grey mt-16 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-8 md:p-12 shadow-sm">
                  <div className="max-w-5xl mx-auto">
                    {/* Intro */}
                    <div className="mb-10">
                      <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">
                        Buy Tennis Rackets Online in Nigeria
                      </h2>

                      <p className="text-gray-600 leading-8 text-base md:text-lg">
                        Explore our collection of tennis rackets from leading
                        brands including Babolat and other trusted
                        manufacturers. Whether you are a beginner learning the
                        game or an advanced player looking for performance
                        equipment, Melisports offers quality tennis racquets at
                        competitive prices.
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-10" />

                    {/* Choosing Guide */}
                    <div>
                      <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">
                        Choose the Right Tennis Racket
                      </h2>

                      <p className="text-gray-600 leading-8 text-base md:text-lg mb-6">
                        Find beginner tennis rackets, lightweight racquets,
                        power rackets and control-focused models designed for
                        different playing styles.
                      </p>

                      {/* Feature Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                        <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                          <h3 className="font-normal text-gray-900 mb-2 text-base">
                            Beginner Tennis Rackets
                          </h3>

                          <p className="text-sm text-gray-600 leading-6">
                            Lightweight rackets designed for comfort, easy
                            swings and players starting their tennis journey.
                          </p>
                        </div>

                        <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                          <h3 className="font-normal text-gray-900 mb-2 text-base">
                            Performance Rackets
                          </h3>

                          <p className="text-sm text-gray-600 leading-6">
                            Advanced rackets built for players who need more
                            control, power and precision.
                          </p>
                        </div>

                        <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                          <h3 className="font-normal text-gray-900 mb-2 text-base">
                            Trusted Brands
                          </h3>

                          <p className="text-sm text-gray-600 leading-6">
                            Shop quality tennis rackets from recognised brands
                            trusted by players worldwide.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </ProductsPageContainer>
      </Container>
    </>
  );
};

export default ProductsPage;
