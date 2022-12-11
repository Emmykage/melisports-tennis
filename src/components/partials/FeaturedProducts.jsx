import React from 'react';
// import PropTypes from 'prop-types';
import './style.css';

const FeaturedProducts = (props) => {
  const { name, image } = props;
  return (
    <div className="feature-grid m-h2">
      <div>
        <img src={image} alt="" />
      </div>
      <div className="center">
        <h4>
          {' '}
          {name}
        </h4>
      </div>
    </div>
  );
};

export default FeaturedProducts;
