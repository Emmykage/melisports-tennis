import React from 'react'
import Hero from '../components/banner/Hero'

const About = () => {
  return (
    <div className='container about bg-theme text-white'>
    <Hero/>
  
    <div className='about-us'>
    <div className='segment grid grid-2 gap-2'>
        <div className='flex justify-center items-align'>
          <h2>About Us</h2>
        </div>
        <div className='flex justify-center items-align p-2'>
          <p>
          Meli Business Company Limited (MBCL) is a Nigerian sports equipment and accessories company that brings top-quality products and services from top sports brands such as Babolat. While Melisports is its e-ommerce platform and a one-stop shop for everything sports.
The Nigeria sport industry still remains largely untapped as it is currently a growing sector, in terms of business and sporting activities. As more public-private partner sponsorship enters into the scene, Melisports will position it self to be the one-stop shop for everything sports.
Meli Business Company Limited (MBCL) is headquarters in Abuja

          </p>

        </div>

        </div>
              
    </div>
    </div>
  )
}

export default About