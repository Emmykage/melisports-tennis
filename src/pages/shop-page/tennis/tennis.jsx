import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../../../components/banner/Hero";
import { getProducts } from "../../../redux/actions/product";
import bannerImage from "../../../assets/images/banner/babolat-wimby-desktop-banner1.jpg";
import Loader from "../../Loader";
import Products from "../../../components/products/ProductsGridDisplay";
import Nav from "../../../components/nav/Nav";
import { featureItems } from "../../../constants/properties";
import useFilter from "../../../hooks/useFilter";
import { collections, playType } from "../../../constants/variance";
import SideNav from "../../../components/sideNav/SideNav";
import ProductsPageContainer from "../../../components/productItems/ProductItems";
import useProducts from "../../../hooks/useProducts";
import { classLevels } from "../../../constants/categories";
import ProductsGrid from "../../../components/products/ProductsGridDisplay";
import { useCategoryName } from "../../../hooks/fetchHooks/useCategories";
import Container from "../../../components/container";
import Header from "../../../components/header/Header";
import { Helmet } from "react-helmet-async";

const TennisPage = () => {
  const dispatch = useDispatch();

  const [collection, setCollections] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const {
    data: products,
    error,
    isLoading: loading,
  } = useProducts({
    category: "racquet",
    sport: "Tennis",
    levels: selectedLevels,
    features: selectedFeatures,
  });

  const { data: category } = useCategoryName({
    name: "racquet",
  });

  const handleFilteredFeatures = (e) => {
    const { checked, value } = e.target;
    checked
      ? setSelectedFeatures((prev) => [...prev, value])
      : setSelectedFeatures((prev) => prev.filter((item) => item !== value));
  };

  const handleFilteredLevel = (e) => {
    const { checked, value } = e.target;
    checked
      ? setSelectedLevels((prev) => [...prev, value])
      : setSelectedLevels((prev) => prev.filter((item) => item !== value));
  };
  return (
    <div className="">
      <Container>
        <Helmet>
          <title>
            Tennis Rackets Online Nigeria | Buy Tennis Racquets | Melisports
          </title>

          <meta
            name="description"
            content="
        Shop tennis rackets online in Nigeria at Melisports.
        Browse Babolat, Wilson and other quality tennis racquets
        for beginners, intermediate and professional players.
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
        Shop quality tennis racquets online in Nigeria.
        "
          />

          <meta property="og:image" content={bannerImage} />
        </Helmet>

        <Hero image={bannerImage} title="Tennis Rackets" />

        <ProductsPageContainer>
          <h2 className="text-2xl font-normal text-gray-900 mb-4">Tennis</h2>
          <p className="text-gray-600 mb-6">
            Explore our collection of Babolat Tennis Categories Rackets, find
            the perfect Tennis gears to enhance your game.
          </p>

          <div className="flex md:gap-10">
            <SideNav>
              <div>
                <div className="space-y-2 my-4">
                  <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                    Player Type
                  </h6>
                  {classLevels.map((level) => (
                    <span className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={selectedLevels.some(
                          (lev) => lev == level.value,
                        )}
                        id={level.value}
                        value={level.value}
                        onChange={handleFilteredLevel}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3"
                      />

                      <label htmlFor={level.value} style={{ fontSize: "1rem" }}>
                        {level.label}
                      </label>
                    </span>
                  ))}
                </div>

                <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                  Player Type
                </h6>

                <div className="space-y-2">
                  {featureItems.map((item) => (
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={item.value}
                        value={item.value}
                        className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleFilteredFeatures}
                      />

                      <label htmlFor={item.value} style={{ fontSize: "1rem" }}>
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </SideNav>
            <div className="product-align w-full">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <ProductsGrid products={products} error={error} />
                </>
              )}
              <section className="product-details color-grey mt-16 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-8 md:p-12 shadow-sm">
                <div className="max-w-5xl mx-auto">
                  {/* Intro */}
                  <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">
                      Buy Tennis Rackets Online in Nigeria
                    </h2>

                    <p className="text-gray-600 leading-8 text-base md:text-lg">
                      Explore our collection of tennis rackets from leading
                      brands including Babolat and other trusted manufacturers.
                      Whether you are a beginner learning the game or an
                      advanced player looking for performance equipment,
                      Melisports offers quality tennis racquets at competitive
                      prices.
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
                      Find beginner tennis rackets, lightweight racquets, power
                      rackets and control-focused models designed for different
                      playing styles.
                    </p>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                      <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                        <h3 className="font-normal text-gray-900 mb-2 text-base">
                          Beginner Tennis Rackets
                        </h3>

                        <p className="text-sm text-gray-600 leading-6">
                          Lightweight rackets designed for comfort, easy swings
                          and players starting their tennis journey.
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
          </div>
        </ProductsPageContainer>
      </Container>
    </div>
  );
};

export default TennisPage;
