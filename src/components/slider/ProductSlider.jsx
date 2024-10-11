import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Autoplay, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { naira_format } from '../../utils/naira_format'
import { NavLink } from 'react-router-dom'

const ProductSlider = ({products, views=4}) => {
    const [mobileView, setMobileView] = useState(false)
useEffect(()=> {

    const handleResize = () => {
        setMobileView(window.innerWidth < 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener("resize", handleResize)

}, [])  
  return (
         <div className="slide">

<Swiper
  loop={true}
  speed={700}
  slidesPerView={mobileView ? 1 : views}
  autoplay={{ delay: 3000, disableOnInteraction: false }}  // Autoplay configuration
  modules={[EffectFade, Autoplay]}
    spaceBetween={10}

  className="mySwiper"
>

    {products?.slice(0, 12).map(item => (
            <SwiperSlide key={item.id}>

                <div className='h-96 px-1 relative rounded overflow-hidden border w-full card'>
                  {item.new_product &&               
                  <div className='absolute top-6 left-0 p-2 bg-red-600/70 rounded'>
                    <p className='text-white font-semibold'>New</p>


                  </div>}
              
    
                    <div className='h-full'>
                        <NavLink to={`/productdetails/${item?.id}`}>

                    <img src={item?.photo_urls ? item?.photo_urls[0] :  item?.image} className='h-full w-full object-contain' />
                    </NavLink>

                    </div>

                    <div className='absolute overlay z-10 bottom-0 left-0 h-1/2 w-full bg-theme/60'>
                    <p className='text-white underline'>{item?.sport_category?.name}</p>
                    <p className='text-white  underline-offset-2 text-base font- block'>{item?.name}</p>

                    <p className='text-lg text-white font- my-6'>{naira_format(item?.price)}</p>
                    </div>
                    <div className='info-fix min-h-16 absolute bottom-0 left-0 w-full bg-theme/70 text-center flex items-center justify-center transition-all ease-linear duration-300 px-5'>
                    <p className='text-white  underline-offset-2 text-base font-'>{item?.name}</p>

                    </div>

                </div>
            {' '}
            </SwiperSlide>
    ))}

</Swiper>
</div>
  )
}

export default ProductSlider