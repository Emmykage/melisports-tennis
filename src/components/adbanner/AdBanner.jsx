import React from 'react';
import { useNavigate } from 'react-router-dom';

import bannerImg from '../../assets/images/banner/banner-1.jpg';
import bannerImgxmas from '../../assets/images/banner/melisport-christmas.jpeg';
import bannerImgxmas1 from '../../assets/images/banner/shopping-now.png';

const AdBanner = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="max-w-[1400px] my-10 md:h-[800px] m-auto flex  flex-col border  lg:flex-row gap-4 px-4 lg:px-0 lg:py-0">
        <div className="md:w-96 h-full  bg-blue-600 ">
          <img
            src={bannerImgxmas}
            alt="x-mas sales banner"
            className="w-full h-full object-fill md:object-fill cursor-pointer"
            onClick={() => navigate('/sales')}
          />

        </div>
        <div className="flex flex-1 flex-col gap-4">

          <div className="md:flex-1 h-80 md:h-96 bg-red-300">
            <img
              src={bannerImg}
              alt="add banner"
              className="object-fill md:object-fill h-full w-full cursor-pointer"
              onClick={() => navigate('/sales')}
            />
          </div>
          {' '}
          <div className="md:flex-1 h-80 md:h-96 d-300">
            <img
              src={bannerImgxmas1}
              alt="add banner"
              className="object-fill md:object-fill h-full w-full cursor-pointer"
              onClick={() => navigate('/sales')}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AdBanner;
