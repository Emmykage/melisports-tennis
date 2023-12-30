import React, { useEffect } from 'react'
import Hero from '../components/banner/Hero'
import AboutBanner from '../components/banner/AboutBanner'
import { useDispatch } from 'react-redux'
import { closeNav } from '../redux/modal/nav'

const About = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(closeNav())
  }, [])
  return (
    <div className='container about customer-bg-theme text-white'>
    <AboutBanner/>
  
    <div className='about-us text-pry'>
    <div className='segment segment-one grid grid-2 gap-2 my-3 py-6'>
        <div className='flex justify-center items-align'>
          <h2 className='text-white font-medium'>More...</h2>
        </div>
        <div className='flex justify-center items-align p-2'>
          <p className='w-max-400 text-white'>
          Founded with a passion for sports and a commitment to serving the vibrant community of Nigerian sports enthusiasts, Melisports brings a fresh perspective to the world of sporting goods. Our mission is simple yet profound: to provide access to high-quality sports equipment and services that empower every individual to pursue their athletic goals.

          </p>

        </div>

        </div>
        
        <div className='grid grid-2  my-3 py-2'>
          
  

          
          <div className='font-normal'>
            <ul>
              <li className='my-3 py-1'>
                
                <p className='text-pry'> <strong className='spantara font-normal'>Local Expertise, Global Standards: </strong>As a proudly Nigerian company, we understand the unique needs of our community. Our curated selection of sports equipment meets international standards, ensuring that you have access to the best gear without compromise.</p>
              </li>
              <li className='py-1 my-2'>
                
                <p className='text-pry'><strong>Wide Range of Products:</strong> Whether you're into football, basketball, running, or fitness training, Melisports has you covered. Explore our diverse range of products, carefully selected to cater to athletes of all ages and skill levels.</p>
              </li>
              <li className='my-2 py-1'>
                
                <p className='text-pry'><strong>Affordability and Value:</strong> We believe that everyone should have access to quality sports equipment without breaking the bank. Melisports is committed to offering competitive prices and value for money, making top-notch gear accessible to all.
</p>
              </li>
              <li className='py-1 my-2'>
                <p className='text-pry'><strong>Exceptional Customer Service:</strong> Your satisfaction is our priority. Our knowledgeable and friendly team is here to assist you, providing expert advice to help you make informed decisions about the right equipment for your needs.</p>
              </li>
              <li className='py-4 py-3'>
                <p className='text-pry'><strong>Fast and Reliable Delivery:</strong>

                We understand the excitement of getting your hands on new sports gear. That's why we offer fast and reliable delivery services, ensuring that your equipment reaches you in top condition and ready for action.</p>
              </li>
            </ul>
          

 






          </div>
            <div className='flex justify-center items-center'>
            <h2 className='text-3xl line-space font-medium'>Why Choose Melisports:</h2>
            </div>
          <div>
          
          </div>
        </div>
        <div className='segment segment-three grid grid-2 p-4'>
          <div>
            <h1 className='text-4xl'>Join the Melisports Community:</h1>
          </div>
            <p className='font-semibold text-gray'>
              

Beyond being a sports retailer, Melisports is a community of like-minded individuals who share a passion for fitness and an active lifestyle. Connect with us on social media, participate in our events, and be part of a growing network of sports enthusiasts across Nigeria.

Whether you're a professional athlete, a weekend warrior, or someone just starting their fitness journey, Melisports is here to support you every step of the way. Elevate your game, embrace the joy of movement, and experience sports like never before with Melisports—your trusted partner in Nigerian sports excellence!</p>
          </div>
                    
              
    </div>
    </div>
  )
}

export default About