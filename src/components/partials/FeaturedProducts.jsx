import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

const FeaturedProducts = (props) => {
  const { name, image } = props;
  return (
    <div className="feature-grid m-h2 box-shadow">
      <NavLink to={`${'/'}`}>

        <div>
          <img src={image} alt="" />
        </div>
        <div className="center">
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
