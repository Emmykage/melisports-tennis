import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Banner } from '../components/banner/Banner';
import FeaturedProducts from '../components/partials/FeaturedProducts';
import { getCategories } from '../redux/category/categories';

const Home = () => {
  const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories);
  });
  return (
    <>
      <Banner />
      <div className="m-h4">
        <h3 className="center fs-3 m-h2"> Featured Products</h3>

        <div className="feature-div m-auto flex-center-around">
          {categories.map((category) => (
            <FeaturedProducts
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
            />
          ))}

        </div>

      </div>
    </>
  );
};

export default Home;
