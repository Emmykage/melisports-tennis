import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoAddSharp } from 'react-icons/io5';

const ImagePreview = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imagePrev, setImagePrev] = useState('');
  const [showImage, setShowImage] = useState(false);
  const imageBoxRef = useRef();

  const setView = (index) => {
    setImageIndex(index);
  };
  const showNextImage = () => {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  };
  const showPrevImage = () => {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  };

  const handlePrev = (image, index) => {
    setImagePrev(image);
    setShowImage((prev) => !prev);
  };

  useEffect(() => {
    const closeModal = (e) => {
      if (!imageBoxRef.current.contains(e.target)) {
        setShowImage(false);
      }
    };

    document.addEventListener('click', closeModal);

    // return () => {
    //   document.removeEventListener('mousedown', closeModal);

    // }
  }, []);
  return (

    <>

      <div className="">
        <div className="border flex relative h-96 md:h-[600px] overflow-hidden ">
          <button onClick={showPrevImage} className="z-10 absolute image-slider-btn" style={{ left: '0' }}><FaArrowLeft /></button>
          <button onClick={showNextImage} className="z-10 absolute image-slider-btn " style={{ right: '0px' }}><FaArrowRight /></button>

          {images.map((image) => (
            <div

              key={image}
              style={{ translate: `${-100 * imageIndex}%` }}
              className="h-full w-full flex  image-slider-img border shrink-0  z-0"
            >

              <img
                src={image}

                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev(image);
                }}
                alt="image"
                className="h-full w-full object-contain "
              />
            </div>

          ))}

        </div>
        <div className="my-2 flex flex-wrap gap-3 ">
          {images.map((image, index) => (
            <>
              {' '}
              <div onClick={() => setView(index)} className="w-16 h-16 md:w-20 md:h-20 border my-1 border-gray-300 p-1">
                <img src={image} alt="" className="w-full h-full gap-3" />
              </div>
              {/* <div onClick={()=>setView(index)} className='thumbnail border'><img src={image} alt="" className='w-full h-full' /></div> */}

            </>

          ))}
        </div>
      </div>

      <div className={`${showImage ? 'show' : ''} imagePrevModal w-full h-full fixed top-0 left-0 flex justify-center items-center z-50 bg-black/50`}>

        <div ref={imageBoxRef} className=" rounded shadow max-w-[500px] max-h-[500px] w-full h-full bg-white overflow-hidden">
          <img src={imagePrev} alt="" className="w-full h-full" />

        </div>

      </div>

    </>
  );
};

export default ImagePreview;
