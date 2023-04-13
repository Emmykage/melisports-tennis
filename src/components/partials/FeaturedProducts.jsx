import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import './style.css';

const FeaturedProducts = (props) => {
  const { name, image } = props;
  return (
    <div className="feature-grid m-h2">
      <NavLink to={`${name}`}>

     
      <div>
        <img src={image} alt="" />
      </div>
      <div className="center">
        <h4>
          {' '}
          {name}
        </h4>
      </div>
      </NavLink>
    </div>
  );
};

export default FeaturedProducts;
