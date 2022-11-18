import React from 'react';
import { useSelector } from 'react-redux';
import Banner from '../components/banner/Banner';
import FeaturedProducts from '../components/partials/FeaturedProducts';
// import { getCategories } from '../redux/category/categories';
const Home = () => { 
  const categories = useSelector((state) => state.categories)
  return (
  <>
  <Banner />
  <div>
 <h3 className='center fs-3'> Featured Products</h3>
 {categories.map((category) => (
  <FeaturedProducts key={category.id} categories={categories} />
  ))}


</div>
</>
)};

export default Home;
