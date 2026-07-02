import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
// import Banner from '../components/banner/Banner';
import Hero from "../../components/banner/Hero";
import { getProducts } from "../../redux/actions/product";
import { closeList } from "../../redux/products/searched";
import { getProductCategories } from "../../redux/actions/product_category";
import Loader from "../Loader";
import bannerImage from "../../assets/images/banner/2021-Category-Banner-Tennis-Accessories.jpg";
import ProductsGrid from "../../components/products/ProductsGridDisplay";
import Nav from "../../components/nav/Nav";
import ProductsPageContainer from "../../components/productItems/ProductItems";
import SideNav from "../../components/sideNav/SideNav";
import useProducts from "../../hooks/useProducts";
import { useCategoryName } from "../../hooks/fetchHooks/useCategories";
import Container from "../../components/container";
import Header from "../../components/header/Header";
import { Helmet } from "react-helmet-async";
import { classSports } from "../../constants/categories";
import CheckBox from "../../components/checkbox/checkbox";

const AccessoriesPage = () => {
  const dispatch = useDispatch();
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const {
    data: products,
    status,
    error,
    isLoading: loading,
  } = useProducts({
    category: "accessory",
    sport: selectedSports,
    levels: selectedLevels,
    features: selectedFeatures,
  });

  const { data: category } = useCategoryName({
    name: "accessory",
  });
  const handleFilteredProducts = (seive) => {
    const lowerCaseSieve = seive.toLowerCase();
    console.log(lowerCaseSieve);

    dispatch(getProducts({ name: lowerCaseSieve }));
  };

  const handleFilteredActivities = (e) => {
    if (e.target.checked) {
      dispatch(getProducts());
    } else {
      dispatch(getProducts());
    }
  };

  const handleFilteredFeatures = (e) => {
    if (e.target.checked) {
      dispatch(getProducts());
    } else {
      dispatch(getProducts());
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

  return (
    <>
      <Container>
        <Helmet>
          <title>
            Tennis Accessories Online Nigeria | Buy Tennis Accessories, balls
            and grips | Melisports
          </title>

          <meta
            name="description"
            content="
        Shop tennis Accessories online in Nigeria at Melisports.
        Explore quality tennis balls and grips from trusted brands including
        Babolat, Wilson and more. Find beginner and performance enhanced apparels for every playing style.
        "
          />

          <link rel="canonical" href="https://melisports.com/accessories" />

          <meta
            property="og:title"
            content="Tennis Accessories and balls Online Nigeria | Melisports"
          />

          <meta
            property="og:description"
            content="
        Shop quality tennis accessories and grips online in Nigeria"
          />

          <meta property="og:image" content={bannerImage} />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",

              "@type": "CollectionPage",

              name: "Tennis Accessories Online Nigeria",

              description:
                "Shop tennis accessories and balls online in Nigeria from trusted brands like babolat.",

              url: "https://melisports.com/apparels",

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

        <Hero image={bannerImage} title="Accessories" />
        <ProductsPageContainer>
          <div className="prod-page">
            <div className="cat-group gap-6 max-w-3xl my-6">
              <button
                className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                onClick={() => dispatch(getProducts())}
              >
                All Accessories
              </button>
              <button
                className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                onClick={() => handleFilteredProducts("racquet")}
              >
                {" "}
                Racket Accessories
              </button>
              <button
                className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                onClick={() => handleFilteredProducts("court")}
              >
                {" "}
                Court Accessories
              </button>
              <button
                className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                onClick={() => handleFilteredProducts("fan")}
              >
                {" "}
                Fan Accessories
              </button>
            </div>

            <div className="flex md:gap-10">
              <SideNav>
                <div className="side-row">
                  <h6 className="my-4">Activities</h6>
                </div>
                <div />
                <div className="side-row">
                  <div className="space-y-2">
                    {classSports.map((item) => (
                      <CheckBox
                        type="checkbox"
                        onChange={handleSportsFilter}
                        id={item.type}
                        value={item.type}
                        label={item.label}
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
                    status={status}
                    error={error}
                  />
                )}
                <section className="product-details color-grey mt-16 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-8 md:p-12 shadow-sm">
                  <div className="max-w-5xl mx-auto">
                    {/* Intro */}
                    <div className="mb-10">
                      <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">
                        Buy Sports Accessories and Balls Online in Nigeria
                      </h2>

                      <p className="text-gray-600 leading-8 text-base md:text-lg">
                        Explore our collection of quality sports accessories and
                        balls designed for training, competition and
                        recreational activities. From tennis balls and footballs
                        to essential sports equipment, Melisports provides
                        reliable gear from trusted brands for athletes, teams
                        and sports enthusiasts.
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-10" />

                    {/* Choosing Guide */}
                    <div>
                      <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">
                        Find the Right Sports Equipment Accessories
                      </h2>

                      <p className="text-gray-600 leading-8 text-base md:text-lg mb-6">
                        Having the right accessories improves your training
                        experience and helps you get the best performance from
                        your equipment. Choose from essential sports gear based
                        on your game, training needs and playing style.
                      </p>

                      {/* Feature Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                        <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                          <h3 className="font-normal text-gray-900 mb-2 text-base">
                            Sports Balls
                          </h3>

                          <p className="text-sm text-gray-600 leading-6">
                            Shop quality balls for different sports including
                            football, tennis and training activities designed
                            for consistent performance.
                          </p>
                        </div>

                        <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                          <h3 className="font-normal text-gray-900 mb-2 text-base">
                            Training Accessories
                          </h3>

                          <p className="text-sm text-gray-600 leading-6">
                            Find essential training equipment and accessories
                            that support practice sessions, skill development
                            and sports preparation.
                          </p>
                        </div>

                        <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                          <h3 className="font-normal text-gray-900 mb-2 text-base">
                            Quality Sports Gear
                          </h3>

                          <p className="text-sm text-gray-600 leading-6">
                            Shop durable sports accessories from trusted brands
                            built for athletes, teams and everyday sports
                            activities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </ProductsPageContainer>
      </Container>
    </>
  );
};
export default AccessoriesPage;
