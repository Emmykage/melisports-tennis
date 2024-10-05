
// import { Carousel } from "flowbite-react";

import Slider from "react-slick";

//  function CategorySlider({categories}) {
//   return (
//     <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
//       <Carousel slideInterval={5000}>
//         {categories.map(cat => (

//        <div className='h-full '>
//           <img src={cat.image} className='w-full h-full'/>

//        </div>
//         ))}     
//         </Carousel>
//     </div>
//   );
// }


// export default CategorySlider


export default function SimpleSlider({categories}) {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
        <div className="bg-green-200 h-full flex overflow-hidden">

      <Slider {...settings}>
        {categories.map(cat => (
            <div className='h-full w-full'>        
                <img src={cat.image} className='w-full h-full'/>
            </div>       
        ))}   
      </Slider>
      </div>

    );
  }