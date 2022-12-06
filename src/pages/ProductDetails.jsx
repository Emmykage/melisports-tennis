import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/product';

const tennisDetails = {
  title: 'Babolat Strike EVO Pre-Strung Tennis Racquet',
  price: '$143.23',
  head_size: 102,
  grip: 102,
  description: "Perfect for aspiring recreational players comes the Babolat Strike EVO Tennis Racquet. This racquet is lightweight and mobile and features a 10.4 ounce strung weight and a slightly larger 102 square inch head that provides players with more power, forgiveness and comfort. The color scheme and paint job provides a nice clean finish and this racquet comes prestrungyou're your convenience with a strong playing synthetic gut stringRacquet comes Pre-strung",
  Grip_Size: 0 - 4,
  images: [
    'https://www.e-tennis.com/pub/media/catalog/product/cache/f5f3da80ad7b670245aea7e970662954/1/0/101354-babolat-pure-aero-tennis-racquet-2019-black-yellow_4.webp',
    'https://www.e-tennis.com/pub/media/catalog/product/cache/f5f3da80ad7b670245aea7e970662954/1/0/101354_4_5.webp',
    'https://www.e-tennis.com/pub/media/catalog/product/cache/f5f3da80ad7b670245aea7e970662954/1/0/101354_6_5.webp',

    'https://www.e-tennis.com/pub/media/catalog/product/cache/f5f3da80ad7b670245aea7e970662954/1/0/101354-babolat-pure-aero-tennis-racquet-2019-black-yellow_4.webp',
    'https://www.e-tennis.com/pub/media/catalog/product/cache/f5f3da80ad7b670245aea7e970662954/1/0/101354_5_5.webp',
  ],
  Head_Size: '102 sq in.',
  Weight_Unstrung: '9.9oz',
  Length: '27in',
  Balance: '4pts Head Light',
  Cross_Section: '23/26/23mm',
  String_Pattern: '16 x 19',
  Flexibility: 65,
  Composition: 'Graphite',
  Power_Level: 'Medium',
  Swing_Speed: 'Medium, Moderate Swing',
  Grip_Type: 'Babolat Synthetic',
  Racquet_Color: 'White',
  String_Tension: '50-55lbs',

};

const ProductDetails = () => {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.product)
  const {id} = useParams();
  useEffect(()=>{
    dispatch(getProduct(id))
  }, [])
return (
  <div>
    <div className="row flex-center">
      <div className="col-md-6">
        <div className="product-display-image">

          <img src={product.image} alt="yeo" />
        </div>

        {/* <div className="img-prev flex-center">
          {tennisDetails.images.map((img, i) => (
            <img src={img} key={i} alt="prev" className="prev-img" />
          ))}

        </div> */}
      </div>
      <div className="col-md-6 prev-details">
        <h3>{product.title}</h3>
        <p>
          $
          {tennisDetails.price}
        </p>
        <p>
          Head size
          <span>{tennisDetails.head_size}</span>
        </p>
        <p>
          Grip size
          <span>
            {' '}
            {tennisDetails.grip}
          </span>
        </p>

        <div>
          <div>
            <button type="button">-</button>
            <span> 0</span>
            <button type="button">+</button>

          </div>
          <a href="#"> Add to Cart</a>

        </div>
      </div>

    </div>

    <div className="p-x5">
      <h4>Description</h4>
      {product.description}

    </div>
  </div>
)};

export default ProductDetails;
