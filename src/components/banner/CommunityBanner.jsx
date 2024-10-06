import React from 'react'
import { CiInstagram } from 'react-icons/ci';
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsTwitterX } from "react-icons/bs";


const CommunityBanner = () => {
  return (
    <section className='px-5 my-8 bg-theme py-16'>

    <div className=' py-1 md:flex-row gap-6 flex-col m-auto max-w-7xl flex'>
        <h3 className='flex-1 text-primary text-center md:text-left text-2xl tracking-widest'>
        Join the Melisport Comunity

        </h3>
        <div className='flex-1 bg-red- flex items-center sm:justify-center lg:justify-start flex-wrap gap-5'>
        <a href='https://www.facebook.com/melisports' target='_blank' className='flex items-center text-light font-medium'> <FaFacebookF className='md:text-2xl text-xl text-white' /> @Melisports </a>
        <a href='https://x.com/melisports' target='_blank' className='flex items-center text-light font-medium'> <BsTwitterX  className='md:text-2xl text-xl text-white' /> @Melisports </a>
        <a href='https://www.instagram.com/melisports/' target='_blank' className='flex items-center text-light font-medium gap-1'> <BsInstagram   className='md:text-2xl text-xl text-white' /> @Melisports </a>
       
        </div>
        
    </div>

    </section>

  )
}

export default CommunityBanner