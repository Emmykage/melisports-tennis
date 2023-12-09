import React from 'react'
import babolat from '../assets/images/product-brands/ba4886b467-babolat-logo-babolat-cayman-sports-tennis-badminton-amp-pickleball.png'
const Brands = () => {
  return (
    <div className='section-container h-fit'>
        <h2>Our Top Brands</h2>
        <div className='grid'>
            <div className='box-shadow text-center my-2'><img src={babolat} alt="" /></div>
        </div>
    </div>
  )
}

export default Brands