import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../../../components/banner/Hero";
import bannerImage from "../../../assets/images/banner/Babolat_padel_rackets_banner_1 (1).jpg";
import Loader from "../../Loader";
import Nav from "../../../components/nav/Nav";
import { headShapes, playType } from "../../../constants/variance";
import SideNav from "../../../components/sideNav/SideNav";
import ProductsPageContainer from "../../../components/productItems/ProductItems";
import useProducts from "../../../hooks/useProducts";
import ProductsGrid from "../../../components/products/ProductsGridDisplay";
import { useCategoryName } from "../../../hooks/fetchHooks/useCategories";
import Container from "../../../components/container";
import Header from "../../../components/header/Header";
import CheckBox from "../../../components/checkbox/checkbox";

const Padels = () => {
  const dispatch = useDispatch();

  const [selectedHeadShape, setSelectedHeadShape] = useState([]);
  const [selectedPlayType, setSelectedPlayType] = useState([]);

  const {
    data: products,
    error,
    isLoading: loading,
  } = useProducts({
    sport: "Padel",
    head_shape: selectedHeadShape,
    play_type: selectedPlayType,
    category: "racquet",
  });

  const { data: category } = useCategoryName({
    name: "racquet",
  });

  const handleFilteredPlayType = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedPlayType((prev) => [...prev, value]);
    } else {
      setSelectedPlayType((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleFilteredHeadshape = (e) => {
    const { checked, value } = e.target;
    checked
      ? setSelectedHeadShape((prev) => [...prev, value])
      : setSelectedHeadShape((prev) => prev.filter((item) => item !== value));
  };

  return (
    <Container>
      <Hero image={bannerImage} title="Padel" />

      <ProductsPageContainer>
        <h2 className="text-2xl font-normal text-gray-900 mb-4">
          Padel Rackets
        </h2>
        <p className="text-gray-600 mb-6">
          Explore our collection of Babolat Padel Rackets, designed for players
          of all levels. Whether you're a beginner or a professional, find the
          perfect racket to enhance your game.
        </p>
        {/* <div className="cat-group justify-between max-w-md my-6">
          <a className="btn" onClick={() => handleFilteredProducts('pure aero')}> Pure Aero</a>
          <a className="btn" onClick={() => handleFilteredProducts('pure strike')}> Pure Strike</a>
          <a className="btn" onClick={() => handleFilteredProducts('pure drive')}> Pure Drive</a>
          <a className="btn" onClick={() => dispatch(getProducts())}>All Rackets</a>

        </div> */}

        <div className="flex md:gap-10">
          <SideNav>
            <div className="mt-4">
              <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                Play Type
              </h6>
              <div className="space-y-2">
                {playType.map((play) => (
                  <CheckBox
                    type="checkbox"
                    checked={selectedPlayType.includes(play.value)}
                    id={play.value}
                    value={play.value}
                    label={play.label}
                    onChange={handleFilteredPlayType}
                  />
                ))}
              </div>
            </div>
            <div>
              <h6 className="text-gray-800 my-4 font-semibold mb-3 tracking-wide">
                Head Shape
              </h6>
              <div className="space-y-2">
                {headShapes.map((item) => (
                  <CheckBox
                    type="checkbox"
                    id={item.value}
                    value={item.value}
                    checked={selectedHeadShape.includes(item.value)}
                    onChange={handleFilteredHeadshape}
                    label={item.label}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>
          </SideNav>
          {loading ? (
            <Loader />
          ) : (
            <div className="product-align w-full">
              <ProductsGrid products={products} error={error} />

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
          )}
          <div />
        </div>
      </ProductsPageContainer>
    </Container>
  );
};

export default Padels;
