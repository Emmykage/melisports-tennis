import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import shoeImage from '../../assets/images/banner/Jet_Tere_692x364_1.avif';
import badmington from '../../assets/images/banner/X-feel_692_x_364_px.avif';

import ReactSlider from '../../components/slider/CategoriesSlider';
import { getSportCategories } from '../../redux/actions/product_category';
import SurveyButton from '../../components/feature/survey-button';
import CollectImage from '../../assets/images/banner/692x364_FW_Lebron_1.avif';
import RangeImage from '../../assets/images/banner/Satelite_692x364__px.avif';
import DiscoverBtn from '../../components/buttons/DiscoverBtn';
import ProductSlider from '../../components/slider/ProductSlider';
import Tennis from '../../assets/images/banner/Cat_product_tennis.avif';
import Padel from '../../assets/images/banner/Cat_product_padel.avif';
import Badminton from '../../assets/images/banner/test_badminton.avif';
import './home.scss';
import HomeEquipmentInfo from '../../components/HomeEquipmentInfo/HomeEquipmentInfo';
import Reviews from '../../components/reviews/Reviews';
import Nav from '../../components/nav/Nav';
import { getLetestProducts, getProducts } from '../../redux/actions/product';
import BrandsSponsorComponents from '../../components/brandSponsors/BrandsSponsorComponents';
import { clearSearch } from '../../redux/products/product';
import bannerImg from '../../assets/images/banner/banner-1.jpg';

const ShopHome = () => {
  const categories = useSelector((state) => state.categories);
  const { products, latestArrival } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearSearch());
    dispatch(getSportCategories());
    dispatch(getProducts());

    dispatch(getLetestProducts());
  }, []);

  return (
    <>
      <Nav />

      <section className="px-6 py-24 bg-theme">
        <div className="grid gap-8 md:grid-cols-3 max-w-[1400px] mx-auto">

          {[
            { title: 'Tennis', img: Tennis, link: '/tennis' },
            { title: 'Padel', img: Padel, link: '/padels' },
            { title: 'Badminton', img: Badminton, link: '/badminton' },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.link}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Background image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                <h3 className="text-xl md:text-2xl text-white font-semibold tracking-wide p-6 bg-black/40 rounded-md backdrop-blur-sm mb-6 ml-6">
                  {item.title}
                </h3>
              </div>
            </NavLink>
          ))}

        </div>
      </section>



            <section className='mt-4'>

              <div className='max-w-7xl m-auto'>

              <img src={bannerImg} alt="add banner" className="w-full object-contain h-full" onClick={() => navigate('/sales')} />
                    </div>

            </section>

      <section className="px-4 py-10 bg-white/90 my-10">
        <div className="max-w-7xl m-auto feature">
          <h3 className="text-3xl text-center my-4">Products </h3>
          <ProductSlider products={products} views={4} />

        </div>
      </section>

      <section className="px-4 md:px-8 my-12">
        <div className="grid gap-8 md:grid-cols-2 max-w-7xl m-auto">

          {/* Collection Card */}
          <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <div className="h-60 md:h-96 overflow-hidden">
              <img
                src={CollectImage}
                alt="Juan Lebron Collection"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-5">
              <h3 className="text-sm md:text-lg font-semibold text-gray-800 tracking-wide">
                NEW JUAN LEBRON COLLECTION
              </h3>
              <DiscoverBtn
                btnText="Discover"
                className="text-sm px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
              />
            </div>
          </div>

          {/* Another Collection Card */}
          <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <div className="h-60 md:h-96 overflow-hidden">
              <img
                src={RangeImage}
                alt="New Range Collection"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-5">
              <h3 className="text-sm md:text-lg font-semibold text-gray-800 tracking-wide">
                NEW RANGE COLLECTION
              </h3>
              <DiscoverBtn
                btnText="Discover"
                className="text-sm px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
              />
            </div>
          </div>

        </div>
      </section>

      {latestArrival.length > 0 &&

      <section className="px-3  py-20">
        <h3 className="text-2xl text-center">
          {' '}
          <NavLink className="hover:text-primary" to="/arrivals"> New Arrival</NavLink>
        </h3>
        <div className="m-auto max-w-7xl my-6 bg-white p-4 md:p-10 border rounded shadow-sm">
          {latestArrival.length > 0 ? <ProductSlider products={latestArrival} views={4} /> : <span className="text-xl block font-medium text-center"> New Arrivals will be updated Soon</span> }

        </div>
      </section>}

      <div>
        <div className="flex m-auto section-container gap-2">
          <NavLink to="/store" className="flex-1 zoom-hover h-52 md:h-80">
            <img src={shoeImage} alt="" className=" w-full h-full" />
          </NavLink>
          <NavLink to="/store" className="flex-1 zoom-hover h-52 md:h-80">
            <img src={badmington} alt="" className="w-full h-full" />
          </NavLink>
        </div>

      </div>
      <div className="my-6 bg-white py-10">
        <h3 className=" text-center font-medium  text-3xl my-3"> Shop Categories</h3>

        <div className="px-3 boder max-w-[1500px] ma m-auto h-96 w-full my-7 bg-white border-black">
          <ReactSlider categories={categories} />
        </div>

      </div>

      <HomeEquipmentInfo />
      <SurveyButton />
      <Reviews />
      <BrandsSponsorComponents />

    </>
  );
};

export default ShopHome;
