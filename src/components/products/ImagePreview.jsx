import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoAddSharp } from 'react-icons/io5';
// const images =[
//     {
//     url: "https://berkhamstedsports.com/wp-content/uploads/2023/01/image-1.png",
// },
//     {url: "https://berkhamstedsports.com/wp-content/uploads/2023/01/image-1.png"},
//     {
// url: "https://berkhamstedsports.com/wp-content/uploads/2023/01/image.png"
// },
// {
//     url: "https://berkhamstedsports.com/wp-content/uploads/2023/01/image-1.png"
// }]

const ImagePreview = ({ images }) => {
  const setView = (index) => {
    setImageIndex(index);
  };
  const showNextImage = () => {
    setImageIndex((index) => {
      if (index == images.length - 1) return 0;
      return index + 1;
    });
  };
  const showPrevImage = () => {
    setImageIndex((index) => {
      if (index == 0) return images.length - 1;
      return index - 1;
    });
  };
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div className="image-slider centralize gap-2 sm-row-col">
      <div className="border-gray-light relative image-card overflow-hidden">
        <button onClick={showPrevImage} className="z-10 absolute image-slider-btn" style={{ left: '0' }}><FaArrowLeft /></button>
        <button onClick={showNextImage} className="z-10 absolute image-slider-btn" style={{ right: '0px' }}><FaArrowRight /></button>

        <div className="h-full w-full flex z-0">
          {images.map((image) => (
            <img src={image} style={{ translate: `${-100 * imageIndex}%` }} alt="image" className="h-full w-full image-slider-img" />

          ))}
        </div>

      </div>
      <div className="my-2 flex  flex-col thumbnail-div">
        {images.map((image, index) => (
          <>
            {' '}
            <div onClick={() => setView(index)} className="thumbnail border my-1"><img src={image} alt="" className="w-full h-full" /></div>
            {/* <div onClick={()=>setView(index)} className='thumbnail border'><img src={image} alt="" className='w-full h-full' /></div> */}

          </>

        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
