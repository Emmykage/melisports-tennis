import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

const FeaturedProducts = (props) => {
  const { name, image } = props;
  return (
    <div className="feature-grid my-3 box-shadow">
      <NavLink to={`/${name}`}>

        <div>
          <img src={image} alt="" />
        </div>
        <div className="text-center">
          <h4 className="text-primary">
            {' '}
            {name}
          </h4>
        </div>
      </NavLink>
    </div>
  );
};

export default FeaturedProducts;
