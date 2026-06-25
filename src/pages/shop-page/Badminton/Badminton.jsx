import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../../../components/banner/Hero";
import { getProducts } from "../../../redux/actions/product";

import { closeList } from "../../../redux/products/searched";
import { getProductCategories } from "../../../redux/actions/product_category";
import bannerImage from "../../../assets/images/banner/best-badminton-background-gyixxvloqmf5t6of.webp";
import Loader from "../../Loader";
import ProductFilter from "../../../components/products/ProductFilter";
import ProductsGrid from "../../../components/products/ProductsGridDisplay";
import Nav from "../../../components/nav/Nav";
import SideNav from "../../../components/sideNav/SideNav";
import useFilter from "../../../hooks/useFilter";
import ProductsPageContainer from "../../../components/productItems/ProductItems";
import { flexibility, playType } from "../../../constants/variance";
import useProducts from "../../../hooks/useProducts";
import { useCategoryName } from "../../../hooks/fetchHooks/useCategories";
import Container from "../../../components/container";
import Header from "../../../components/header/Header";

const levels = [
  {
    label: "Beginner",
    level: "beginner",
  },
  {
    label: "Professional",

    level: "professional",
  },
  {
    label: "Intermediate",

    level: "intermediate",
  },
  {
    label: "Junior",

    level: "junior",
  },
];

const BadmintonsPage = () => {
  const dispatch = useDispatch();
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFeature, setSelectedFeatures] = useState([]);

  const handleFilteredLevels = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedLevels((prev) => [...prev, value]);
    } else {
      setSelectedLevels((prev) => prev.filter((item) => item !== value));
    }
  };

  const {
    data: products,
    isLoading: loading,
    status,
    error,
  } = useProducts({
    sport: "Badminton",
    features: selectedFeature,
    levels: selectedLevels,
  });

  const { data: category } = useCategoryName({
    name: "racquet",
  });

  console.log(products);

  const handleFilteredFeatures = (e) => {
    const { checked, value } = e.target;
    checked
      ? setSelectedFeatures((prev) => [...prev, value])
      : setSelectedFeatures((prev) => prev.filter((item) => item !== value));
  };

  return (
    <div className="">
      <Container>
        <Hero image={bannerImage} title="Badminton" />

        <ProductsPageContainer>
          <div className="flex md:gap-10">
            <SideNav>
              <div className="mt-4">
                <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                  Play Type
                </h6>
                {levels.map((level) => (
                  <span key={level.value} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(level.level)}
                      id={level.level}
                      value={level.level}
                      onChange={handleFilteredLevels}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3"
                    />

                    <label htmlFor={level.level} style={{ fontSize: "1rem" }}>
                      {level.label}
                    </label>
                  </span>
                ))}
              </div>
              <div className="">
                <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                  Flexibility
                </h6>

                {flexibility.map((item) => (
                  <div key={item.value} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={item.type}
                      value={item.type}
                      className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={handleFilteredFeatures}
                    />

                    <label htmlFor="control" style={{ fontSize: "1rem" }}>
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </SideNav>

            {loading ? (
              <Loader />
            ) : (
              <div className="product-align w-full">
                <ProductsGrid
                  products={products}
                  status={status}
                  error={error}
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
            <div />
          </div>
        </ProductsPageContainer>
      </Container>
    </div>
  );
};

export default BadmintonsPage;
