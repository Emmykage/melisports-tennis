import React from 'react';
import { CiInstagram } from 'react-icons/ci';
import { FaFacebookF } from 'react-icons/fa';
import { BsInstagram, BsTwitterX } from 'react-icons/bs';

const CommunityBanner = () => (
  
  <section className="px-6 my-12 bg-theme py-16">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
    {/* Left Text */}
    <h3 className="flex-1 text-white text-3xl md:text-4xl font-medium tracking-wide text-center md:text-left">
      Join the <span className="text-primary" > <h3 className='text-3xl font-medium inline-block'>Melisport</h3></span> Community
    </h3>

    {/* Social Links */}
    <div className="flex flex-wrap justify-center md:justify-end gap-6 flex-1">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/melisports"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-primary transition text-theme-dark font-semibold shadow-md"
      >
        <FaFacebookF className="text-blue-600 text-xl" />
        <span>@Melisports</span>
      </a>

      {/* Twitter / X */}
      <a
        href="https://x.com/melisports"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-primary transition text-theme-dark font-semibold shadow-md"
      >
        <BsTwitterX className="text-black text-xl" />
        <span>@Melisports</span>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/melisports/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-primary transition text-theme-dark font-semibold shadow-md"
      >
        <BsInstagram className="text-pink-500 text-xl" />
        <span>@Melisports</span>
      </a>
    </div>
  </div>
</section>


);

export default CommunityBanner;
