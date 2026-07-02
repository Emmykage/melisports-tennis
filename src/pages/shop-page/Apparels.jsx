import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/product";
import bannerImage from "../../assets/images/banner/BABcup_1365x510-Version-1_no_logo.avif";
import Hero from "../../components/banner/Hero";
import Loader from "../Loader";
import ProductsGrid from "../../components/products/ProductsGridDisplay";
import Nav from "../../components/nav/Nav";
import useFilter from "../../hooks/useFilter";
import { classSports, genderItems } from "../../constants/categories";
import SideNav from "../../components/sideNav/SideNav";
import ProductsPageContainer from "../../components/productItems/ProductItems";
import useProducts from "../../hooks/useProducts";
import { useCategoryName } from "../../hooks/fetchHooks/useCategories";
import Container from "../../components/container";
import Header from "../../components/header/Header";
import { Helmet } from "react-helmet-async";
import CheckBox from "../../components/checkbox/checkbox";

const ApparelsPage = () => {
  const dispatch = useDispatch();
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const {
    data: products,
    error,
    isLoading: loading,
  } = useProducts({
    category: "apparel",
    sport: selectedSports,
    levels: selectedLevels,
    features: selectedFeatures,
    gender: selectedGenders,
  });

  const { data: category } = useCategoryName({
    name: "apparel",
  });
  const handleFilteredProducts = (seive) => {
    console.log(seive);
    const lowerCaseSieve = seive.toLowerCase();

    dispatch(
      getProducts({
        gender: lowerCaseSieve,
      }),
    );
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
            Tennis Shoes Online Nigeria | Buy Quality Tennis Shoes | Melisports
          </title>

          <meta
            name="description"
            content="
Shop tennis apparels amd clothings online in Nigeria at Melisports.
Explore quality tennis shoes from trusted brands including
Babolat, Wilson and more. Find beginner and performance enhanced apparels for every playing style.
"
          />

          <link rel="canonical" href="https://melisports.com/apparels" />

          <meta
            property="og:title"
            content="Tennis Apparels and clothes Online Nigeria | Melisports"
          />

          <meta
            property="og:description"
            content="
Shop quality tennis apparels and clothings online in Nigeria.
"
          />

          <meta property="og:image" content={bannerImage} />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",

              "@type": "CollectionPage",

              name: "Tennis Apparels Online Nigeria",

              description:
                "Shop tennis and sport and apparels and cloths online in Nigeria from trusted brands like babolat.",

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

        <Hero image={bannerImage} title="Apparels" />
        <ProductsPageContainer>
          <div className="cat-group gap-2 md:gap-6 max-w-md my-6">
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => dispatch(getProducts())}
            >
              All Apparels
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

              <div>
                <h6 className="my-4">Category</h6>
                <div className="space-y-2">
                  {genderItems.map((item) => (
                    <CheckBox
                      type="checkbox"
                      label={item.label}
                      id={item.type}
                      value={item.type}
                      onChange={handleGenderFilter}
                    />
                  ))}
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
                      Buy Sports Apparel Online in Nigeria
                    </h2>

                    <p className="text-gray-600 leading-8 text-base md:text-lg">
                      Explore our collection of quality sports apparel designed
                      for athletes, teams and active lifestyles. From training
                      wear and performance clothing to jerseys and comfortable
                      everyday sportswear, Melisports offers durable and stylish
                      apparel from trusted brands for different sports and
                      activities.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 my-10" />

                  {/* Choosing Guide */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">
                      Choose the Right Sportswear
                    </h2>

                    <p className="text-gray-600 leading-8 text-base md:text-lg mb-6">
                      The right sports clothing provides comfort, flexibility
                      and performance during training, competition and everyday
                      activities. Choose apparel based on your sport, fit
                      preference and performance needs.
                    </p>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                      <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                        <h3 className="font-normal text-gray-900 mb-2 text-base">
                          Training & Performance Wear
                        </h3>

                        <p className="text-sm text-gray-600 leading-6">
                          Comfortable sports clothing designed for workouts,
                          training sessions and active movement with breathable
                          materials and flexible fits.
                        </p>
                      </div>

                      <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                        <h3 className="font-normal text-gray-900 mb-2 text-base">
                          Team Jerseys & Sports Kits
                        </h3>

                        <p className="text-sm text-gray-600 leading-6">
                          Shop football jerseys, team apparel and sports outfits
                          suitable for players, supporters and sporting events.
                        </p>
                      </div>

                      <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition">
                        <h3 className="font-normal text-gray-900 mb-2 text-base">
                          Comfortable Everyday Sportswear
                        </h3>

                        <p className="text-sm text-gray-600 leading-6">
                          Versatile athletic clothing suitable for casual wear,
                          fitness activities and an active lifestyle.
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
    </>
  );
};

export default ApparelsPage;
